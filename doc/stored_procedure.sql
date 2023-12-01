DELIMITER //

CREATE PROCEDURE GetFlightsDelayRatesAndStates(IN input_airline VARCHAR(2))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE airline_code_var VARCHAR(2);
    DECLARE airline_name_var VARCHAR(255);
    DECLARE num_flights INT;
    DECLARE delay_rate FLOAT;

	DECLARE same_state_delay INT DEFAULT 0;
    DECLARE diff_state_delay INT DEFAULT 0;
    DECLARE total_state_delay INT DEFAULT 0;
    DECLARE orig_state_var VARCHAR(2);
    DECLARE dest_state_var VARCHAR(2);

DECLARE results_cursor CURSOR FOR
        SELECT orig_airport.state AS orig_state_var, dest_airport.state AS dest_state_var
		FROM Delay AS d NATURAL JOIN Operate_Flight AS o
		JOIN Airport AS orig_airport ON orig_airport.airport_code = o.orig_airport_code
		JOIN Airport AS dest_airport ON dest_airport.airport_code = o.dest_airport_code
		WHERE d.airline_code = input_airline AND d.minutes > 0;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

CREATE TEMPORARY TABLE IF NOT EXISTS temp_results (
        airline_code_var VARCHAR(2),
        airline_name_var VARCHAR(255),
        num_flights INT,
        delay_rate FLOAT,
        same_state_delay INT DEFAULT 0,
        diff_state_delay INT DEFAULT 0,
        total_state_delay INT DEFAULT 0
    );

-- insert into temporary table
    INSERT INTO temp_results (airline_code_var, airline_name_var, num_flights, delay_rate)
    SELECT a.airline_code AS airline_code_var,
        a.airline_name AS airline_name_var,
        COUNT(d.delay_number) AS num_flights,
        ROUND((SUM(CASE WHEN d.minutes > 0 THEN 1 ELSE 0 END) / COUNT(d.delay_number)) * 100, 2) AS delay_rate
    FROM Airline a NATURAL JOIN Delay d
    WHERE a.airline_code = input_airline
    GROUP BY a.airline_code;

OPEN results_cursor;

results_loop: LOOP
        FETCH results_cursor INTO orig_state_var, dest_state_var;

-- Exit if no more data
        IF done THEN
            LEAVE results_loop;
        END IF;
		SET total_state_delay = total_state_delay + 1;
        IF orig_state_var = dest_state_var THEN
            SET same_state_delay = same_state_delay + 1;
        ELSE
            SET diff_state_delay = diff_state_delay + 1;
        END IF;

-- Update the temporary table after processing each row
        UPDATE temp_results
        SET same_state_delay = same_state_delay, diff_state_delay = diff_state_delay, total_state_delay = total_state_delay;
    END LOOP;

-- Close the cursor
    CLOSE results_cursor;

-- return
    SELECT * FROM temp_results;

DROP TEMPORARY TABLE IF EXISTS temp_results;
END //

DELIMITER //