import React, { useState, useContext } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import { Auth } from "aws-amplify";
import AppContext from "../utils/context";
import { onError } from "../utils/errorHandling";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    
  const { userHasAuthenticated } = useContext(AppContext); 

  const validateForm = () => {
    return username.length && password.length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true);
        await Auth.signIn(username, password);
        setIsLoading(false);
        userHasAuthenticated(true);
    } catch (e) {
        setIsLoading(false);
        onError(e);
    }
  }

    return (
        <Container>
            <Row className="header">
                <h2> Login Page </h2>
            </Row>
            <Row className="table-div">
                <div className="Login">
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        size="lg"            
                    />
                    </Form.Group>
                    <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        size="lg"          
                    />
                    </Form.Group>
                        <Button variant={`${validateForm() ? 'primary' : ''}`} disabled={!validateForm()} type="submit" className={`${validateForm() ? 'login-btn' : 'login-btn login-btn-bg'}`}>
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                </form>
                </div>
            </Row>
        </Container>
  );
}

export default Login;