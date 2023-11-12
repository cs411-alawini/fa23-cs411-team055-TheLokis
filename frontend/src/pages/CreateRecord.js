import * as React from "react";

/*
    Below will get invalid submission: 
    - When the account doesn't exsit or password incorrect
    - When either airport doesn't exist
    - When datatype doesn't match
*/
function CreateRecord() {
    return (
        <>
            <h2>Create Record</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label><br/>
                <label>
                    Password:
                    <input type="number" min="0" step="1" name="password" />
                </label><br/>
                <label>
                    Flight number:
                    <input type="text" name="airline_code" placeholder='e.g. UA' pattern="[A-Za-z]{2}" />
                    <input type="text" name="flight_number" placeholder='e.g. 777'/>
                </label><br/>
                <label>
                    Airline name:
                    <input type="text" name="airline_name" placeholder='e.g. American Airlines Inc.'/>
                </label><br/>
                <label>
                    Delay (minutes):
                    <input type="number" min="0" step="1" name="delay" />
                </label><br/>
                <label>
                    Day of week:
                    <input type="number" min="1" max="7" step="1" name="dayofweek" placeholder='1 for monday, etc.' />                
                </label><br/>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default CreateRecord;
