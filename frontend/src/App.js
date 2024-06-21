import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PlayerEdit from "./PlayerEdit";
import PlayerList from "./PlayerList";
import MatchList from "./MatchList";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/players' exact={true} component={PlayerList}/>
            <Route path='/players/:id' component={PlayerEdit}/>
            <Route path='/matches' exact={true} component={MatchList}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
