import React, { useState } from 'react';
import Axios from 'axios';

function DeleteAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleDeleteAccount = (e) => {
        e.preventDefault();

        Axios.delete('http://localhost:3002/api/deleteAccount', {
            data: {
                username: username,
                password: password
            }
        }).then((response) => {
            setMessage(response.data.message);
        }).catch((error) => {
            console.error(error);
            setMessage('Failed to delete account. Please try again.');
        });
    };

    return (
        <>
            <h2>Delete Account</h2>
            <form>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label><br/>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label><br/>
                <input type="submit" value="Delete Account" onClick={handleDeleteAccount} />
            </form>
            <p>{message}</p>
        </>
    );
}

export default DeleteAccount;