import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class MatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch('/matches');
            const data = await response.json();
            if (Array.isArray(data)) {
                this.setState({ matches: data, isLoading: false });
            } else {
                console.error('Data fetched is not an array:', data);
                this.setState({ matches: [], isLoading: false });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ matches: [], isLoading: false });
        }
    }

    async remove(id) {
        await fetch(`/matches/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedMatches = [...this.state.matches].filter(i => i.id !== id);
            this.setState({matches: updatedMatches});
        });
    }

    render() {
        const {matches, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const matchList = matches.map(match => {
            return <tr key={match.id}>
                <td>{match.id}</td>
                <td>{match.player1.username}</td>
                <td>{match.player2.username}</td>
                <td>{match.winner}</td>
                <td>{match.tournament.title}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/matches/" + match.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(match.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Matches</h3>
                        <Button color="success" tag={Link} to="/matches/new">Add Match</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="7%">Match ID</th>
                            <th width="10%">Player 1</th>
                            <th width="10%">Player 2</th>
                            <th width="10%">Winner of Match</th>
                            <th width="20%">Tournament</th>
                        </tr>
                        </thead>
                        <tbody>
                        {matchList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default MatchList;