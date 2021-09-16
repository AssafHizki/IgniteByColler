import Routes from './routes';
import './App.css';
import history from './routes/history';
import {
  Router,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
