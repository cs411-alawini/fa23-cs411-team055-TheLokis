import * as React from "react";
import Axios from 'axios';
import {useState} from "react";

function Airline() {
    const [airline, setAirline] = useState('');
    const [data, setData] = useState([]);

    const getByAirline = (e) => {
        e.preventDefault();
        Axios.get('http://localhost:3002/api/getByAirline', {
            params: {
                airline: airline,
            }
        }).then((response) => {
            // console.log(response.data);
            setData(response.data);
        });
    }
    
    return (
        <>
            <h2>Search by Airline</h2>
            <form>
                <label>
                    Airline code (e.g. UA):
                    <input type="text" name="airline" pattern="[A-Za-z0-9]{2}" onChange={(e) => {
                        setAirline(e.target.value);
                    }}/>
                </label>
                <input type="submit" value="Search" onClick={getByAirline} />
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
                            <td>{val.airline_name}</td>
                            <td>{val.num_of_flights}</td>
                            <td>{Math.round(val.delay_rate)}%</td>
                        </tr>
                    )
                })}
            </table>
        </>
    );
}

export default Airline;
