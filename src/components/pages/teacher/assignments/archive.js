import React, { Fragment, useEffect, useState, } from "react";
import { Container, Image } from "semantic-ui-react";
import COLORS from "./../../../color";
import { Link } from "react-router-dom";
import unarchieve  from "../../../../assets/images/icons/unarchieve.png"
import dateIconBlue from "../../../../assets/images/icons/calendarBlue.png"
import { useDispatch, useSelector } from "react-redux";
import { FormatDate } from "../../../../utils/utils";
import { apiCall } from "../../../../main/axios";
import { TEACHER_ACTIONS } from "../../../../main/store/actions";
import { toast } from "react-toastify";
import NewAssignment from "./newAssigment";

const Archive = () => {

    const dispatcher = useDispatch();
    const assignments = useSelector(state => state.teacher.assignments);
    const [filterAssignment,setFilterAssignment] = useState([]);

    useEffect(() => {
        if(assignments){
            getArchievedAssignment();
        }
    }, [assignments]);

    const getArchievedAssignment = () => {
        let list=assignments.filter((item)=>{
            return item.achrived === true;
        })
        setFilterAssignment(list);
    };

    const unAchrive = (item) => {
        apiCall("put", "/assignment/updateAssignment", {id:item._id,achrived:false}).then((data) => {
            toast.success("Unarchieve Successfully!")
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
                            <button style={{ ...ButtonStyle }} >Management</button>
                        </Link>
                        <Link to="/teacher/assigments/archive">
                            <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, marginLeft: "-2px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Archived</button>
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
                                <div style={{ display: "flex", flexDirection: "column", }}>
                                    <label style={{ color: COLORS.MAIN, fontWeight: "1", fontSize: "1rem" }}>{assignment.class.name+assignment.class.section+ " - " + assignment.course.name}</label>
                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "1.1rem" }}>{assignment.title}</label>
                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "0.9rem" }}>{assignment.subtopic}</label>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", }}>
                                    <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY_LIGHT, display: "flex", fontSize: "0.9rem",marginBottom:"0.1em",fontWeight:"bolder",alignItems:"center" }}>
                                        <Image style={{marginRight:"0.5em"}} src={dateIconBlue} width={25} />
                                        {"Created on " + FormatDate(assignment.submissionDate)}
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
                                {/* <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",fontWeight:"bolder",alignItems:"center" }}>
                        
                                </div> */}
                                <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Image src={unarchieve} width={30} style={{cursor:"pointer"}} onClick={()=>unAchrive(assignment)}/>
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
    outline: "none"
}

const CircularCountStyle = {
    color: COLORS.MAIN,
    backgroundColor: "#ECF0FF",
    marginRight:"0.5em",
    padding:"0.5em 1em 0.5em 1em",
    borderRadius:"100%"
}

export default Archive;
