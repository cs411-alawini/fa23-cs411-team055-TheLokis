# FlightDelayPro
## Notice
1/12/2024: Google cloud platform billing stops. Can't run SQL/backend for now. 
## About the App
FlightDelayPro is a web-based application designed to help travelers with choosing the
fastest and most time efficient flights based on past flight delays and cancellations. It
helps them make informed decisions and reduce travel-related stress. With our
comprehensive database and user-friendly interface, we will be able to offer users
valuable insights into booking the perfect flight.

## Credits
Stacey Lee: [staceyl2@illinois.edu](mailto:staceyl2@illinois.edu)

Jack Wang: [jiamu2@illinois.edu](mailto:jiamu2@illinois.edu)

Larry Liao: [larryl3@illinois.edu](mailto:larryl3@illinois.edu)

## Run the App
Run frontend
```
cd frontend
npm i
npm start
```

Run backend
```
cd backend
npm i
npm run devStart
```
## Advanced Database Program
### [Trigger](https://github.com/cs411-alawini/fa23-cs411-team055-TheLokis/blob/main/doc/trigger.sql)
"[BeforeInsertDelay](https://github.com/cs411-alawini/fa23-cs411-team055-TheLokis/blob/main/doc/trigger.sql)" executes before insert delay, it checks if the given “airline_code” already exists in the “Airline” table. If it does, it retrieves the airline name. If it does not exist, it inserts a record with the given “airline_code” and sets “airline_name” to “others”.  This keeps the airline table in sync with the delay table when the user tries to insert new delays. 

### [Stored Procedure](https://github.com/cs411-alawini/fa23-cs411-team055-TheLokis/blob/main/doc/stored_procedure.sql)
"[GetFlightsDelayRatesAndStates](https://github.com/cs411-alawini/fa23-cs411-team055-TheLokis/blob/main/doc/stored_procedure.sql)" calculates and returns the delay statistics for flights operated by a provided airline. It also focuses on categorizing delays based on whether the origin and destination airports are in the same state or not. 


## Further Improvements
### Improvements in database
- Add more users functionalities such as past trips(date, origin airport, destination airport) so they can get statistics on their preferred airline. 
- Database currently allows duplicates in username and that's probably a bad idea. 
### Improvements in system optimization: 
- Use less joins for queries. 
- Find a way to store frequently accessed data to make our program faster, i.e. store the result of procedures (cache)
- Our Account Record currently only shows 1000 rows because we have too much data and it’ll get a memory error if we don’t limit the query to 1000. 
- Potentially possible: Multiple instances of flightdelayPro on different servers so they can handle requests individually(distributed system)?

## Challenges Encountered
- Designing a robust and correct [UML diagram](https://github.com/cs411-alawini/fa23-cs411-team055-TheLokis/blob/main/doc/UML%20Diagram.pdf). More specifically, we struggled with applying the weak entity set in the correct scenario. 
- Stored procedure is hard to implement mainly because of confusions with JOINs. 
- Cleaning up the dataset and putting on google cloud is not as easy as we expected. Large volumes of dirty data points and unfamiliarity with gcp slowed down the process.  
- Connecting frontend to backend was a lot of work (the Node.js part). 


## Progress
12/5/2023: Finished project. 

11/19/2023: Backend mostly complete. Added trigger. 

11/27/2023: Tried writting the stored procedure requirement. 

11/28/2023: Stored procedure numbers add up/makes more sense. Still need double check if produce correct result. 

11/30/2023: App basically done. Need to do more testings + plan for demo. 