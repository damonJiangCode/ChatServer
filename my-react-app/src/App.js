import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './Welcome';
import SignUp from './SignUp';
import LogIn from './LogIn';


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
