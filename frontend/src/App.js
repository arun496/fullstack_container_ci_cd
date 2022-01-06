import './App.css';
import Fib from './components/Fib';
import OtherPage from './components/OtherPage';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hello World!!</h1>
        {/* <div className="header">
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </div> */}
        {/* <Route exact path="/" component={Fib} />
        <Route exact path="/otherpage" component={OtherPage} /> */}
      </div>
    </Router>
  );
}

export default App;