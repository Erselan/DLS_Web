import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../../components/pages/Homepage";
import Admin from "../../components/pages/admin/";
import Teacher from "../../components/pages/teacher/";

import Authenticator from "../auth";
import Error from "../errors";

const TEACHER = "teacher";
const ADMIN = "admin"

const ERROR_401 = 401;
const ERROR_404 = 404;
const ERROR_500 = 500;

const Routes = () => {

  return (
    <Switch>
      <Route path="/admin" component={Authenticator(Admin, ADMIN)} />
      <Route path="/teacher" component={Authenticator(Teacher, TEACHER)} />
      <Route exact path="/server-not-responding" ><Error Code={ERROR_500} /></Route>
      <Route exact path="/not-authorized" ><Error Code={ERROR_401} /></Route>
      <Route path="/" component={HomePage} />
      <Route><Error Code={ERROR_404} /></Route>
    </Switch>
  );
};

export default Routes;
