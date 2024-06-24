import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PlayerEdit from "./PlayerEdit";
import PlayerList from "./PlayerList";
import MatchList from "./MatchList";
import TournamentList from "./TournamentList";
import TournamentEdit from "./TournamentEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/players' exact={true} component={PlayerList}/>
            <Route path='/players/:id' component={PlayerEdit}/>

            <Route path='/matches' exact={true} component={MatchList}/>

            <Route path='/tournaments' exact={true} component={TournamentList}/>
            <Route path='/tournaments/:id' exact={true} component={TournamentEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
