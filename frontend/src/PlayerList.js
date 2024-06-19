import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PlayerList extends Component{
    constructor(props) {
        super(props);
        this.state = {players: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/players')
            .then(response => response.json())
            .then(data => this.setState({players: data}))
    }

    async remove(id) {
        await fetch(`/players/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPlayers = [...this.state.players].filter(i => i.id !== id);
            this.setState({players: updatedPlayers});
        });
    }

    render() {
        const {players, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const playerList = players.map(player => {
            return <tr key={player.id}>
                <td style={{whiteSpace: 'nowrap'}}>{player.username}</td>
                <td>{player.elo}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/players/" + player.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(player.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Players</h3>
                        <Button color="success" tag={Link} to="/players/new">Add Player</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Username</th>
                            <th width="30%">Elo</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playerList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default PlayerList;