import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Authenticator from "./../../../../main/auth";
import { Route, Switch } from "react-router-dom";
import Student from "./students"
import Teacher from './teachers'
import Admins from './admins'

const User = () => {
    const Admin = "admin";
    return (
        <Fragment>
            <Container style={{ padding: "5px" }}>
                <Switch>
                    <Route exact path="/admin/user" component={Authenticator(Student, Admin)} />
                    <Route exact path="/admin/user/teacher" component={Authenticator(Teacher, Admin)} />
                    <Route exact path="/admin/user/admin" component={Authenticator(Admins, Admin)} />
                    <Route><Fragment>
                        <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {404}
                        </div>
                    </Fragment></Route>
                </Switch>
            </Container>
        </Fragment>
    );
}

export default User;