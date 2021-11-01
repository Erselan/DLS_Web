import React, { Fragment, useEffect, useState, } from "react";
import { Container, Image } from "semantic-ui-react";
import COLORS from "./../../../color";
import { Link } from "react-router-dom";
import dateIconRed from "../../../../assets/images/icons/calendarRed.png"
import dateIconBlue from "../../../../assets/images/icons/calendarBlue.png"
import { useDispatch, useSelector } from "react-redux";
import { FormatDate } from "../../../../utils/utils";
import { apiCall } from "../../../../main/axios";
import { TEACHER_ACTIONS } from "../../../../main/store/actions";
import { toast } from "react-toastify";
import NewAssignment from "./newAssigment";

const Management = () => {
    const dispatcher = useDispatch();
    const assignments = useSelector(state => state.teacher.assignments);
    const [filterAssignment,setFilterAssignment] = useState([]);

    useEffect(() => {
        if(assignments){
            getUnarchievedAssignment();
        }
    }, [assignments]);

    const getUnarchievedAssignment = () => {
        let list=assignments.filter((item)=>{
            return item.achrived === false;
        })
        setFilterAssignment(list);
    };

    const achrive = (item) => {
        apiCall("put", "/assignment/updateAssignment", {id:item._id,achrived:true}).then((data) => {
            toast.success("Archieve Successfully!")
            apiCall("get", "/assignment/getAssignments").then((res) => {
                dispatcher({ type: TEACHER_ACTIONS.REPLACE_ASSIGNMENTS, payload: res.result });
              }).catch((err) => {
                console.log(err);
              });
          }).catch((err) => {
            toast.error("An Error Occured!")
            console.log(err);
          });
    }

    return (
        <Fragment>
            <Container style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}>
                <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", width: "100%", alignItems: "center", }}>
                    <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px" }}>
                        <Link to="/teacher/assigments">
                            <button style={{ ...ButtonStyle }} >Assignments</button>
                        </Link>
                        <Link to="/teacher/assigments/management">
                            <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, marginLeft: "-2px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>Management</button>
                        </Link>
                        <Link to="/teacher/assigments/archive">
                            <button style={{ ...ButtonStyle }} >Archived</button>
                        </Link>

                    </div>
                    <div>
                        <NewAssignment/>
                    </div>
                </div>
            </Container>
            <Container style={{ width: "100%", paddingBottom: "15px", marginTop: "-10px" }}>
                {
                    filterAssignment.map((assignment) => {
                        return (
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
                                        {"Created on " + FormatDate(assignment.createdAt)}
                                    </div>
                                    <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",marginBottom:"0.1em",fontWeight:"bolder",alignItems:"center" }}>
                                    <Image style={{marginRight:"0.5em"}} src={dateIconRed} width={25} />
                                        {"Deadline on " + FormatDate(assignment.dueDate)}
                                    </div>
                                </div>
                                <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",fontWeight:"bolder",alignItems:"center"}}>
                                    <div><div style={CircularCountStyle}>{assignment.checked}</div></div>
                                    <div >
                                        <label style={{ color: COLORS.TEXT_PRIMARY_LIGHT, fontSize: "0.9rem" }}>Completed</label>
                                        <br/>
                                        <label style={{ color: "#FF5E55", fontSize: "0.9rem" }}>{assignment.assignedStudents.length-assignment.submit} didn't submit</label>
                                    </div>
                                </div>
                                <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",fontWeight:"bolder",alignItems:"center" }}>
                                    <div style={CircularCountStyle}>{assignment.submit-assignment.checked}</div>
                                    To grade
                                </div>
                                <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }} onClick={()=>achrive(assignment)}>Archieve</button>
                                        <Link to={{ pathname: "/teacher/assigments/grade", assignment:assignment }}>
                                            <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }}>Check</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </Container>
        </Fragment>
    );
};

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

export default Management;
