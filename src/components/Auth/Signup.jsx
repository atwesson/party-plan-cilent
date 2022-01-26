import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Container, Row } from 'reactstrap';
import "./Auth.css"
import APIURL from '../../helpers/environment';

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admin, setAdmin] = useState(false);

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    user:
                    {
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        admin: admin
                    }
                }),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
            .then(
                (res) => res.json()
            ).then((data) => {
                props.updateToken(data.sessionToken);
            })
            .catch(err => console.log(err))
    }

    let adminToggle = () => {
        admin ? setAdmin(false): setAdmin(true);
    }

    return (
        <Container className="formsContainer">
            <Row>
                <h1>Plan A Party</h1>
            </Row>
            <br/>
            <Row>
                <h3>Sign Up</h3>
            </Row>
            <br/>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' value={email} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='Password' value={password} minLength='5' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='firstName'>Name</Label>
                        <Input onChange={(e) => setFirstName(e.target.value)} name='firstName' placeholder='Name' value={firstName} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='lastName'> Last Name</Label>
                        <Input onChange={(e) => setLastName(e.target.value)}  name='lastName' placeholder='Last Name' value={lastName} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='admin'> admin </Label>
                        <Input type="checkbox" onClick={adminToggle}/>
                    </FormGroup>
                        <Button type='submit' className="button" outline color="dark">Sign Up</Button>
                </Form>
            </Row>
        </Container>

    )
}


export default Signup;