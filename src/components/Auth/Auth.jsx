import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Signup from "./Signup";
import Login from "./Login";
import "./Auth.css"
import { XlviLoader } from "react-awesome-loaders";

const Auth = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    const [toggle, setToggle] = useState(true);
    const [loginOrRegister, setLoginOrRegister] = useState("Go to Sign Up");

    const handleToggle = () => {
        if (toggle === true) {
            setToggle(false);
            setLoginOrRegister("Go to Login");
        } else {
            setToggle(true);
            setLoginOrRegister("Go to Sign Up");
        }
    }


    return (
        <div className="center">
            {
                loading ?
                    < XlviLoader background={"linear-gradient(135deg, #6066FA, #4645F6)"}  desktopSize={'150px'} className="loader"/> :

                    <Container className='auth-container'>

                        <Row mb-3>
                            {toggle ? <Login updateToken={props.updateToken} /> : <Signup updateToken={props.updateToken} />}
                            <Col>
                                <Button outline color="dark" className="button" onClick={handleToggle}>{loginOrRegister}</Button>

                            </Col>
                        </Row>

                    </Container>}
        </div>
    )

}


export default Auth;

