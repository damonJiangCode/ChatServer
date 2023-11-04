import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Welcome';
import SignUp from './SignUp';
import LogIn from './LogIn';


function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}>
              {/* <Route index element={<Welcome />} /> */}
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/LogIn" element={<LogIn />} />
            </Route>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
