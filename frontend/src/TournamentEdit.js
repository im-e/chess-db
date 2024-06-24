import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class TournamentEdit extends Component {

    emptyItem = {
        title: '',
        participants: '',
        matches: '',
        winner: '',
        prizeMoney: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const tournament = await (await fetch(`/tournaments/${this.props.match.params.id}`)).json();
            this.setState({item: tournament});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/tournaments' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/tournaments');
    }


    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit tournament' : 'Add tournament'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Title</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="participants">Participants</Label>
                        <Input type="text" name="participants" id="participants" value={item.participants || ''}
                               onChange={this.handleChange} autoComplete="participants"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="matches">Matches</Label>
                        <Input type="text" name="matches" id="matches" value={item.matches || ''}
                               onChange={this.handleChange} autoComplete="matches"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="winner">Winner</Label>
                        <Input type="text" name="winner" id="winner" value={item.winner || ''}
                               onChange={this.handleChange} autoComplete="winner"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="prizeMoney">Prize Money</Label>
                        <Input type="text" name="prizeMoney" id="prizeMoney" value={item.prizeMoney || ''}
                               onChange={this.handleChange} autoComplete="prizeMoney"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/tournaments">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default withRouter(TournamentEdit);