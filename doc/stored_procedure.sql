DELIMITER //
CREATE PROCEDURE GetUserDelays(IN user_id_in INT, OUT avg_delay )
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE user_delay_number INT;
    DECLARE user_flight_number INT;
    DECLARE user_airline_code VARCHAR(2);
    DECLARE user_minutes INT;

    DECLARE user_delays_cursor CURSOR FOR
        SELECT Delay.delay_number, Delay.flight_number, Delay.airline_code, Delay.minutes
        FROM Delay
        WHERE Delay.user_id = user_id_in;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN user_delays_cursor;

    user_delay_loop: LOOP
        FETCH user_delays_cursor INTO user_delay_number, user_flight_number, user_airline_code, user_minutes;

        IF done = 1 THEN
            LEAVE user_delay_loop;
        END IF;

        // 
    END LOOP;

    CLOSE user_delays_cursor;
    
END //
DELIMITER ;
