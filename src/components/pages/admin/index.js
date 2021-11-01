import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Authenticator from "../../../main/auth";
import Courses from "./courses";
import Classes from "./classes";
import User from "./user/index";
import CourseAssigning from "./courseAssigning";
import Schedule from "./schedule/schedule";

import Home from "../../../assets/images/icons/home.png";
import Notebook from "../../../assets/images/icons/laptop.png";
import Resources from "../../../assets/images/icons/notebook.png";
import Group from "../../../assets/images/icons/group.png";

import Sidebar from "../../layouts/sidebar";
import Topbar from "../../layouts/topbar";

const ADMIN = "admin"

const Bars = [
    {
        title: "Courses",
        alt: "courses",
        link: "/admin",
        icon: Notebook
    },
    {
        title: "Classes",
        alt: "classes",
        link: "/admin/classes",
        icon: Resources
    },
    {
        title: "User",
        alt: "user",
        link: "/admin/user",
        icon: Resources
    },
    {
        title: "Course. Assigning",
        alt: "assigning",
        link: "/admin/courseAssigning",
        icon: Group
    },
    {
        title: "Schedule",
        alt: "assigning",
        link: "/admin/schedule",
        icon: Group
    },
    {
        title: "Logout",
        alt: "logout",
        link: "/",
        icon: Home
    },
];

const Admin = () => {
    return (
        <Fragment>
            <Topbar userType={"admin"} />
            <Sidebar Bars={Bars} >
                <Switch>
                    <Route exact path="/admin" component={Authenticator(Courses, ADMIN)} />
                    <Route exact path="/admin/classes" component={Authenticator(Classes, ADMIN)} />
                    <Route path="/admin/user" component={Authenticator(User, ADMIN)} />
                    <Route exact path="/admin/courseAssigning" component={Authenticator(CourseAssigning, ADMIN)} />
                    <Route exact path="/admin/schedule" component={Authenticator(Schedule, ADMIN)} />
                    <Route><Fragment>
                        <div style={ErrorStyle}>{404}</div>
                    </Fragment></Route>
                </Switch>
            </Sidebar>
        </Fragment>
    );
}

const ErrorStyle = {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export default Admin;