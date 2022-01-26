import React, { Component } from 'react';
import CreateParty from './CreateParty';
import EditParty from './EditParty';
import PartyItems from './PartyItems'
import { Container, Row, Col, Button } from 'reactstrap';
import APIURL from '../helpers/environment';
import "./Home.css"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parties: [],
            toggle: false,
            editToggle: false,
            itemsToggle: false,
            name: "",
            location: "",
            time: "",
            type: "",
            public: ""
        };
        this.createPartyToggle = this.createPartyToggle.bind(this);
        this.editPartyToggle = this.editPartyToggle.bind(this);
        this.partyItemsToggle = this.partyItemsToggle.bind(this);
        this.deleteParty = this.deleteParty.bind(this);
    }
    componentDidMount() {

        fetch(`${APIURL}/parties/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ parties: data })
            })

    }
    deleteParty = (party) => {
        console.log(party)
        console.log('run')
        fetch(`${APIURL}/parties/${party.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        this.setState({parties: []})
    }

    createPartyToggle = () => {
        this.setState({
            toggle: !(this.state.toggle)
        });
    }
    editPartyToggle = () => {
        this.setState({
            editToggle: !(this.state.editToggle)
        });
    }
    partyItemsToggle = () => {
        this.setState({
            itemsToggle: !(this.state.itemsToggle)
        });
    }

    render() {
        return (
            
            <Container className='purp'>
                <Row>
                    <Col>

                        <h4>My Parties</h4>
                        <Button outline color="dark" onClick={this.createPartyToggle}>Create</Button>
                        {
                        this.state.parties.map((party) => (
                            <Row >
                                <Col m='3'><p>Name: {party.name}</p></Col>
                                <Col m='3'><p>Address: {party.location}</p></Col>
                                <Col m='3'><p>Start Time: {party.time}</p></Col>
                                <Col m='3'><p>Type: {party.type}</p></Col>
                                <Col m='3'><p>Public: {party.public.toString()}</p></Col>
                                <Col m='1'><Button onClick={() => this.deleteParty(party)}>DELETE</Button></Col>
                                <Col m='1'><Button onClick={this.editPartyToggle}>EDIT</Button></Col>
                                <Col m='1'><Button onClick={this.partyItemsToggle}>ITEMS</Button></Col>
                                {this.state.editToggle ? <EditParty toggle={this.state.editToggle} editPartyToggle={this.state.editPartyToggle} sessionToken={this.props.sessionToken} id={party.id}/> : null}
                                {this.state.itemsToggle ? <PartyItems toggle={this.state.itemsToggle} partyItemsToggle={this.state.partyItemsToggle} sessionToken={this.props.sessionToken} id={party.id}/> : null}

                            </Row>

                        ))}

                        {this.state.toggle ? <CreateParty toggle={this.state.toggle} createPartyToggle={this.state.createPartyToggle} sessionToken={this.props.sessionToken} /> : null}

                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Home;