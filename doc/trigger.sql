DELIMITER //

CREATE TRIGGER BeforeInsertDelay
BEFORE INSERT ON Delay
FOR EACH ROW

BEGIN
    DECLARE db_airline_name VARCHAR(255);

    -- Check if the flight number already exists in the database
    SELECT airline_name INTO db_airline_name
    FROM Airline
    WHERE airline_code = NEW.airline_code;

    -- If the flight number exists, update the airline_name in the Airline table
    IF db_airline_name IS NULL THEN
        INSERT INTO Airline(airline_code, airline_name)
        VALUES(NEW.airline_code, "Others");
    END IF;
END



DELIMITER ;