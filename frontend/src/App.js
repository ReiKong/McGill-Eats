import logo from './logo.svg';
import './App.css';
import SideNav from './components/SideNav';
import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SideNav />
    </div>
  );
}

export default App;
