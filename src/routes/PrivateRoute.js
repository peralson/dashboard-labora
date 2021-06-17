import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageGrid from "../components/main/PageGrid";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          return (
            <PageGrid>
              <Component {...props} />
            </PageGrid>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    ></Route>
  );
};

export default PrivateRoute;
