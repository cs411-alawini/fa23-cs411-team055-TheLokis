import React, { useState } from 'react';
import Axios from 'axios';

function UpdatePassword() {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(''); 

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3002/api/updatePassword', { 
            username: username,
            currentPassword: currentPassword,
            newPassword: newPassword
        }).then((response) => {
            setMessage(response.data.message);
        }).catch((error) => {
            console.error(error);
            setMessage('Failed to update password. Please try again.');
        });
    };

    return (
        <>
            <h2>Update Password</h2>
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
                    Current Password:
                    <input
                        type="text"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </label><br/>
                <label>
                    New Password:
                    <input
                        type="text"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label><br/>
                <input type="submit" value="Update Password" onClick={handleUpdatePassword} />
            </form>
            <p>{message}</p> 
        </>
    ); 
}

export default UpdatePassword;