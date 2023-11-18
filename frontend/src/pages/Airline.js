import * as React from "react";

function Airline() {
    // num_of_flights = how many unique flight number this airline has?
    const data = [
        { airline_code: "UA", airline_name: "United Air Lines Inc.", num_of_flights: 3, delay_rate: 2},
        { airline_code: "AA", airline_name: "American Airlines Inc.", num_of_flights: 10, delay_rate: 10},
    ];
    
    return (
        <>
            <h2>Search by Airline</h2>
            <form>
                <label>
                    Airline code (e.g. UA):
                    <input type="text" name="airline" pattern="[A-Za-z]{3}" />
                </label>
                <input type="submit" value="Search" />
            </form>

            <table>
                <tr>
                    <th>Airline Code</th>
                    <th>Airline Name</th>
                    <th>Number of Flights in Database</th>
                    <th>Delay Rate</th>
                </tr>

                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.airline_code}</td>
                            <td>{val.airline_name}{val.flight_number}</td>
                            <td>{val.num_of_flights}</td>
                            <td>{val.delay_rate}%</td>
                        </tr>
                    )
                })}
            </table>
        </>
    );
}

export default Airline;
