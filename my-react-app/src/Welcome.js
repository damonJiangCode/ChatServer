import React, { useState } from 'react';
import './Welcome.css';

const Welcome = () => {

  return (
    <div>
        <p>
          Welcome to the Chat Server!<br></br>
          You can choose the channels you would like to share your reviews with!
        </p>

        <button className='SignUp'>Sign up</button>
        <button className='SignUp'>Log in</button>
    </div>
  );
};

export default Welcome;