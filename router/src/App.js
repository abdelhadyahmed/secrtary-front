import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './component/Nav';
import Home from './component/Home';
import About from './component/About';
import Blog from './component/Blog';
import Rout from './component/Rout';
class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog}/>
            <Route path="/:test_params" component={Rout}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
