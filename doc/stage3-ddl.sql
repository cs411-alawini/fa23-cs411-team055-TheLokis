CREATE TABLE User(
    user_id INT,
    username VARCHAR(255),
    password INT,

    PRIMARY KEY (user_id)
);

CREATE TABLE Delay(
    delay_number INT,
    user_id INT, 
    flight_number INT,
    airline_code VARCHAR(2),
    minutes INT,
    day_of_week INT,
    distance INT,

    PRIMARY KEY (delay_number),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (flight_number) REFERENCES Operate_Flight(flight_number) ON DELETE CASCADE,
    FOREIGN KEY (airline_code) REFERENCES Airline(airline_code) ON DELETE CASCADE
);

CREATE TABLE Operate_Flight(
    flight_number INT,
    airline_code VARCHAR(2),
    orig_airport_code VARCHAR(4),
    dest_airport_code VARCHAR(4),

    PRIMARY KEY (flight_number, airline_code),
    FOREIGN KEY (airline_code) REFERENCES Airline(airline_code) ON DELETE CASCADE,
    FOREIGN KEY (orig_airport_code) REFERENCES Airport(airport_code) ON DELETE CASCADE,
    FOREIGN KEY (dest_airport_code) REFERENCES Airport(airport_code) ON DELETE CASCADE
);

CREATE TABLE Airport(
    airport_code VARCHAR(4),
    airport_name VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(2),

    PRIMARY KEY (airport_code)
);

CREATE TABLE Airline(
    airline_code VARCHAR(2),
    airline_name VARCHAR(255),

    PRIMARY KEY (airline_code)
);