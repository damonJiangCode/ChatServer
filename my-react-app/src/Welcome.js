import { Outlet, Link } from "react-router-dom";
import './Welcome.css';

function Welcome() {
  return (
    <div>

      <nav>

            <p>
              Welcome to the Chat Server!
              <br/>
              You can choose the channels you would like to share your reviews with!
              <br/>
              <br/>
              <br/>
            </p>

            <Link to="/SignUp" className="SignUp">Sign Up
              <br/>
              <br/>
            </Link>
          

            <Link to="/LogIn">Log In</Link>

      </nav>

      <Outlet />
    </div>
  )
};

export default Welcome;