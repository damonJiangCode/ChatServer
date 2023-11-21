import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './welcome/Welcome';
import SignUp from './signUp/SignUp';
import ChatChannel from './chat/ChatChannel';
// import LogIn from './logIn/LogIn';



function App() {
  return (
    <div className='App'>

        <Router>

          <Routes>

            <Route path="/" element={<Welcome />}/>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/logIn" element={<SignUp />} />
            <Route path="/chat" element={<ChatChannel />} />
            
          </Routes>

        </Router>

    </div>
  );
}

export default App;
