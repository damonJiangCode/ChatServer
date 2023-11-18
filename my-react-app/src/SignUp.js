import './SignUp.css';
import React, { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordCheck:'',
    email: ''
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
    if (formData.password !== formData.passwordCheck) {
      alert('Passwords do not match!');
      setFormData({
        ...formData,
        password: '',
        passwordCheck: '',
      });
    } else {
      // insert into database
    }
  };

  return (
    <div className='container'>
      <label className='signUpText'>Sign Up</label>
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

        <label>
          Confirm Password:
          <input
            type="password"
            name="passwordCheck"
            value={formData.passwordCheck}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button className='button' type="submit">Submit</button>

      </form>
    </div>
  );
}

export default SignUp;
