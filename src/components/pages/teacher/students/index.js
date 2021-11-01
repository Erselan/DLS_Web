import React from 'react';
import Authenticator from "../../../../main/auth";
import { Route, Switch } from "react-router-dom";

import MyStudents from './myStudents';
import Class from './class';
import Student from './student'

const Students = () => {
    return (
        <Switch>
            <Route exact path="/teacher/students" component={Authenticator(MyStudents, "teacher")} />
            <Route exact path="/teacher/students/class" component={Authenticator(Class, "teacher")} />
            <Route exact path="/teacher/students/student" component={Authenticator(Student, "teacher")} />
            <Route>
                <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {404}
                </div>
            </Route>
        </Switch>
    );
};

export default Students;
