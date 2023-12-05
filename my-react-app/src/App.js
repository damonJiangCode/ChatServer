import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./welcome/Welcome";
import SignUp from "./signUp/SignUp";
import ChatPage from "./chat/ChatPage";
import LogIn from "./logIn/LogIn";
// import ChatChannels from "./chat/ChatChannels";
import Search from "./chat/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
