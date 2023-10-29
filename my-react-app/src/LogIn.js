import React, { useState } from 'react';
import './LogIn.css';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., send data to a server, validate credentials)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
        <form className="login-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                </label>
            </div>

            <div className="form-group">
                <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                </label>
            </div>

            <button type="submit" className="submit-button">Log In</button>

            <button type="submit" className="submit-button">Sign Up</button>

        </form>
    </div>
  );
};

export default LogIn;