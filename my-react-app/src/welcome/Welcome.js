import { Link } from "react-router-dom";
import './Welcome.css';

function Welcome() {
  return (
    <div className="container">

      <div className="welcomeContainer">
            <p className="welcomeText">
              Welcome to the Chat Server!
              <br/>
              <br/>
              You can choose the channels you would like to share your reviews with!
              <br/>
            </p>
      </div>

      <br/>
      <br/>
      
      <div className="linkContainer">
        <div className="button">
          <Link to="/SignUp" className="signUp">Sign Up</Link>
        </div>
        <div className="button">
          <Link to="/LogIn" className="logIn">Log In</Link>
        </div>
      </div>
    
    </div>
  )
};

export default Welcome;