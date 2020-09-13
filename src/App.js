import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Routes from './Routes';
import { Auth } from "aws-amplify";
import AppContext from "./utils/context";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const App = () => {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert("Something went wrong.Please try after sometime.");
      }
    }
  
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Navbar.Brand>
          <Link to="/"> <h1> Diary </h1>  </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-right">
          {isAuthenticated ?
            <Nav>
              <Nav.Link onClick={handleLogout}> Logout </Nav.Link>
            </Nav> :
            <Nav>
              <Link to="/login"> Login </Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;