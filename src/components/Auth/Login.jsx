import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row } from 'reactstrap';
import "./Auth.css";
import APIURL from '../../helpers/environment';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    user:
                    {
                        email: email,
                        password: password
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


    return (
        <Container className='formsContainer'>
            <Row>
                <h1>Plan A Party</h1>
            </Row>
            <br/>
            <Row>
                <h3>Login</h3>
            </Row>
            <br/>
            <Row>
                <Form onSubmit={handleSubmit} className="removeGap">
                    <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} type='email' name='email' placeholder='Email' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input onChange={(e) => setPassword(e.target.value)} value={password} type='password' name='password' placeholder='Password' />
                    </FormGroup>
                    <Button type='submit' outline color="dark" className="button">Login</Button>
                </Form>
            </Row>
        </Container>

    )
}

export default Login;