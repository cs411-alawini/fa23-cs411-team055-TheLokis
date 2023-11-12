import * as React from "react";
import { Link } from 'react-router-dom';


function NavBar() {
  return (
      <nav id="menu">
        <ul>
          <li>
            <Link to="/">Search by Airport</Link>
          </li>
          <li>
            <Link to="/airline">Search by Airline</Link>
          </li>
          <li>
            <Link to="/account-record">Account Record</Link>
          </li>
          <li>
            <Link to="/create-record">Create Record</Link>
          </li>
          <li>
            <Link to="/create-account">Create Account</Link>
          </li>
        </ul>
      </nav>
  );
}

export default NavBar;
