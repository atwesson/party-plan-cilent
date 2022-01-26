import React, { Component, useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, Label, Input, FormGroup } from "reactstrap";
import DateTimePicker from 'react-datetime-picker';
import APIURL from '../helpers/environment';

class PartyItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            amount: 0,
            who: "",
            done: false,
            owner: "",
            value: "",
            toggle: this.props.toggle,
            items: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.createItems = this.createItems.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

        fetch(`${APIURL}/items/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ items: data })
            })

    }
    createItems() {
        fetch(`${APIURL}/items/create/`, {
            method: 'POST',
            body: JSON.stringify({ name: this.state.name, amount: this.state.amount, who: this.state.who, done: this.state.done, owner: this.state.owner }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ name: "" })
                this.setState({ amount: 0 })
                this.setState({ who: "" })
                this.setState({ done: false })
            })
            .catch(err => console.log(err))
    }


    handleChange(event) {
        this.setState({ name: event.target.value });

    }
    handleChange1(event) {

        this.setState({ amount: event.target.value });

    }
    handleChange2(event) {

        this.setState({ who: event.target.value });
    }
    handleChange3(event) {

        this.setState({ owner: event.target.value });
    }
    handleCheck(){
        console.log(this.state.done)
        if (this.state.done === true){
        this.setState({ done:  false})
        }else
        this.setState({done: true})
    }
    handleSubmit(event) {
        this.createItems();
        event.preventDefault();
    }

    deleteItem = (item) => {
        console.log('run')
        fetch(`${APIURL}/items/${item.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })

    }
    markDone = (item) => {
        this.setState({ toggle: false })
        fetch(`${APIURL}/items/${this.props.id}`, {
            method: 'PUT',
            body: JSON.stringify({ done: true}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {this.state.items.map((item) => (
                    <Row>
                        <Col m='3'><p>Name: {item.name}</p></Col>
                        <Col m='3'><p>Amount: {item.amount.toString()}</p></Col>
                        <Col m='3'><p>Who: {item.who}</p></Col>
                        <Col m='3'><p>Done: {item.done.toString()}</p></Col>
                        <Col m='3'><p>Owner: {item.owner}</p></Col>
                        <Col m='1'><Button onClick={() => this.deleteItem(item)}>DELETE</Button></Col>
                        {item.done ? null: <Col m='1'><Button onClick={() => this.markDone(item)}>DONE</Button></Col>}

                    </Row>

                ))}
                <Row>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChange} />
                        Amount:
                        <input type="numbers" value={this.state.amount} onChange={this.handleChange1} />
                        Who:
                        <input type="text" value={this.state.who} onChange={this.handleChange2} />
                        Done:
                        <input type="checkbox" onClick={this.handleCheck} value={this.state.done} />
                        Owner:
                        <input type="text" value={this.state.owner} onChange={this.handleChange3} />
                        <Button outline color="dark" type="submit" value="Submit" onClick={this.handleSubmit}>Create</Button>
                    </label>
                </Row>
            </div>

        )
    }
}
export default PartyItems;