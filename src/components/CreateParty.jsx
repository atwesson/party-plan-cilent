import React, { Component, useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, Label, Input, FormGroup } from "reactstrap";
import DateTimePicker from 'react-datetime-picker';
import APIURL from '../helpers/environment';

class CreateParty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            type: "",
            time: "",
            invites: [],
            publicToggle: false,
            toggle: this.props.toggle,
            value: '',

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.postParty = this.postParty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    postParty() {
        console.log(this.state.name)
        this.setState({ toggle: false })
        fetch(`${APIURL}/parties/create/`, {
            method: 'POST',
            body: JSON.stringify({ name: this.state.name, location: this.state.address, time: this.state.time, type: this.state.type,  public: this.state.publicToggle}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())
            .then((partiesData) => {
                console.log(partiesData);
            })
            .catch(err => console.log(err))
    }

    handleChange(event) {
        this.setState({ name: event.target.value });

    }
    handleChange1(event) {

        this.setState({ address: event.target.value });

    }
    handleChange2(event) {

        this.setState({ type: event.target.value });
    }
    handleChange3() {

        this.setState({ time: new Date() });
    }

    handleCheck(){
        console.log(this.state.publicToggle)
        if (this.state.publicToggle === true){
        this.setState({ publicToggle:  false})
        }else
        this.setState({publicToggle: true})
    }

    handleSubmit(event) {
        this.postParty();
        event.preventDefault();
    }

    render() {
        return (
            <div style={{
                display: 'block', width: 700, padding: 30
            }}>
                <form>
                <Modal isOpen={this.state.toggle}>
                    <ModalHeader>
                        Create Party
                        </ModalHeader>
                    <ModalBody>
                        <Row>
                                <label>
                                    Name:
                                </label>
                                    <input type="text" value={this.state.name} onChange={this.handleChange} />
                                    <label>
                                    Location:
                                    </label>
                                    <input type="text" value={this.state.address} onChange={this.handleChange1} />
                                    <label>
                                    Type:
                                    </label>
                                    <input type="text" value={this.state.type} onChange={this.handleChange2} />
                                    <label>
                                        Time:
                                    </label>
                                    <div>
                                        <DateTimePicker value={this.state.time} onChange={this.handleChange3}/>
                                    </div>
                                    <label>
                                        Public
                                    </label>
                                    <input type="checkbox" onClick={this.handleCheck} value={this.state.publicToggle} />
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="dark" type="submit" value="Submit" onClick={this.handleSubmit}>Create</Button>
                    </ModalFooter>
                </Modal>
                </form>
            </div >

        );
    }
}
export default CreateParty;