import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Icon, Image, Label , Dropdown } from 'semantic-ui-react';
import { useLocation } from "react-router";
import COLORS from "../../../color"
import dateIconRed from "../../../../assets/images/icons/calendarRed.png"
import dateIconBlue from "../../../../assets/images/icons/calendarBlue.png"
// import Profile from "../../../../assets/images/topbar/profile.png"
import Search from "./../../../../assets/images/icons/search.png"
import Filter from "./../../../../assets/images/icons/filter.png"
import { FormatDate } from "../../../../utils/utils"; 

const Grade = () => {
    const history = useHistory();
    const location = useLocation();
    const [assignment, setAssignment] = useState([]);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [flag,setFlag] = useState(true);

    useEffect(() => {
        if(location.assignment){
            setAssignment(location.assignment)
            if(location.assignment.assignedStudents.length!==0){
                setAssignedStudents(location.assignment.assignedStudents);
            }
        }
    }, [location.assignment]);

    return (
        <Fragment>
            <Link to="/teacher/assigments/management">
                <Label style={{backgroundColor:COLORS.BACKGROUND,color:COLORS.MAIN,pointer:"cursor"}}><Icon name='chevron left' />Back</Label><br/>
            </Link>
            {assignment.length === 0 ? null:
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
                                {/* <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }}>Archieve</button>
                                        <Link to="/teacher/assigments/grade">
                                            <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }}>Check</button>
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
            }
                        {
                        flag?
                            <Fragment>
                            <Container style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}>
                                    <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", width: "100%", alignItems: "center", }}>
                                        <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px" }}>
                                                <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} onClick={()=>setFlag(true)}>To be graded</button>
                                                <button style={{ ...ButtonStyle }} onClick={()=>setFlag(false)}>Completed</button>
                                        </div>
                                            <div style={{ display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
                                                <div style={{padding:"0.2em"}}><Image src={Search} width={20}/></div>
                                                <div style={{ display: "flex",flexDirection:"row",padding:"0.2em"}}>
                                                    <label style={{fontSize:"16px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY}}>Submission Time</label>
                                                    <div><Image src={Filter} width={20}/></div>
                                                </div>
                                                <div style={{padding:"0.2em",marginRight:"1em"}}>
                                                    <Dropdown floating options={[ { key: 'new', text: 'New', value: 'new' }, { key: 'world', text: 'World', value: 'wprld' }]} style={{fontSize:"17px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY}} text="Class"/>
                                                </div>
                                            </div>
                                    </div>
                                
                                </Container>
                                {
                                assignedStudents.length!==0?    
                                <div>
                                {
                                assignedStudents.map((item,index)=>{
                                    if(item.submit===true && item.checked===false){
                                    return(
                                        <div key={index} style={AssignmentBlockStyle}>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Image src={item.student.image} width={40} />
                                            <div style={{ display: "flex", flexDirection: "column",marginLeft:"1em" }}>
                                                <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "1.1rem" }}>{item.student.name}</label>
                                                <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "0.9rem" }}>{item.student.email}</label>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column",width:"50%" }}>
                                            <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY_LIGHT, display: "flex", fontSize: "0.9rem",marginBottom:"0.1em",fontWeight:"bolder",alignItems:"center" }}>
                                                <Image style={{marginRight:"0.5em"}} src={dateIconBlue} width={25} />
                                                {"Created on " + FormatDate(assignment.submissionDate)}
                                            </div>
                                        </div>
                                        <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                            <Link to={{ pathname: "/teacher/assigments/grading", assignment:{id:assignment._id,student:item.student._id,file:assignment.file.location} }}>
                                                <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }}>Start Grading</button>
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    }
                                })
                                }
                            </div>:<label style={{fontSize:"16px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY,marginLeft:"2rem"}}>No Student Assigned to Assignment</label>
                            }   
                            </Fragment>
                            :
                            <Fragment>
                            <Container style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}>
                                    <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", width: "100%", alignItems: "center", }}>
                                        <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px" }}>
                                                <button style={{ ...ButtonStyle}} onClick={()=>setFlag(true)}>To be graded</button>
                                                <button style={{ ...ButtonStyle , backgroundColor: COLORS.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} onClick={()=>setFlag(false)}>Completed</button>
                                        </div>
                                            <div style={{ display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
                                                <div style={{padding:"0.2em"}}><Image src={Search} width={20}/></div>
                                                <div style={{ display: "flex",flexDirection:"row",padding:"0.2em"}}>
                                                    <label style={{fontSize:"16px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY}}>Submission Time</label>
                                                    <div><Image src={Filter} width={20}/></div>
                                                </div>
                                                <div style={{padding:"0.2em",marginRight:"1em"}}>
                                                    <Dropdown floating options={[ { key: 'new', text: 'New', value: 'new' }, { key: 'world', text: 'World', value: 'wprld' }]} style={{fontSize:"17px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY}} text="Class"/>
                                                </div>
                                            </div>
                                    </div>
                                
                                </Container>
                                {
                                assignedStudents.length!==0?    
                                <div>
                                {
                                assignedStudents.map((item,index)=>{
                                    if(item.submit===true && item.checked===true){
                                    return( 
                                        <div key={index} style={AssignmentBlockStyle}>
                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                <Image src={item.student.image} width={40} />
                                                <div style={{ display: "flex", flexDirection: "column",marginLeft:"1em" }}>
                                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "1.1rem" }}>{item.student.name}</label>
                                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "0.9rem" }}>{item.student.email}</label>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY_LIGHT, display: "flex", fontSize: "0.9rem",marginBottom:"0.1em",fontWeight:"bolder",alignItems:"center" }}>
                                                    <Image style={{marginRight:"0.5em"}} src={dateIconBlue} width={25} />
                                                    {"Created on " + FormatDate(assignment.submissionDate)}
                                                </div>
                                            </div>
                                            <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem",fontWeight:"bolder",alignItems:"center",width:"30%" }}>
                                                <div style={CircularCountStyle}>{item.grade}</div>
                                                Grade
                                            </div>
                                            <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }} onClick={()=>history.push({ pathname: "/teacher/assigments/view", assignment:assignment,caller:"view" }) }>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    }
                                })
                                }
                            </div>:<label style={{fontSize:"16px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY,marginLeft:"2rem"}}>No Student Assigned to Assignment</label>
                            }
                            </Fragment>
                        }
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

export default Grade;