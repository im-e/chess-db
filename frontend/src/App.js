import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PlayerEdit from "./PlayerEdit";
import PlayerList from "./PlayerList";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/players' exact={true} component={PlayerList}/>
            <Route path='/players/:id' component={PlayerEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
