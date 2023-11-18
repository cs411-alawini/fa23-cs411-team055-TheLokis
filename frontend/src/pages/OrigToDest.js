import * as React from "react";
import Axios from 'axios';
import {useState, useEffect} from "react";

function OrigToDest() {
    const [origAirport, setOrigAirport] = useState('');
    const [destAirport, setDestAirport] = useState('');
    const [data, setData] = useState([]);

    const getByAirport = () => {
        Axios.get('http://localhost:3002/api/getByAirport', {
            origAirport: origAirport,
            destAirport: destAirport
        }).then((response) => {
            alert('success')
            setData(response.data);
        });
    }

    // const data = [
    //     { orig_airport_code: "ORD", dest_airport_code: "LAX", airline_code: "UA", flight_number: 712, airline_name: "United Air Lines Inc.", delay_rate: 2},
    //     { orig_airport_code: "LAS", dest_airport_code: "JFK", airline_code: "AA", flight_number: 278, airline_name: "American Airlines Inc.", delay_rate: 10}
    // ];

    return (
        <>
            <h2>Search by Airport</h2>
            <form>
                <p>
                    Please enter in the IATA format (e.g. ORD).
                    If you want to search all airport, type "*".
                </p>
                <label>
                    Origin Airport:
                    <input type="text" name="orig" pattern="[A-Za-z]{3}" onChange={(e) => {
                        setOrigAirport(e.target.value);
                    }}/>
                </label>
                <label>
                    Destination Airport:
                    <input type="text" name="dest" pattern="[A-Za-z]{3}" onChange={(e) => {
                        setDestAirport(e.target.value);
                    }}/>
                </label>
                <input type="submit" value="Search" onClick={getByAirport} />
            </form>

            <table>
                <tr>
                    <th>Orign-Destination</th>
                    <th>Flight Number</th>
                    <th>Airline</th>
                    <th>Delay Rate</th>
                </tr>

                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.orig_airport_code}-{val.dest_airport_code}</td>
                            <td>{val.airline_code}{val.flight_number}</td>
                            <td>{val.airline_name}</td>
                            <td>{val.delay_rate}%</td>
                        </tr>
                    )
                })}
            </table>
        </>
    );
}

export default OrigToDest;
