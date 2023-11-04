import { Outlet, Link } from "react-router-dom";

function Welcome() {
  return (
    <div>

      <nav>
        <ul>

          <li>
            <p>
              Welcome to the Chat Server!
              <br/>
              You can choose the channels you would like to share your reviews with!
            </p>
          </li>

          <li>
            <Link to="/SignUp">Sign Up</Link>
          </li>

          <li>
            <Link to="/LogIn">Log In</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </div>
  )
};

export default Welcome;