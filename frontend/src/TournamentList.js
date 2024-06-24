import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class TournamentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournaments: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch('/tournaments');
            const data = await response.json();
            if (Array.isArray(data)) {
                this.setState({ tournaments: data, isLoading: false });
            } else {
                console.error('Data fetched is not an array:', data);
                this.setState({ tournaments: [], isLoading: false });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ tournaments: [], isLoading: false });
        }
    }

    async remove(id) {
        await fetch(`/tournaments/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTournaments = [...this.state.tournaments].filter(i => i.id !== id);
            this.setState({tournaments: updatedTournaments});
        });
    }

    render() {
        const {tournaments, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const tournamentList = tournaments.map(tournament => {
            return <tr key={tournament.id}>
                <td>{tournament.id}</td>
                <td>{tournament.title}</td>
                <td>{tournament.participants}</td>
                <td>{tournament.matches}</td>
                <td>{tournament.player.username}</td>
                <td>{tournament.prizeMoney}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/tournaments/" + tournament.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(tournament.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Tournaments</h3>
                        <Button color="success" tag={Link} to="/tournaments/new">Add Tournament</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="7%">Tournament ID</th>
                            <th width="10%">Tournament Title</th>
                            <th width="10%">Total Participants</th>
                            <th width="10%">Total Matches</th>
                            <th width="10%">Winner of Tournament</th>
                            <th width="20%">Prize Money</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tournamentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default TournamentList;