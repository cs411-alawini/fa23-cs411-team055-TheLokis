import * as React from "react";
import Axios from 'axios';
import {useState} from "react";

function CreateAcc() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formValid, setFormValid] = useState(false);

    const createAccount = (e) => {
        e.preventDefault();
        validateForm();
        if (!formValid) {
            alert('Please fill out all fields with valid input.');
            return;
        }
        e.preventDefault();
        Axios.post('http://localhost:3002/api/createAcc', {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.success) {
                alert('Account has been created successfully');
                window.location.reload();
            } else {
                alert('Account creation failed: ' + response.data.message);
            }
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    const validateForm = () => {
        // Add your validation logic here
        const isValid =
          username.trim() !== '' &&
          password.trim() !== ''

    
        setFormValid(true);
      };

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
