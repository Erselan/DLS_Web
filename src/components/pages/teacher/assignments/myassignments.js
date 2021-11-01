import React, { Fragment, useEffect, useState, } from "react";
import { Container, Dropdown, Form, Icon, Image} from "semantic-ui-react";
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import COLORS from "./../../../color";
import Modal from "../../../layouts/modal";
import Delete from "./../../../../assets/images/icons/delete.png";
import Edit from "./../../../../assets/images/icons/edit.png";
import Search from "./../../../../assets/images/icons/search.png"
import Filter from "./../../../../assets/images/icons/filter.png"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { apiCall } from "../../../../main/axios";
import { FormButton } from "../../../shared";
import { useDispatch, useSelector } from "react-redux";
import { FormatDate } from "../../../../utils/utils";
import { TEACHER_ACTIONS } from "../../../../main/store/actions";
import NewAssignment from "./newAssigment";
const Assignments = () => {

    const dispatcher = useDispatch();

    const isDesktop = useMediaQuery({ minWidth: 1050 });
    const isTablet = useMediaQuery({ minWidth: 880 });
    const isMobile = useMediaQuery({ maxWidth: 700 });
    const shouldChangeStack = useMediaQuery({ maxWidth: 635 });

    
    const students = useSelector(state => state.teacher.students);
    const assignments = useSelector(state => state.teacher.assignments);
    const [studentOptions, setStudentOptions] = useState([]);

    const [filterAssignment,setFilterAssignment] = useState([]);
   
    const [selectedAssignment, setSelectAssignment] = useState("");

    const [student, setStudent] = useState([]);
    // const [assignGrade, setAssignGrade] = useState("");
    // const [subject, setSubject] = useState("");
    const [deadline,setDeadline] = useState({date:"",time:""});
    const [openAssign, setOpenAssign] = useState(false);

    
    useEffect(() => {
        // console.log(assignments)
        if (assignments){
            getUnarchievedAssignment();
        }
        createOptions(students);
    }, [assignments,students]);

    const getUnarchievedAssignment = () => {
        let list=assignments.filter((item)=>{
            return item.achrived === false;
        })
        setFilterAssignment(list);
    };

    const createOptions = (students) => {

        let mystudentOptions = [];
    
        if(students){
            students.map((item) => {
            return mystudentOptions.push({ key: item._id, text: item.name, value: item._id, image: item.image });
            });
        }
    
        setStudentOptions(mystudentOptions)
      };

    const responsiveWidth = () => {
        if (isDesktop) {
            return { width: "25%" };
        }
        if (isTablet) {
            return { width: "50%" };
        }
        if (isMobile) {
            return { width: "100%", padding: "3px" };
        }
    }

    const stackAdjustment = () => {
        if (shouldChangeStack) {
            return { flexDirection: "column" }
        }
    }

      const onAssign = (id) => {
          console.log(id)
          if (student.length !== 0){
                setOpenAssign(false);
              let studentList = [];
              student.map((item)=>{
                studentList.push({student:item})
              })
              let deadlineFormated=new Date(deadline.date.slice(6,10),deadline.date.slice(3,5),deadline.date.slice(0,2),deadline.time.slice(0,2),deadline.time.slice(3,5))
              apiCall("put", "/assignment/updateAssignment", {id:id,dueDate:deadlineFormated,assignedStudents:studentList}).then((data) => {
                apiCall("get", "/assignment/getAssignments").then((res) => {
                    dispatcher({ type: TEACHER_ACTIONS.REPLACE_ASSIGNMENTS, payload: res.result });
                    toast.success("Students successfully assigned!")
                    setStudent([]);
                    setDeadline({date:"",time:""});
                  }).catch((err) => {
                    console.log(err);
                  });
              }).catch((err) => {
                toast.error("An Error Occured!")
                console.log(err);
              });
          }else {
            toast.error("No student selected!")
          }
          
        
      };

      const onDelete = (id) => {
        apiCall("delete", "/assignment/deleteAssignment?assignmentId="+id).then((res) => {
            apiCall("get", "/assignment/getAssignments").then((res) => {
                console.log(res.result)
                dispatcher({ type: TEACHER_ACTIONS.REPLACE_ASSIGNMENTS, payload: res.result });
              }).catch((err) => {
                console.log(err);
              });
          }).catch((err) => {
            console.log(err);
          });
      }

    return (
        <Fragment>
            <Container style={{ marginTop: "20px", width: "100%", marginBottom: "10px" }}>
                <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", width: "100%", alignItems: "center", ...stackAdjustment() }}>
                    <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px", display: "flex", ...stackAdjustment() }}>
                        <Link to="/teacher/assigments">
                            <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Assignments</button>
                        </Link>
                        <Link to="/teacher/assigments/management">
                            <button style={{ ...ButtonStyle }} >Management</button>
                        </Link>
                        <Link to="/teacher/assigments/archive">
                            <button style={{ ...ButtonStyle }} >Archived</button>
                        </Link>
                    </div>
                    <div style={{ display: "flex",flexDirection:"row wrap", justifyContent: "flex-end"}}>
                        {/* <div style={{ display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
                            <div style={{padding:"0.2em"}}><Image src={Search} width={20}/></div>
                            <div style={{ display: "flex",flexDirection:"row",padding:"0.2em"}}>
                                <label style={{fontSize:"16px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY}}>Date</label>
                                <div><Image src={Filter} width={20}/></div>
                            </div>
                            <div style={{padding:"0.2em",marginRight:"1em"}}>
                                <Dropdown floating options={[ { key: 'new', text: 'New', value: 'new' }, { key: 'world', text: 'World', value: 'wprld' }]} style={{fontSize:"17px",fontWeight:"bold",color:COLORS.TEXT_PRIMARY}} text="Grade"/>
                            </div>
                        </div> */}
                        <div>
                            <NewAssignment/>
                        </div>
                    </div>
                </div>
            </Container>
            <Container style={{ width: "100%", paddingBottom: "15px", marginTop: "-10px" }}>
                {
                    filterAssignment.map((assignment) => {
                        return (
                            <div key={assignment._id} style={AssignmentBlockStyle}>
                                <div style={{ display: "flex", flexDirection: "column", ...responsiveWidth() }}>
                                    <label style={{ color: COLORS.MAIN, fontWeight: "1", fontSize: "1rem" }}>{assignment.class.name+assignment.class.section+ " - " + assignment.course.name}</label>
                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "1.1rem" }}>{assignment.title}</label>
                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontSize: "0.9rem" }}>{assignment.subtopic}</label>
                                </div>
                                <div style={{ height: "100%", color: COLORS.TEXT_SECONDARY, display: "flex", fontSize: "0.9rem", ...responsiveWidth() }}>
                                    <Icon style={{ color: COLORS.MAIN }} size="large" name="calendar check"></Icon>
                                    {"Created on " + FormatDate(assignment.submissionDate)}
                                </div>
                                <div style={{ height: "100%", color: COLORS.TEXT_PRIMARY, display: "flex", fontSize: "0.9rem", ...responsiveWidth() }}>
                                    <Icon style={{ color: "#FF6347" }} size="large" name="file pdf"></Icon>
                                    {assignment.file.filename}
                                </div>
                                <div style={{ height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", ...responsiveWidth() }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <label style={{ color: COLORS.MAIN, fontSize: "0.8rem", fontWeight: "bold", marginRight: "10px",cursor:"pointer" }} onClick={()=>{setSelectAssignment(assignment._id);setOpenAssign(true)}}> Assign</label>
                                        <label style={{ marginRight: "10px" }}><Link to={{ pathname: "/teacher/assigments/view", assignment:assignment }} ><Image src={Edit} width="30" centered style={{cursor:"pointer"}}/></Link></label>
                                        <label> <Image src={Delete} width="30" centered style={{cursor:"pointer"}} onClick={()=>onDelete(assignment._id)} /></label>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <Modal open={openAssign} change={setOpenAssign} title={"Assign With"}>
                                            <Container style={{ margin: "auto", width: "90%" }}>
                                                <Form onSubmit={()=>onAssign(selectedAssignment)}>

                                                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Student</label><br/>
                                                <Dropdown fluid selection multiple options={studentOptions} scrolling search placeholder="Select Class" onChange={(event, data) => { setStudent(data.value); }} /><br/>
                                                
                                                {/* <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Class</label><br/>
                                                <Dropdown fluid selection options={classOptions} scrolling search placeholder="Select Class" onChange={(event, data) => { setAssignGrade(data.value); }} /><br/>
                                                
                                                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Sub-Class</label><br/>
                                                <Dropdown fluid selection options={dummyOptions} scrolling search placeholder="Select Class" onChange={(event, data) => { setGrade(data.value); }} /><br/>
                                                 */}
                                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                                    <div style={{width:"49%"}}>
                                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Date</label><br/>
                                                        <DateInput name="date" placeholder="Date" value={deadline.date} iconPosition="left" onChange={(event, data) => { setDeadline({...deadline,date:data.value}); }}/>
                                                    </div>
                                                    <div style={{width:"49%"}}>
                                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Time</label><br/>
                                                        <TimeInput name="time" placeholder="Time" value={deadline.time} iconPosition="left" onChange={(event, data) => { setDeadline({...deadline,time:data.value}); }} />
                                                    </div>
                                                </div>

                                                <FormButton text="Assign" />
                                                </Form>
                                            </Container>
                                        </Modal>                                    
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

export default Assignments;