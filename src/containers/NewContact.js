import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { onError } from "../utils/errorHandling";
import createContact from '../services/createContact';
import "./NewContact.css";

const NewContact = () => {

  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [status, setStatus] = useState("active");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return firstName.length && lastName.length && email.length && phoneNo.length;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        setIsLoading(true);
        await createContact({firstName, lastName, email, phoneNo, status});
        history.push("/");
    } catch (e) {
        onError(e);
        setIsLoading(false);
    }
  }

    return (
      <Container>
        <Row className="header">
          <Col sm={8}>
            <h2>Create Contact </h2>
          </Col>
          <Col sm={4} className="create-btn-div">
            <Link to="/"> <Button variant="outline-primary" className="create-btn">  Go back </Button> </Link> 
          </Col>
        </Row>
        <Row className="table-div">
            <form onSubmit={handleSubmit} style={{ width: "50%"}}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name </Form.Label>
                    <Form.Control
                        autoFocus
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        size="lg"            
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name </Form.Label>
                    <Form.Control
                        value={lastName}
                        required
                        onChange={e => setLastName(e.target.value)}
                        size="lg"            
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        size="lg"            
                    />
                </Form.Group>
                <Form.Group controlId="phoneNo">
                    <Form.Label> Phone No </Form.Label>
                    <Form.Control
                        value={phoneNo}
                        required
                        onChange={e => setPhoneNo(e.target.value)}
                        type="number"
                        size="lg"            
                    />
                </Form.Group>
                <Form.Group controlId="status">
                    <Form.Label> Status </Form.Label>
                    <Form.Control as="select" onChange={(e) => setStatus(e.target.value)} value={status}>
                        <option> Active </option>
                        <option> Inactive</option>
                    </Form.Control>
                </Form.Group>
                <Button variant={`${validateForm() ? 'primary' : ''}`} disabled={!validateForm()} type="submit" className={`${validateForm() ? '' : 'custom-secondary-btn'}`}>
                    {isLoading ? "Creating..." : "Create"}
                </Button>
            </form>
        </Row>
      </Container>
  );
}

export default NewContact;