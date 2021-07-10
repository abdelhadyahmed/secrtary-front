import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './components/nav/Nav';
import Manager from './components/manager/Manager';
import Secrtary from './components/secrtary/Secrtary';
function App() {
  return (
    <div className="App">
      {/* navbar with routes */}
      {/* secrtary component */}
      {/* manager component */}

      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route path="/manager" component={Manager} />
            <Route path="/secrtary" component={Secrtary}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
