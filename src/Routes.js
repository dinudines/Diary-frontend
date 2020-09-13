import React from "react";
import { Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnAuthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NewContact from "./containers/NewContact";
import Contacts from "./containers/Contacts";
import NotFound from "./containers/NotFound";

const Routes = () => (
    <Switch>
        <AuthenticatedRoute exact path="/"> <Home /> </AuthenticatedRoute>
        <UnauthenticatedRoute exact path="/login"> <Login /> </UnauthenticatedRoute>
        <AuthenticatedRoute exact path="/contacts/new"> <NewContact /> </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/contacts/:id"> <Contacts /> </AuthenticatedRoute>
        <AuthenticatedRoute> <NotFound /> </AuthenticatedRoute>
    </Switch>
);

export default Routes;