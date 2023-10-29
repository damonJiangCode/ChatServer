import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Chat Server!<br></br>
          You can choose the channels you would like to share your reviews with!

        </p>
        <a
          className="logLink"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          NEXT
        </a>
      </header>
    </div>
  );
}

export default App;
