SELECT 
    Airline.airline_name,
    SUM(CASE WHEN Delay.minutes IS NOT NULL THEN 1 ELSE 0 END) AS num_delays,
    COUNT(Delay.delay_number) AS num_cancellations
FROM Airline 
LEFT JOIN Operate_Flight ON Airline.airline_code = Operate_Flight.airline_code
LEFT JOIN Delay ON Operate_Flight.flight_number = Delay.flight_number
GROUP BY Airline.airline_name;