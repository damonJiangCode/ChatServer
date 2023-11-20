import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './welcome/Welcome';
import SignUp from './signUp/SignUp';
import LogIn from './logIn/LogIn';


function App() {
  return (
    <div className='App'>

        <Router>

          <Routes>

            <Route path="/" element={<Welcome />}/>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<LogIn />} />
            
          </Routes>

        </Router>

    </div>
  );
}

export default App;
