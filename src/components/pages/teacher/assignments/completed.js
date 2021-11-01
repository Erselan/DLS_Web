import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import { Container, Icon, Image, Label } from 'semantic-ui-react';
import COLORS from "../../../color"
import dateIconRed from "../../../../assets/images/icons/calendarRed.png"
import dateIconBlue from "../../../../assets/images/icons/calendarBlue.png"
import Profile from "../../../../assets/images/topbar/profile.png"
const Completed = () => {

    const location = useLocation();
    const [assignment, setAssignment] = useState([]);

    useEffect(() => {
        console.log(location.assignment)
        if(location.assignment){
            // setAssignment(location.assignment)
        }
    }, []);

    return (
        <Fragment>
            <Link to="/teacher/assigments/management">
                <Label style={{backgroundColor:COLORS.BACKGROUND,color:COLORS.MAIN,pointer:"cursor"}}><Icon name='chevron left' />Back</Label><br/>
            </Link>
            <div key={assignment._id} style={AssignmentBlockStyle}>
                                <div style={{ display: "flex", flexDirection: "row",justifyContent:"flex-start" }}>
                                    <div style={LineStyle}></div>
                                    <div style={{ display: "flex", flexDirection: "column", }}>
                                        <label style={{ color: COLORS.MAIN, fontWeight: "1", fontSize: "1rem" }}>{assignment.class.name+assignment.class.section+ " - " + assignment.course.name}</label>
                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "1.1rem" }}>{assignment.title}</label>
                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "0.9rem" }}>{assignment.subtopic}</label>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", }}>
                                    <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY_LIGHT, display: "flex", fontSize: "0.9rem",marginBottom:"0.1em",fontWeight:"bolder",alignItems:"center" }}>
                                        <Image style={{marginRight:"0.5em"}} src={dateIconBlue} width={25} />
                                        {"Created on " + assignment.submissionDate}
                                    </div>
                                    <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",marginBottom:"0.1em",fontWeight:"bolder",alignItems:"center" }}>
                                    <Image style={{marginRight:"0.5em"}} src={dateIconRed} width={25} />
                                        {"Created on " + assignment.submissionDate}
                                    </div>
                                </div>
                                <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",fontWeight:"bolder",alignItems:"center"}}>
                                    <div><div style={CircularCountStyle}>12</div></div>
                                    <div >
                                        <label style={{ color: COLORS.TEXT_PRIMARY_LIGHT, fontSize: "0.9rem" }}>Completed</label>
                                        <br/>
                                        <label style={{ color: "#FF5E55", fontSize: "0.9rem" }}>4 didn't submit</label>
                                    </div>
                                </div>
                                <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",fontWeight:"bolder",alignItems:"center" }}>
                                    <div style={CircularCountStyle}>6</div>
                                    To grade
                                </div>
                                <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }}>Archieve</button>
                                        <Link to="/teacher/assigments/grade">
                                            <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }}>Check</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Container style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}>
                <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", width: "100%", alignItems: "center", }}>
                    <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px" }}>
                        <Link to={{ pathname: "/teacher/assigments/grade", assignment:assignment }}>
                            <button style={{ ...ButtonStyle}} >To be graded</button>
                        </Link>
                        {/* <Link to="/teacher/assigments/management"> */}
                            <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, marginLeft: "-2px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Completed</button>
                        {/* </Link> */}
                    </div>
                </div>   
            </Container>
                            <div key={assignment._id} style={AssignmentBlockStyle}>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <Image src={Profile} width={40} />
                                    <div style={{ display: "flex", flexDirection: "column",marginLeft:"1em" }}>
                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "1.1rem" }}>Alex Brown</label>
                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "0.9rem" }}>2345262</label>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY_LIGHT, display: "flex", fontSize: "0.9rem",marginBottom:"0.1em",fontWeight:"bolder",alignItems:"center" }}>
                                        <Image style={{marginRight:"0.5em"}} src={dateIconBlue} width={25} />
                                        {"Created on " + assignment.submissionDate}
                                    </div>
                                </div>
                                <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",fontWeight:"bolder",alignItems:"center",width:"30%" }}>
                                    <div style={CircularCountStyle}>88</div>
                                    Grade
                                </div>
                                <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }}>View</button>
                                    </div>
                                </div>
                            </div>
                </Fragment>
    );
}

const AssignmentBlockStyle = {
    marginTop: "15px",
    alignItems: "center",
    backgroundColor: COLORS.FOREGROUND,
    borderRadius: "15px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "30px",
    paddingRight: "30px",
    flexWrap: "wrap",
}

const ButtonStyle = {
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: "#EBECF2",
    borderRadius: "14px",
    fontSize: "0.8rem",
    border: "none",
    fontWeight: "bolder",
    padding: "12px 20px 12px 20px",
    margin: "2px",
    outline: "none"
}

const CircularCountStyle = {
    color: COLORS.MAIN,
    backgroundColor: "#ECF0FF",
    // height:"2em",
    // width:"2em",
    // alignItems:"center",
    marginRight:"0.5em",
    padding:"0.5em 1em 0.5em 1em",
    borderRadius:"100%"
}

const LineStyle = {
    borderLeft: "8px solid #FF5E55",
    height: "80px",
    borderRadius: "60px",
    marginRight:"1em"
}

export default Completed;