SELECT 
    Operate_Flight.flight_number,
    Operate_Flight.airline_code,
    Operate_Flight.orig_airport_code,
    Operate_Flight.dest_airport_code,
    Airline.airline_name,
    COUNT(Delay.delay_number) AS num_delays,
    SUM(CASE WHEN Delay.minutes IS NOT NULL THEN 1 ELSE 0 END) AS num_cancellations
FROM Operate_Flight
INNER JOIN Airport AS start_airport ON Operate_Flight.orig_airport_code = start_airport.airport_code
INNER JOIN Airport AS destination_airport ON Operate_Flight.dest_airport_code = destination_airport.airport_code
INNER JOIN Airline ON Operate_Flight.airline_code = Airline.airline_code
LEFT JOIN Delay ON Operate_Flight.flight_number = Delay.flight_number
WHERE start_airport.city = 'Seattle' -- Replace with the actual city name for the start airport
    AND destination_airport.city = 'San Jose' -- Replace with the actual city name for the destination airport
GROUP BY
    Operate_Flight.flight_number,
    Operate_Flight.airline_code,
    Operate_Flight.orig_airport_code,
    Operate_Flight.dest_airport_code,
    Airline.airline_name
ORDER BY num_delays ASC, num_cancellations ASC;