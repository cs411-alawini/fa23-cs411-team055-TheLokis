import * as React from "react";
import Axios from 'axios';
import {useState} from "react";
import { Chart } from "react-google-charts";

function Airline() {
    const [airline, setAirline] = useState('');
    // const [noData, setNoData] = useState(true);
    const [data, setData] = useState([]);
    const [state, setState] = useState([["Same State Delay", 0], ["Different State Delay", 0]]);

    const getByAirline = (e) => {
        e.preventDefault();
        Axios.get('http://localhost:3002/api/getByAirline', {
            params: {
                airline: airline,
            }
        }).then((response) => {
            // console.log(response.data);
            setData(response.data);
        }).then((response) => {
            if (data && data.length > 0) {
                // setNoData(false);
                const temp = state;
                temp[0][1] = response.data[0].same_state_delay;
                temp[1][1] = response.data[0].diff_state_delay;
                setState(temp);
            }
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

            {/* <table>
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
            </table> */}
                {data.map((val) => {
                    return (
                        <>
                            <h3>Airline Code: </h3>
                            {val.airline_code_var}
                            <h3>Airline Name: </h3>
                            {val.airline_name_var}
                            <h3>Number of Flights in Database: </h3>
                            {val.num_flights}
                            <h3>Delay Rate: </h3>
                            {Math.round(val.delay_rate)}%
                        </>
                    )
                })}

        </>
    );
}

export default Airline;
