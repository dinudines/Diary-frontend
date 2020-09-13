import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import AppContext from "../utils/context";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Route {...rest}> { isAuthenticated
      ? (children) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}

export default AuthenticatedRoute;