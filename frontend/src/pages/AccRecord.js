import * as React from "react";
import Axios from 'axios';
import {useState} from "react";

function AccRecord() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);

    const getAccountRecord = (e) => {
        e.preventDefault();
        Axios.get('http://localhost:3002/api/getAccountRecord', {
            params: {
                username: username,
                password: password
            }
        }).then((response) => {
            // console.log(response.data);
            setData(response.data);
        });
    }

  return (
    <>
        <h2>Account Record</h2>
        <h4>Showing at most 1,000 rows</h4>
        <form>
            <label>
                Username:
                <input type="text" name="username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
            </label>
            <label>
                Password:
                <input type="number" min="0" step="1" name="password" onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </label>
            <input type="submit" value="Search" onClick={getAccountRecord} />
        </form>

        <table>
                <tr>
                    <th>Orign-Destination</th>
                    <th>Flight Number</th>
                    <th>Airline Name</th>
                    <th>Delay (minutes)</th>
                    <th>Day of Week</th>
                </tr>

                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.orig_airport_code}-{val.dest_airport_code}</td>
                            <td>{val.airline_code}{val.flight_number}</td>
                            <td>{val.airline_name}</td>
                            <td>{val.minutes}</td>
                            <td>{val.day_of_week}</td>
                        </tr>
                    )
                })}
        </table>
    </>
  );
}

export default AccRecord;
