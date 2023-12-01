import * as React from "react";
import Axios from 'axios';
import {useState} from "react";
import { Chart } from "react-google-charts";

export const options = {
    title: "By State of Origin Airport and Destination Airport",
    is3D: true,
};

function Airline() {
    const [airline, setAirline] = useState('');
    const [data, setData] = useState([]);
    const [state, setState] = useState([["state", "number"], ["Same State Delay", 0], ["Different State Delay", 0]]);
    const [error, setError] = useState(null);

    const getByAirline = async (e) => {
        e.preventDefault();
        try {
          const response = await Axios.get('http://localhost:3002/api/getByAirline', {
            params: {
              airline: airline,
            }
          });
    
          setData(response.data);
    
          if (response.data && response.data.length > 0) {
            const temp = state;
            temp[1][1] = response.data[0].same_state_delay;
            temp[2][1] = response.data[0].diff_state_delay;
            setState(temp);
          }
        } catch (error) {
          setError(error.message || 'An error occurred');
        }
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

            {data.length === 0 ?  (
                <h3>No data</h3>
            ):(
                data.map((val) => {
                    console.log(state)
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
                            <Chart
                                chartType="PieChart"
                                data={state}
                                options={options}
                                width={"100%"}
                                height={"400px"}
                            />
                        </>
                    )
                })
            )}
        </>
    );
}

export default Airline;
