import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Authenticator from "../../../main/auth";
import Dashboard from "./dashboard";
import Quiz from "./quiz";
import Assignments from "./assignments";
import Groups from "./groups";
import Chats from "./chats";
import Students from "./students";
import Resources from "./resources";
import LessonPlanning from "./lessonPlanning";

import Home from "../../../assets/images/icons/home.png";
import Heart from "../../../assets/images/icons/heart.png";
import Laptop from "../../../assets/images/icons/laptop.png";
import Notebook from "../../../assets/images/icons/notebook.png";

import Sidebar from "../../layouts/sidebar";
import Topbar from "../../layouts/topbar";

const TEACHER = "teacher"

const Bars = [
    {
        title: "Home",
        alt: "home",
        link: "/teacher",
        icon: Home
    },
    {
        title: "Assignments",
        alt: "courses",
        link: "/teacher/assigments",
        icon: Laptop
    },
    {
        title: "Lesson Planning",
        alt: "teachers",
        link: "/teacher/lessonPlanning/date",
        icon: Notebook
    },
    {
        title: "My Students",
        alt: "logout",
        link: "/teacher/students",
        icon: Heart
    },
    {
        title: "Resources",
        alt: "logout",
        link: "/teacher/resources",
        icon: Notebook
    },
    {
        title: "Logout",
        alt: "logout",
        link: "/",
        icon: Home
    },
];

const Teacher = () => {
    return (
        <Fragment>
            <Topbar userType={"teacher"} />
            <Sidebar Bars={Bars} >
                <Switch>
                    <Route exact path="/teacher" component={Authenticator(Dashboard, TEACHER)} />
                    <Route path="/teacher/lessonPlanning" component={Authenticator(LessonPlanning, TEACHER)} />
                    <Route exact path="/teacher/quizes" component={Authenticator(Quiz, TEACHER)} />
                    <Route path="/teacher/assigments" component={Authenticator(Assignments, TEACHER)} />
                    <Route exact path="/teacher/chats" component={Authenticator(Chats, TEACHER)} />
                    <Route exact path="/teacher/groups" component={Authenticator(Groups, TEACHER)} />
                    <Route exact path="/teacher/resources" component={Authenticator(Resources, TEACHER)} />
                    <Route path="/teacher/students" component={Authenticator(Students, TEACHER)} />
                    <Route><Fragment>
                        <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {404}
                        </div>
                    </Fragment></Route>
                </Switch>
            </Sidebar>
        </Fragment>
    );
}

export default Teacher;