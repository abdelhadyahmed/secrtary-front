import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Manager from './components/manager/Manager';
import Secrtary from './components/secrtary/Secrtary';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/manager" component={Manager} />
            <Route path="/secrtary" component={Secrtary}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
