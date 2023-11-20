import './LogIn.css';
import React, { useState } from 'react';

function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Invalid input!');
      setFormData({
        username: '',
        password: '',
      });
    } else {
      // check info from database
      console.log('Data from user: ', formData);
    }
  };

  return (
    <div className='container'>
      <label className='logInText'>Log In</label>
      <form className='form' onSubmit={handleSubmit}>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button className='button' type="submit">Submit</button>

      </form>
    </div>
  );
}

export default LogIn;
