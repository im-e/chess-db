import './App.css';
import {Component} from "react";

class App extends Component {
  state = {
    players: []
  };

  async componentDidMount() {
    const response = await fetch('/api/players');
    const body = await response.json();
    this.setState({players: body});
  }

  render()
  {
    const {players} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <div className="App-intro">
              <h2>Players</h2>
              {players.map(player =>
                  <div key={player.id}>
                    {player.username} ({player.elo})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}

export default App;
