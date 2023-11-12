import * as React from "react";

function AccRecord() {
    const data = [
        { orig_airport_code: "ORD", dest_airport_code: "LAX", airline_code: "UA", flight_number: 712, airline_name: "United Air Lines Inc.", delay: 2, day_of_week: 3},

    ]
  return (
    <>
        <h2>Account Record</h2>
        <form>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <label>
                Password:
                <input type="number" min="0" step="1" name="password" />
            </label>
            <input type="submit" value="Search" />
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
                            <td>{val.delay}</td>
                            <td>{val.day_of_week}</td>
                        </tr>
                    )
                })}
        </table>
    </>
  );
}

export default AccRecord;
