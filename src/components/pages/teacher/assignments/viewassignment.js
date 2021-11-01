import React, { useEffect, useState } from 'react';
import { Container, Grid, Header, Icon, Image, Label, Input, Dropdown,TextArea, Form } from 'semantic-ui-react';
import COLORS from "../../../color"
import Modal from "../../../layouts/modal";
import UploadIcon from "./../../../../assets/images/icons/upload.png"
import UploadedIcon from "./../../../../assets/images/icons/file.png"
import Close from "./../../../../assets/images/icons/closeRed.png"
import { toast } from "react-toastify";
import { FormButton } from "../../../shared";
// import PdfPage from "../../../../assets/images/icons/page.png"
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UploadFile } from "../../../../utils/utils";
import { apiCall } from "../../../../main/axios";
import { TEACHER_ACTIONS } from "../../../../main/store/actions";
import { TimeInput } from 'semantic-ui-calendar-react';

const ViewAssignment = () => {
    const dispatcher = useDispatch();
    const location = useLocation();
    const [assignment,setAssignment] = useState(location.assignment);

    const courses = useSelector(state => state.teacher.courses);
    const classes = useSelector(state => state.teacher.classes);
    const [classOptions, setClassOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);

    const [title, setTitle] = useState(assignment.title);
    const [grade, setGrade] = useState(assignment.class._id);
    const [subject, setSubject] = useState(assignment.course._id);
    const [subTopic, setSubTopic] = useState(assignment.subtopic);
    const [description, setDescription] = useState(assignment.description);
    const [guideline, setGuideline] = useState(assignment.guidelines);
    const [estimatedTime, setEstimatedTime] = useState(assignment.estimatedTime);
    const [filedata, setFiledata] = useState({filename:assignment.file.filename,location:assignment.file.location});
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

    const onFileChange = (event) => {
        if (event.target.files.length !== 0 && event.target.files[0].type === "application/pdf"){
          setFiledata(event.target.files[0]);
        }else{
          toast.error("Please select a pdf file !")
        }
      };
      
      const onSubmit = async() => {
        let file;
        if (filedata){
          setOpen(false);
          if(filedata.location){
            file=filedata;
          }
         else{
          await UploadFile(filedata).then((data)=>{
            toast.success("File uploaded successfully!")
            file= {filename:filedata.name,location:data};
          })
        }
          apiCall("put", "/assignment/updateAssignment", {id:assignment._id,title:title,class:grade,course:subject,subtopic:subTopic,description:description,guidelines:guideline,estimatedTime:estimatedTime,file:file}).then((data) => {
            setAssignment(data.result);
            console.log(data.result)
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
        else{
          toast.error("Please select books !")
        }
      };


    return ( 
            <Grid>
                <Grid.Row style={{paddingBottom:"0px"}}>
                    <Link to="/teacher/assigments">
                        <Label style={{backgroundColor:COLORS.BACKGROUND,color:COLORS.MAIN,pointer:"cursor"}}><Icon name='chevron left' />Back</Label><br/>
                    </Link>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8} style={{paddingLeft:"2em",marginBottom:"4rem"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <Header as="h2" style={HeadingStyle}>{assignment.title}</Header>
                            {location.caller?null:<button style={ButtonStyle} onClick={() => { setOpen(true); }}>Edit</button>}
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
                                    <Dropdown fluid selection  options={classOptions} search placeholder={assignment.class.name + " (" + assignment.class.section + ")"} onChange={(event, data) => { setGrade(data.value); }} />
                                    <br></br>

                                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                        <div style={{width:"49%"}}>
                                            <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                                Choose Subject
                                            </label>
                                            <br></br>
                                            <Dropdown fluid selection  options={courseOptions} search placeholder={assignment.course.name} onChange={(event, data) => { setSubject(data.value); }} />
                                            <br></br>
                                        </div>
                                        <div style={{width:"49%"}}>
                                            <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                                Choose Sub-Topic
                                            </label>
                                            <br></br>
                                            <Input style={{ width: "100%" }} placeholder="Enter Sub-Topic" value={assignment.subtopic} onChange={(event, data) => setSubTopic(data.value)} />
                                        </div>
                                    </div>
                                    
                                    <br></br>

                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                        Description of the goals of assignment
                                    </label>
                                    <br></br>
                                    <TextArea placeholder='Optional' value={description} onChange={(event, data) => setDescription(data.value)}/>
                                    <br></br>

                                    <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
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
                                            <Header as='h3' style={{marginBottom:"1px",color: COLORS.TEXT_PRIMARY}}>{filedata.filename}</Header>
                                            {/* <Header as='h4' style={{marginTop:"0",color: COLORS.MAIN}}>{filedata.size/1000} KB</Header> */}
                                        </Grid.Column>
                                    </Grid>
                                    </Container>
                                    }
                                    <br></br>
                                    <FormButton />
                                    </Form>
                                </Container>
                                </Modal>
                        </div>
                        {/* <p style={{...HeadingStyle,color:COLORS.TEXT_SECONDARY,fontSize:"15px"}}>Goals description lorem ipsum dolor sit amet, consectetur adipiscing elit.  </p> */}
                        
                        <Header as="h3" style={HeadingStyle}>Grade</Header>
                        <Header as="h6" style={HeadingStyle}>{assignment.class.name+assignment.class.section}</Header>

                        <Header as="h3" style={HeadingStyle}>Sub-topic</Header>
                        <Header as="h6" style={HeadingStyle}>{assignment.subtopic}</Header>

                        <Header as="h3" style={HeadingStyle}>Description of the goals of assignment</Header>
                        <Header as="h6" style={HeadingStyle}>{assignment.description}</Header>
                        
                        <Header as="h3" style={HeadingStyle}>Guideline for the Assignment</Header>
                        <Header as="h6" style={HeadingStyle}>{assignment.guidelines}</Header>

                        <Header as="h3" style={HeadingStyle}>Estimated time</Header>
                        <Header as="h6" style={HeadingStyle}>{assignment.estimatedTime}</Header>

                        {/* <Header as="h3" style={HeadingStyle}>Deadline</Header>
                        <Header as="h6" style={HeadingStyle}>Date</Header> */}
                    </Grid.Column>
                    <Grid.Column width={8}><iframe width="100%" height="100%" title="Pdf Viewer" src={assignment.file.location} ></iframe></Grid.Column>
                </Grid.Row>
            </Grid>
     );
}


const HeadingStyle = {
    fontFamily: "Poppins",
    margin:"0.5em 0em",
    color:"COLORS.TEXT_PRIMARY"
}

const ButtonStyle = {
    color: COLORS.FOREGROUND,
    backgroundColor: COLORS.MAIN,
    borderRadius: "7px",
    fontSize: "0.8rem",
    border: "none",
    fontWeight: "bolder",
    padding: "8px 35px",
    outline: "none"
}

export default ViewAssignment;