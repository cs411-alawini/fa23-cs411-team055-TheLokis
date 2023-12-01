import * as React from "react";
import Axios from 'axios';
import {useState, useEffect} from "react";

function OrigToDest() {
    const [origAirport, setOrigAirport] = useState('');
    const [destAirport, setDestAirport] = useState('');
    const [data, setData] = useState([]);

    const getByAirport = (e) => {
        e.preventDefault();
        Axios.get('http://localhost:3002/api/getByAirport', {
            params: {
                origAirport: origAirport,
                destAirport: destAirport
            }
        }).then((response) => {
            setData(response.data);
        });
    }

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
                            <td>{Math.round(val.delay_rate)}%</td>
                        </tr>
                    )
                })}
            </table>
        </>
    );
}

export default OrigToDest;
