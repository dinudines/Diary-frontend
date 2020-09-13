import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { DataTable } from 'mdbreact';
import AppContext from "../utils/context";
import { onError } from "../utils/errorHandling";
import getContacts from "../services/getContacts";
import Spinner from '../components/Spinner';
import "./Home.css";

const Home = () => {
  const { isAuthenticated } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const columns = [{
    label: 'First Name',
    field: 'firstname',
    sort: 'asc',
    width: 100,
  }, {
    label: 'Last Name',
    field: 'lastname',
    sort: 'asc',
    width: 100,
  }, {
    label: 'Email ID',
    field: 'email',
    sort: 'asc',
    width: 200,
  }, {
    label: 'Phone No',
    field: 'phone',
    sort: 'asc',
    width: 100,
  }, {
    label: 'Status',
    field: 'status',
    sort: 'asc',
    width: 100,
  },{
    label: 'View Details',
    field: 'view',
    width: 100,
  }]

  useEffect(() => {
    const onLoad = async() => {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const allContacts = await getContacts();
        setContacts(allContacts);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);

  const renderContactsList = (contacts) => {
    const rows = contacts.map(contact => {
      return {
        firstname: contact.content.firstName || "",
        lastname: contact.content.lastName || "",
        email: contact.content.email || "",
        phone: contact.content.phoneNo || "",
        status: contact.content.status,
        view: <Link to={`/contacts/${contact.contactId}`}> View </Link>
      }
    });
    const datatable = {columns, rows};
    return <DataTable
      responsive
      hover
      entriesOptions={[5, 10, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      searching={false}
      sortable={false}
    />;
  }

  const renderLander = () => {
    return (
      <div className="lander">
        <h3> Diary </h3>
        <p> A simple app for managing contacts at ease </p>
      </div>
    );
  }

  const renderContacts = () => {
    return (
      <Container>
        <Row className="header">
          <Col sm={8}>
            <h2>Your Contacts </h2>
          </Col>
          <Col sm={4} className="create-btn-div">
            <Link to="/contacts/new"> <Button variant="outline-primary" className="create-btn">  Create </Button> </Link> 
          </Col>
        </Row>
        <Row className="table-div">
          { isLoading ? <Spinner isLoading={true} /> :
            <div> {!isLoading && renderContactsList(contacts)} </div>
          }
        </Row>
      </Container>
    );
  }
  return (
    <div className="Home">
      {isAuthenticated ? renderContacts() : renderLander()}
    </div>
  );
}

export default Home;