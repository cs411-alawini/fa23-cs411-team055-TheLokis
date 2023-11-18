SELECT
    a.airline_code,
    a.airline_name,
    COUNT(d.delay_number) AS total_records,
    ROUND((SUM(CASE WHEN d.minutes > 0 THEN 1 ELSE 0 END) / COUNT(d.delay_number)) * 100, 2) AS percentage_with_delay
FROM
    Airline a
LEFT JOIN
    Delay d ON a.airline_code = d.airline_code
WHERE
    a.airline_code = 'UA'
    AND d.day_of_week = 1
    AND d.distance BETWEEN 1000 AND 2000
GROUP BY
    a.airline_code, a.airline_name;