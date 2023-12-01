import * as React from "react";
import { Link } from 'react-router-dom';


function Account() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/account-record">Account Record</Link>
                    </li>
                    <li>
                        <Link to="/create-account">Create Account</Link>
                    </li>
                    <li>
                        <Link to="/update-password">Update Password</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Account;
