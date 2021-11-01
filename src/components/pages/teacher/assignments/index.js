import React, { Fragment } from "react";
import Authenticator from "./../../../../main/auth";
import { Route, Switch } from "react-router-dom";
import MyAssignment from "./myassignments";
import Management from "./management";
import Archive from "./archive";
import ViewAssignment from "./viewassignment";
import Grade from "./grade";
import Grading from "./startGrading";
import Completed from "./completed";

const TEACHER = "teacher"

const Assignments = () => {

    return (
            <div style={{ padding: "2rem" }}>
                    <Switch>
                        <Route exact path="/teacher/assigments" component={Authenticator(MyAssignment, TEACHER)} />
                        <Route exact path="/teacher/assigments/management" component={Authenticator(Management, TEACHER)} />
                        <Route exact path="/teacher/assigments/archive" component={Authenticator(Archive, TEACHER)} />
                        <Route exact path="/teacher/assigments/view" component={Authenticator(ViewAssignment, TEACHER)} />
                        <Route exact path="/teacher/assigments/grade" component={Authenticator(Grade, TEACHER)} />
                        <Route exact path="/teacher/assigments/completed" component={Authenticator(Completed, TEACHER)} />
                        <Route exact path="/teacher/assigments/grading" component={Authenticator(Grading, TEACHER)} />
                        <Route><Fragment>
                            <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {404}
                            </div>
                        </Fragment></Route>
                    </Switch>
            </div>
    );

};

export default Assignments;
