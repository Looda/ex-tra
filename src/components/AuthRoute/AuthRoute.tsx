import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useUsers } from "../UserContext/UserContextProvider";

const AuthRoute: React.FC<RouteProps> = (props) => {
  const { isAuth, users } = useUsers();
  return isAuth ? (
    <Route {...props} />
  ) : (
    <Redirect to={users?.length > 0 ? "/login" : "/signup"} />
  );
};

export default AuthRoute;
