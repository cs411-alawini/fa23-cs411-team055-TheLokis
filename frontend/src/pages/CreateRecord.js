import * as React from "react";
import Axios from 'axios';
import {useState} from "react";

/*
    Below will get invalid submission: 
    - When the account doesn't exsit or password incorrect
    - When either airport doesn't exist
    - When datatype doesn't match
*/
function CreateRecord() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [airlineCode, setAirlineCode] = useState('');
    const [flightNum, setFlightNum] = useState('');
    const [airlineName, setAirlineName] = useState('');
    const [minutes, setMinutes] = useState('');
    const [day, setDay] = useState('');
    const [distance, setDistance] = useState('');
    const [orig, setOrig] = useState('');
    const [dest, setDest] = useState('');
    const [formValid, setFormValid] = useState(false);

    const validateForm = () => {
        // Add your validation logic here
        const isValid =
          username.trim() !== '' &&
          password >= 0 &&
          orig.match(/[A-Za-z]{3,4}/) &&
          dest.match(/[A-Za-z]{3,4}/) &&
          airlineCode.match(/[A-Za-z0-9]{2}/) &&
          flightNum.trim() !== '' &&
          airlineName.trim() !== '' &&
          minutes >= 0 &&
          day >= 1 && day <= 7 &&
          distance >= 1;
    
        setFormValid(true);
      };

    const createRecord = (e) => {
        validateForm();
        if (!formValid) {
            alert('Please fill out all fields with valid input.');
            return;
        }
        e.preventDefault();
        var insertAllowed = false;
        Axios.get('http://localhost:3002/api/getPassword', {
            params: {
                username: username,
                password: password
            }
        }).then((response) => {
            if (response.data.length > 0) {
                insertAllowed = true;
            } else {
                alert('User not found/incorrect password. Record not created.');
            }
        }).then(() => {
            if (insertAllowed) {
                Axios.post('http://localhost:3002/api/createRecord', {
                    username: username,
                    password: password,
                    airlineCode: airlineCode,
                    flightNum: flightNum,
                    airlineName: airlineName,
                    minutes: minutes,
                    day: day,
                    distance: distance,
                    orig: orig,
                    dest: dest
                }).then((response) => {
                    if (response.data.success) {
                        alert('Record has been created successfully');
                        window.location.reload();
                    } else {
                        alert('Record creation failed: ' + response.data.message);
                    }

                }).catch((error) => {
                    alert('something went wrong when inserting');
                    console.log(error);
                });
            }
        });
    }

    return (
        <>
            <h2>Create Record</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                </label><br/>
                <label>
                    Password:
                    <input type="number" min="0" step="1" name="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </label><br/>
                <label>
                    Origin airport:
                    <input type="text" name="orig_airport" placeholder='e.g. ORD' pattern="[A-Za-z]{3-4}" onChange={(e) => {
                        setOrig(e.target.value);
                    }}/>
                </label><br/>
                <label>
                    Destination airport:
                    <input type="text" name="dest_airport" placeholder='e.g. LAX' pattern="[A-Za-z]{3-4}" onChange={(e) => {
                        setDest(e.target.value);
                    }}/>
                </label><br/>
                <label>
                    Flight number:
                    <input type="text" name="airline_code" placeholder='e.g. UA' pattern="[A-Za-z0-9]{2}" onChange={(e) => {
                        setAirlineCode(e.target.value);
                    }}/>
                    <input type="text" name="flight_number" placeholder='e.g. 777' onChange={(e) => {
                        setFlightNum(e.target.value);
                    }}/>
                </label><br/>
                <label>
                    Airline name:
                    <input type="text" name="airline_name" placeholder='e.g. American Airlines Inc.' onChange={(e) => {
                        setAirlineName(e.target.value);
                    }}/>
                </label><br/>
                <label>
                    Delay (minutes):
                    <input type="number" min="0" step="1" name="delay" onChange={(e) => {
                        setMinutes(e.target.value);
                    }}/>
                </label><br/>
                <label>
                    Day of week:
                    <input type="number" min="1" max="7" step="1" name="dayofweek" placeholder='1 for monday, etc.' onChange={(e) => {
                        setDay(e.target.value);
                    }}/>                
                </label><br/>
                <label>
                    Distance:
                    <input type="number" min="1" step="1" name="distance" placeholder='miles' onChange={(e) => {
                        setDistance(e.target.value);
                    }}/>                
                </label><br/>
                <input type="submit" value="Submit" onClick={createRecord}/>
            </form>
        </>
    );
}

export default CreateRecord;
