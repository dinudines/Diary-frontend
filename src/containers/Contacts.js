import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { onError } from "../utils/errorHandling";
import loadContact from "../services/getSingleContact";
import saveContact from '../services/saveContact';
import deleteContact from '../services/deleteContact';
import Spinner from '../components/Spinner';

const Contacts = () => {

    const { id } = useParams();
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
   
        const onLoad = async () => {
            setIsLoading(true);
            try {
                const { content } = await loadContact(id);
                const { firstName, lastName, email, phoneNo, status } = content;

                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);
                setPhoneNo(phoneNo);
                setStatus(status);
                setIsLoading(false);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);
    
    const validateForm = () => {
        return firstName.length && lastName.length && email.length && phoneNo.length;
    }
    
    const handleDelete = async (e) => {
        e.preventDefault();
  
        const confirmed = window.confirm(
            "Are you sure you want to delete this contact?"
        );
  
        if (!confirmed) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteContact(id);
            history.push("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await saveContact(id, { firstName, lastName, email, phoneNo, status });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Row className="header">
                <Col sm={8}>
                    <h2> Edit Contact </h2>
                </Col>
                <Col sm={4} className="create-btn-div">
                    <Link to="/"> <Button variant="outline-primary" className="create-btn">  Go back </Button> </Link>
                </Col>
            </Row>
            <Row className="table-div">
                { isLoading ? <Spinner isLoading={true} /> :
                    <form onSubmit={handleSubmit} style={{ width: "50%" }}>
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
                        <Button variant={`${validateForm() ? 'primary' : 'secondary'}`} disabled={!validateForm()} type="submit">
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </form>
                }
            </Row>
        </Container>
    );
}

export default Contacts;