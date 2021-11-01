import React, { Fragment, useEffect, useState, } from "react";
import { Container, Dropdown, Form, Grid, Header, Icon, Image, Input, TextArea } from "semantic-ui-react";
import { TimeInput } from 'semantic-ui-calendar-react';
import COLORS from "./../../../color";
import Modal from "../../../layouts/modal";
import UploadIcon from "./../../../../assets/images/icons/upload.png"
import UploadedIcon from "./../../../../assets/images/icons/file.png"
import Close from "./../../../../assets/images/icons/closeRed.png"
import { toast } from "react-toastify";
import { UploadFile } from "../../../../utils/utils";
import { useHistory } from "react-router-dom";
import { apiCall } from "../../../../main/axios";
import { FormButton } from "../../../shared";
import { useDispatch, useSelector } from "react-redux";
import { TEACHER_ACTIONS } from "../../../../main/store/actions";

const NewAssignment = () => {
    const dispatcher = useDispatch();
    const history = useHistory()

    const courses = useSelector(state => state.teacher.courses);
    const classes = useSelector(state => state.teacher.classes);

    const [classOptions, setClassOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);

    const [title, setTitle] = useState("");
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");
    const [subTopic, setSubTopic] = useState("");
    const [description, setDescription] = useState("");
    const [guideline, setGuideline] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [filedata, setFiledata] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        createOptions(classes, courses);
    }, [classes, courses]);

    const createOptions = (classes, courses) => {
        let myclassOptions = [];
        let mycourseOptions = [];
    
        if(classes){
            classes.map((item) => {
            return myclassOptions.push({ key: item._id, text: item.name + " (" + item.section + ")", value: item._id, });
            });
        }

        if(courses){
            courses.map((item) => {
            return mycourseOptions.push({ key: item._id, text: item.name, value: item._id, });
            });
        }
    
        setClassOptions(myclassOptions)
        setCourseOptions(mycourseOptions)
      };


    const clearAddForm = () => {
        setTitle("");
        setGrade("");
        setSubject("");
        setSubTopic(""); 
        setDescription(""); 
        setGuideline(""); 
        setEstimatedTime(""); 
        setFiledata(null); 
    };

    const onFileChange = (event) => {
        if (event.target.files.length !== 0 && event.target.files[0].type === "application/pdf"){
          setFiledata(event.target.files[0]);
        }else{
          toast.error("Please select a pdf file !")
        }
      };
      
      const onSubmit = async() => {
        let file;
        let teacher = localStorage.getItem("teacherId");
        if (filedata){
          setOpen(false);
          history.push("/teacher/assigments")
          await UploadFile(filedata).then((data)=>{
            toast.success("File uploaded successfully!")
            file= {filename:filedata.name,location:data};
          })
          apiCall("post", "/assignment/insertAssignment", { title:title,class:grade,course:subject,subtopic:subTopic,description:description,guidelines:guideline,estimatedTime:estimatedTime,file:file,teacher:teacher}).then((data) => {
            apiCall("get", "/assignment/getAssignments").then((res) => {
                dispatcher({ type: TEACHER_ACTIONS.REPLACE_ASSIGNMENTS, payload: res.result });
                clearAddForm();
              }).catch((err) => {
                console.log(err);
              });
          }).catch((err) => {
            toast.error("An Error Occured!")
            console.log(err);
          });
        }
        else{
          toast.error("Please select books !")
        }
      };

    return (
            <Fragment>
                            <button style={{ ...ButtonStyle, color: COLORS.FOREGROUND, backgroundColor: COLORS.MAIN }} onClick={() => { setOpen(true); }}>New Assignment</button>
                            <Modal open={open} change={setOpen} title={"Upload and Create Assignment"}>
                            <Container style={{ margin: "auto", width: "90%" }}>
                                <Form onSubmit={onSubmit}>
                                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>
                                    Assignment title
                                </label>
                                <br></br>
                                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Please give your assignment a title" value={title} onChange={(event, data) => setTitle(data.value)} ></Input>
                                <br></br>
                                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                    Choose grade
                                </label>
                                <br></br>
                                <Dropdown fluid selection options={classOptions} scrolling search placeholder="Select Class" onChange={(event, data) => { setGrade(data.value); }} />
                                <br></br>

                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                    <div style={{width:"49%"}}>
                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                            Choose Subject
                                        </label>
                                        <br></br>
                                        <Dropdown fluid selection options={courseOptions} scrolling search placeholder="Select Subject" onChange={(event, data) => { setSubject(data.value); }} />
                                        <br></br>
                                    </div>
                                    <div style={{width:"49%"}}>
                                        <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>
                                            Choose Sub-Topic
                                        </label>
                                        <br></br>
                                        <Input style={{ width: "100%" }} placeholder="Enter Sub-Topic" value={subTopic} onChange={(event, data) => setSubTopic(data.value)} />
                                        {/* <Dropdown fluid selection options={dummyOptions} scrolling search placeholder="Select Sub-Topic" onChange={(event, data) => { setSubTopic(data.value); }} /> */}
                                    </div>
                                </div>
                                
                                <br></br>

                                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>
                                    Description of the goals of assignment
                                </label>
                                <br></br>
                                <TextArea placeholder='Optional' value={description} onChange={(event, data) => setDescription(data.value)}/>
                                <br></br>

                                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>
                                    Guideline for the Assignment
                                </label>
                                <br></br>
                                <TextArea placeholder='Guideline...' value={guideline} onChange={(event, data) => setGuideline(data.value)} />
                                <br></br>

                                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>
                                    Estimated time
                                </label>
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                    <div style={{width:"49%"}}>
                                    <TimeInput name="time" placeholder="Time" value={estimatedTime} iconPosition="left" onChange={(event, data) => { setEstimatedTime(data.value); }} />
                                        <br></br>
                                    </div>
                                </div>

                                <input type='file' id="officialBook" name='officialBook' accept="application/pdf" onChange={onFileChange} style={{display:"none"}}/>
                                {
                                    filedata === null?
                                <label htmlFor="officialBook"><Image src={UploadIcon}/></label>
                                :
                                <Container>
                                <Image src={Close} width={25} style={{marginLeft:"99%"}} onClick={()=>setFiledata(null)}/>
                                <Grid style={{border: "1px solid #5E81F4",boxSizing: "border-box",borderRadius: "14px"}}>
                                    <Grid.Column width={3} verticalAlign="middle">
                                        <Image src={UploadedIcon} />
                                    </Grid.Column>
                                    <Grid.Column width={13} verticalAlign="middle" >
                                        <Header as='h3' style={{marginBottom:"1px",color: COLORS.TEXT_PRIMARY}}>{filedata.name}</Header>
                                        <Header as='h4' style={{marginTop:"0",color: COLORS.MAIN}}>{filedata.size/1000} KB</Header>
                                    </Grid.Column>
                                </Grid>
                                </Container>
                                }
                                <br></br>
                                <FormButton />
                                </Form>
                            </Container>
                            </Modal>
        </Fragment>
     );
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

export default NewAssignment;