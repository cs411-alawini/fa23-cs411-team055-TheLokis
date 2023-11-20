import * as React from "react";
import Axios from 'axios';
import {useState} from "react";

function CreateAcc() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const createAccount = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3002/api/createAcc', {
            username: username,
            password: password
        }).then(() => {
            alert('success');
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <h2>Create Account</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </label><br/>
                <label>
                    Password (numbers only):
                    <input type="number" min="0" step="1" name="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </label><br/>
                <input type="submit" value="Create Account" onClick={createAccount}/>
            </form>
        </>
    );
}

export default CreateAcc;
