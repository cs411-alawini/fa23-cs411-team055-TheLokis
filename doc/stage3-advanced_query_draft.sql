SELECT
    Delay.user_id,
    Operate_Flight.orig_airport_code,
    Operate_Flight.dest_airport_code,
    COUNT(Delay.delay_number) AS num_record_created
FROM Delay INNER JOIN Operate_Flight ON Delay.flight_number = Operate_Flight.flight_number AND Delay.airline_code = Operate_Flight.airline_code
WHERE Operate_Flight.orig_airport_code = "ORD" AND Operate_Flight.dest_airport_code = "LAX"
GROUP BY Delay.user_id
ORDER BY num_record_created ASC
LIMIT 100