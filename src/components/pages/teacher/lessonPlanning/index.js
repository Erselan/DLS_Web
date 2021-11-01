import React, { Fragment, useEffect, useState } from "react";
import { Image, Radio } from "semantic-ui-react";
import Authenticator from "./../../../../main/auth";
import { Route, Switch, useLocation } from "react-router-dom";

import LessonPlanningDate from "./lessonPlanningDate";
import LessonPlanningContent from "./lessonPlanningContent";
import LessonPlanningSummary from "./lessonPlanningSummary";

import Colors from "../../../color";
import Back from "../../../../assets/images/icons/left.png";
import Forward from "../../../../assets/images/icons/right.png";
import Book from "../../../../assets/images/icons/book.png";

const TEACHER = "teacher"


const LessonPlanning = () => {
    const location = useLocation();
    const [isDate, setDate] = useState(false);
    const [isContent, setContent] = useState(false);
    const [isSummary, setSummary] = useState(false);

    useEffect(() => {
        const pathname = location.pathname.split("/");
        const pageOpened = pathname[pathname.length - 1];
        switch (pageOpened) {
            case "date":
                setDate(true);
                break;
            case "content":
                setContent(true);
                break;
            case "select":
                setContent(true);
                break;
            case "summary":
                setSummary(true);
                break;
            default:
                break;
        }
    }, [location.pathname]);

    // const moveBack = () => {
    //     if (isDate) {
    //     } else if (isContent) {
    //         history.push("/teacher/lessonPlanning/date");
    //     } else if (isSummary) {
    //         history.push("/teacher/lessonPlanning/content");
    //     }
    // }

    // const moveForward = () => {
    //     if (isDate) {
    //         history.push("/teacher/lessonPlanning/content");
    //     } else if (isContent) {
    //         history.push("/teacher/lessonPlanning/summary");
    //     } else if (isSummary) {
    //     }
    // }

    return (
            <div style={{ padding: "2rem", marginTop: "0.5rem" }}>
                    <div style={flexStyle}>
                        <div style={{ ...flexStyle, width: "100%", marginTop: "3rem" }}>

                            <div style={{ width: "30%" }}>
                                <label style={{ color: Colors.TEXT_PRIMARY, fontWeight: "bolder" }}>Lesson Planning</label>
                            </div>
                            <div style={{ ...flexStyle, flexDirection: "column", alignItems: "center", height: "10%" }}>
                                <label style={{ color: Colors.TEXT_PRIMARY, fontSize: "1rem", fontWeight: "bold" }}>Date</label>
                                <Radio checked={isDate || isContent || isSummary} />
                            </div>
                            <div style={{
                                border: (isContent || isSummary) ? "2px solid " + Colors.MAIN : "2px solid " + Colors.TEXT_SECONDARY, borderRadius: "10px", height: "2px", width: "150px", marginTop: "2.5rem"
                            }} />

                            <div style={{ ...flexStyle, flexDirection: "column", alignItems: "center", height: "10%" }}>
                                <label style={{ color: isContent || isSummary?Colors.TEXT_PRIMARY:Colors.TEXT_SECONDARY, fontSize: "1rem" }}>Content</label>
                                <Radio checked={isContent || isSummary} />
                            </div>
                            <div style={{ border: isSummary ? "2px solid " + Colors.MAIN : "2px solid " + Colors.TEXT_SECONDARY, borderRadius: "10px", height: "2px", width: "150px", marginTop: "2.5rem" }} />

                            <div style={{ ...flexStyle, flexDirection: "column", alignItems: "center", height: "10%" }}>
                                <label style={{ color: isSummary?Colors.TEXT_PRIMARY:Colors.TEXT_SECONDARY, fontSize: "1rem" }}>Summary</label>
                                <Radio checked={isSummary} />
                            </div>

                        </div>

                        <div style={{ ...flexStyle, flexDirection: "column" }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ margin: "0rem 0.2rem", opacity: isDate ? 0.5 : 1 }}><Image src={Back} width={25} /></div>
                                <div style={{ margin: "0rem 0.2rem", opacity: isSummary ? 0.5 : 1 }}><Image src={Forward} width={25} /></div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                                <Image src={Book} width={60} />
                            </div>
                            <label style={{ fontSize: "1rem" }}>Teacher's book</label>
                        </div>

                    </div>
                    
                    <Switch>
                        <Route exact path="/teacher/lessonPlanning/date" component={Authenticator(LessonPlanningDate, TEACHER)} />
                        <Route path="/teacher/lessonPlanning/content" component={Authenticator(LessonPlanningContent, TEACHER)} />
                        <Route exact path="/teacher/lessonPlanning/summary" component={Authenticator(LessonPlanningSummary, TEACHER)} />
                        <Route><Fragment>
                            <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {404}
                            </div>
                        </Fragment></Route>
                    </Switch>
                </div>
    );

};

const flexStyle = {
    display: "flex",
    justifyContent: "space-between"
}

export default LessonPlanning;
