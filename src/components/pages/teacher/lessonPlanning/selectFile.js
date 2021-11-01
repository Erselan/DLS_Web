import React, { Fragment,useEffect,useState } from 'react';
import Viewer from "./Viewer"
import Close from "../../../../assets/images/icons/closeTransparent.png"
import AssignmentIcon from "../../../../assets/images/icons/lesson_icon1.png"
import Clock from "../../../../assets/images/icons/Clock.png"
import Edit from "../../../../assets/images/icons/edit.png"
import Share from "../../../../assets/images/icons/share.png"
import Modal from "../../../layouts/modal"
import { Container, Dropdown, Form, Grid, Header, Image, Input, TextArea,} from 'semantic-ui-react';
import UploadIcon from "../../../../assets/images/icons/upload.png"
import UploadedIcon from "../../../../assets/images/icons/file.png"
import CloseRed from "../../../../assets/images/icons/closeRed.png"
import Left from "../../../../assets/images/icons/leftIcon.png"
import Right from "../../../../assets/images/icons/rightIcon.png"
import PdfIcon from "../../../../assets/images/icons/types/pdf.png"
import AddNotes from "../../../../assets/images/icons/addNotes.png";
import color from '../../../color';
import { FormButton } from '../../../shared';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router';
import { apiCall } from '../../../../main/axios';
import { UploadFile } from '../../../../utils/utils';
import { defineLocale } from 'moment';

const SelectFile = () => {
    const [flag,setFlag]=useState("page");
    const location = useLocation();
    const history = useHistory();
    const [addons,setAddons] = useState([]);
    const [resource,setResource] = useState();
    const [assigments,setAssignment] = useState([]);
    const [notes,setNote] = useState([]);

    const onAddonsChange = (data) =>{
        setAddons([...addons,data]);
        console.log(addons);
    }

    const onResourceChanged = (data) =>{
        setResource(data)
    }

    const onAssigmentChange = (data) =>{
        setAssignment([...assigments,data]);
    }
    const onNoteChange = (data) =>{
        setNote([...notes,data]);
    }

    const onSave = (data) =>{
        // console.log(location.schedule)
        history.push({
            pathname:'/teacher/lessonPlanning/summary',
            schedule:location.schedule,
            resource:resource,
            addons:addons,
            assigments:assigments,
            source:location.source
          });
        // console.log(location.scheduleId)
        // console.log(resource)
        // console.log(addons)
        
    }

    return ( 
        <div className="MyComponent">
        <Grid columns={2}>
            <Grid.Row>
                <div>
                    <button style={{ outline: "none", border: "none", fontSize: "1rem", color: "white", backgroundColor: color.MAIN, borderRadius: "8px", padding: "8px 10px", marginLeft: "20px",opacity:resource?"0.5":"1" }} onClick={()=>resource?"":setFlag("page")}>Add pages</button>
                    <button style={{ outline: "none", border: "none", fontSize: "1rem", color: "white", backgroundColor: color.MAIN, borderRadius: "8px", padding: "8px 10px", marginLeft: "10px",opacity:resource?"1":"0.5"}} onClick={()=>resource?setFlag("addon"):""}>Add addons</button>
                    <button style={{ outline: "none", border: "none", fontSize: "1rem", color: "white", backgroundColor: color.MAIN, borderRadius: "8px", padding: "8px 10px", marginLeft: "10px"}} onClick={()=>setFlag("assignment")}>Add assignment</button>
                    <button style={{ outline: "none", border: "none", fontSize: "1rem", color: "white", backgroundColor: color.MAIN, borderRadius: "8px", padding: "8px 10px", marginLeft: "10px" }} onClick={()=>onSave()}>Save</button>
                </div>                
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={flag===""?16:8}>
                    <Viewer caller={true} onSave={onResourceChanged} />
                    <div style={{position:"fixed",bottom: "1rem",right: "1rem",cursor:"pointer"}}><img src={AddNotes} width={60} alt="img" onClick={()=>setFlag("note")} /></div>
                </Grid.Column>
                {flag===""?null:
                <div style={{position:"absolute",top:-190,right:-40,overflow:"scroll",height:"93vh",width:"25vw",background:"white",borderTopLeftRadius:"16px",borderBottomLeftRadius:"16px",boxShadow:"rgba(181, 181, 181, 0.42)" }}>
                        <Image src={Close} width={20} style={{margin:"10px 0px 0px 10px",cursor:"pointer"}} onClick={()=>setFlag("")}></Image>
                        { flag==="page"?
                            <Fragment>
                                <label style={{fontSize: "13px",lineHeight: "20px",color:color.MAIN,display:"flex",justifyContent:"center"}}>Drag and drop pages to add</label>
                                <div style={{padding:"20px",marginTop:"2rem"}}>
                                    <Viewer docToLoad={location.link}/>
                                </div>
                            </Fragment>
                            :null
                        }
                        { flag==="addon"?
                            <Fragment>
                                <Addon onAddonsChange={onAddonsChange}/>
                            </Fragment>
                            :null
                        }
                        { flag==="assignment"?
                            <div style={{padding:"1rem 2rem"}}>
                                <label style={{fontSize: "17px",lineHeight: "26px",fontWeight:"bold",color:color.TEXT_PRIMARY}}>Add Assignment</label><br/>
                                <CreateAssignment onAssigmentChange={onAssigmentChange} />
                                <ViewAssignment data={assigments} />
                            </div>
                            :null
                        }
                        { flag==="note"?
                            <div style={{padding:"1rem 2rem"}}>
                                <label style={{fontSize: "17px",lineHeight: "26px",fontWeight:"bold",color:color.TEXT_PRIMARY}}>Notes</label><br/>
                                <CreateNote onNoteChange={onNoteChange} />
                                { notes.length === 0 ? 
                                    <div style={{display:"flex",justifyContent:"center",marginTop:"1rem"}}>
                                        <label style={{fontSize: "17px",lineHeight: "26px",fontWeight:"bold",color:color.TEXT_PRIMARY}}>No Notes yet</label>
                                    </div> 
                                    :
                                    <div>
                                    {
                                        notes.map((item,index)=>{
                                            return( 
                                                <div key={index} style={{width:"100%",display:"flex",flexDirection:"column",marginTop:"1rem",padding:"1rem 2rem",borderRadius:"20px",boxShadow: " 2px 5px 10px 5px rgba(0, 0, 0, 0.09)"}}>
                                                    <div style={{display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
                                                        <label style={{fontSize: "13px",lineHeight: "19px",fontWeight:"bold",color:color.TEXT_PRIMARY}}>{item.title}</label>
                                                        <label style={{fontSize: "12px",lineHeight: "14px" ,fontWeight:"lighter",color:color.TEXT_PRIMARY}}>{item.description}</label>
                                                    </div>
                                                </div>
                                            )})
                                    }
                                    </div>
                                    }
                            </div>
                            :null
                        }
                        
                </div>
                }
            </Grid.Row>
        </Grid>
      </div>
    );
}

const  ViewAssignment = ({data}) => {
    
    let assignments = data;

    return (
        <Fragment>
        { data.length === 0 ? 
        <div style={{display:"flex",justifyContent:"center",marginTop:"1rem"}}>
            <label style={{fontSize: "17px",lineHeight: "26px",fontWeight:"bold",color:color.TEXT_PRIMARY}}>No Assignment yet</label>
        </div> 
        :
        <div>
        {
            assignments.map((item,index)=>{
                return( 
                    <div key={index} style={{width:"100%",display:"flex",flexDirection:"column",marginTop:"1rem",padding:"2rem",borderRadius:"20px",boxShadow: " 2px 5px 10px 5px rgba(0, 0, 0, 0.09)"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <label style={{fontSize: "11px",lineHeight: "17px" ,color:color.TEXT_SECONDARY}}>19.02.2021</label>
                            <label style={{fontSize: "11px",lineHeight: "17px" ,color:color.TEXT_SECONDARY}}>10.30</label>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div><Image src={AssignmentIcon} width={50}/></div>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label style={{fontSize: "17px",lineHeight: "20px" ,color:color.TEXT_PRIMARY}}>{item.title}</label>
                                <label style={{fontSize: "13px",lineHeight: "20px" ,color:color.TEXT_PRIMARY}}>Grade 5</label>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",margin:"1rem 0rem"}}>
                            <label style={{fontSize: "11px",lineHeight: "17px" ,color:color.TEXT_SECONDARY}}>Biology</label>
                            <label style={{fontSize: "13px",lineHeight: "20px" ,color:color.TEXT_PRIMARY}}>Sub topic</label>
                            <label style={{fontSize: "12px",lineHeight: "14px", fontWeight:"normal" ,color:color.TEXT_SECONDARY}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </label>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{width:"50%",display:"flex"}}>
                                <div><Image src={Clock} width={20}/></div>
                                <div style={{display:"flex",flexDirection:"column",marginLeft:"1rem"}}>
                                    <label style={{fontSize: "13px",lineHeight: "20px" ,color:color.TEXT_PRIMARY}}>21.02.2021</label>
                                    <label style={{fontSize: "11px",lineHeight: "5px" ,color:color.TEXT_PRIMARY}}>11:30</label>
                                </div>
                            </div>
                            <div style={{width:"50%",display:"flex",justifyContent:"flex-end"}}>
                                <div><Image src={Edit} width={30}/></div>
                                <div style={{marginLeft:"1rem"}}><Image src={Share} width={30}/></div>
                            </div>
                        </div>
                    </div>
                )})
        }
        </div>
        }
        </Fragment>
     );
}
 
const CreateAssignment = (props) => {
    const [title, setTitle] = useState("");
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");
    const [subTopic, setSubTopic] = useState("");
    const [description, setDescription] = useState("");
    const [guideline, setGuideline] = useState("");
    const [filedata, setFiledata] = useState(null);
    const [open, setOpen] = useState(false);
    const [deadline,setDeadline] = useState({date:"",time:""});
    // const [openAssign, setOpenAssign] = useState(false);

    const onFileChange = (event) => {
        if (event.target.files.length !== 0 && event.target.files[0].type === "application/pdf") {
          setFiledata(event.target.files[0]);
        } else {
          toast.error("Please select a pdf file !")
        }
    };

    const clearState = () => {
        setTitle("");
        setGrade("");
        setSubject("");
        setSubTopic("");
        setDescription("");
        setGuideline("");
        setFiledata(null);
        setDeadline({date:"",time:""});
    }

    const onSubmit = () => {
        setOpen(false);
        // console.log(grade,subject,subTopic,deadline);
        props.onAssigmentChange({title:title,grade:grade,subject:subject,subTopic:subTopic,description:description,deadline:deadline});
        clearState();
        // let officialBook;
        // if (filedata){
        //   setOpen(false);
        //   UploadFile(filedata).then((data) => {
        //     toast.success("File uploaded successfully!")
        //     // console.log(data)
        //     officialBook = {filename:filedata.name,location:data}
        //   })
        //   apiCall("post", "/classCourse/insertCourseAssigning", { class: classname, course: course, officialBook:officialBook, teacherBook:officialBook}).then((res) => {
        //     dispatcher({ type: ADMIN_ACTIONS.ADD_COURSE_ASSIGNINGS, payload: res.result });
        //   }).catch((err) => {
        //     console.log(err);
        //   });
        // }
        // else {
        //   toast.error("Please select books!")
        // }
    };

    return ( 
        <Fragment>
            <label style={{fontSize: "13px",lineHeight: "20px" ,color:color.MAIN}} onClick={()=>setOpen(true)}>Create Assignment</label>
            <Modal open={open} change={setOpen} title={"Create Assignment"}>
                            <Container style={{ margin: "auto", width: "90%" }}>
                                <Form onSubmit={onSubmit}>
                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Assignment title</label><br/>
                                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Please give your assignment a title" value={title} onChange={(event, data) => setTitle(data.value)} /><br/>
                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                    Choose grade
                                </label>
                                <br></br>
                                <Dropdown fluid selection options={[]} scrolling search placeholder="Select Class" onChange={(event, data) => { setGrade(data.value); }} />
                                <br></br>

                                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                    <div style={{width:"49%"}}>
                                        <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                            Choose Subject
                                        </label>
                                        <br></br>
                                        <Dropdown fluid selection options={[]} scrolling search placeholder="Select Subject" onChange={(event, data) => { setSubject(data.value); }} />
                                        <br></br>
                                    </div>
                                    <div style={{width:"49%"}}>
                                        <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                            Choose Sub-Topic
                                        </label>
                                        <br></br>
                                        <Dropdown fluid selection options={[]} scrolling search placeholder="Select Sub-Topic" onChange={(event, data) => { setSubTopic(data.value); }} />
                                    </div>
                                </div>
                                
                                <br></br>

                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                    Description of the goals of assignment
                                </label>
                                <br></br>
                                <TextArea placeholder='Optional' value={description} onChange={(event, data) => setDescription(data.value)}/>
                                <br></br>

                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                    Guideline for the Assignment
                                </label>
                                <br></br>
                                <TextArea placeholder='Guideline...' value={guideline} onChange={(event, data) => setGuideline(data.value)} />
                                <br></br>

                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                    Estimated Time
                                </label>
                                <br></br>
                                <Dropdown fluid selection options={[]} scrolling search placeholder="Select Class" onChange={(event, data) => { setDeadline(data.value); }} />
                                <br></br>

                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                                    Official Book
                                </label>
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
                                        <Header as='h3' style={{marginBottom:"1px",color: color.TEXT_PRIMARY}}>{filedata.name}</Header>
                                        <Header as='h4' style={{marginTop:"0",color: color.MAIN}}>{filedata.size/1000} KB</Header>
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

const Addon = (props) => {
    const [pageNumber, setPageNumber] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [studentNote, setStudentNote] = useState("");
    const [filedata, setFiledata] = useState(null);
    const [filetype, setFileType] = useState("");
    const [flag,setFlag] = useState(null);
    const [flagType,setFlagType] = useState("document");
    const [files,setFiles] = useState([]);
    const [result,setResult] = useState({hasNextPage:false,hasPrevPage:false,currentPage:"",totalPages:""});
    // const files = useSelector(state => state.teacher.resources);

    useEffect(()=>{
        apiCall("get", "/resource/getResources/1?type=document").then((res) => {
            setFiles(res.result.docs)
            setResult({hasNextPage:res.result.hasNextPage,hasPrevPage:res.result.hasPrevPage,currentPage:res.result.page,totalPages:res.result.totalPages})
          }).catch((err) => {
            console.log(err);
          });           
    },[])

    const onPageChange = (caller) => {
        if (caller === "next"){
            let page=result.currentPage + 1;
            apiCall("get", "/resource/getResources/"+page+"?type="+flagType).then((res) => {
                setFiles(res.result.docs)
                setResult({hasNextPage:res.result.hasNextPage,hasPrevPage:res.result.hasPrevPage,currentPage:res.result.page,totalPages:res.result.totalPages})
              }).catch((err) => {
                console.log(err);
              }); 
        }else {
            let page=result.currentPage - 1;
            apiCall("get", "/resource/getResources/"+page+"?type="+flagType).then((res) => {
                setFiles(res.result.docs)
                setResult({hasNextPage:res.result.hasNextPage,hasPrevPage:res.result.hasPrevPage,currentPage:res.result.page,totalPages:res.result.totalPages})
              }).catch((err) => {
                console.log(err);
              }); 
        }
    }

    const onFilterChange = (caller) => {
        setFlagType(caller);
        apiCall("get", "/resource/getResources/1?type="+caller).then((res) => {
            setFiles(res.result.docs)
            setResult({hasNextPage:res.result.hasNextPage,hasPrevPage:res.result.hasPrevPage,currentPage:res.result.page,totalPages:res.result.totalPages})
          }).catch((err) => {
            console.log(err);
          });
    } 

    const onFileChange = (event) => {
        if (event.target.files.length !== 0 ) {
            console.log(event.target.files[0].type)
            switch(event.target.files[0].type){
                case "application/pdf":
                    setFileType("document")
                    break;
                case "video/mp4" || "video/mov" || "video/wmv" || "video/mpg" || "video/mpeg":
                    setFileType("video")
                    break;
                case "audio/mp3" || "audio/wav" || "audio/m4a" || "audio/wma":
                    setFileType("audio")
                    break;
                case "image/png" || "image/jpg" || "image/jpeg" || "image/wma":
                    setFileType("image")
                    break;
                default:
                    break;
            }
            setFlag("uploaded")
            setFiledata(event.target.files[0]);
        } else {
          console.log("Please select a file !")
        }
      };

    const onFileSelect = (item) =>{
        setFlag("selected")
        setFiledata(item)
    }  
    
    const Sumbit = () => {

        setFlag(null)
        if (flag === "uploaded"){
            UploadFile(filedata).then((data) => {
                toast.success("File uploaded successfully!")
                // console.log(data)
                setFiledata({name:filedata.name,file:data});
              })     
        }
        toast.success("Addons Successfully!")
        props.onAddonsChange({page:pageNumber,title:title,description:description,note:studentNote,file:filedata.file})
        // apiCall("post", "/classCourse/insertCourseAssigning", { class: classname, course: course, officialBook:officialBook, teacherBook:officialBook}).then((res) => {
        //     dispatcher({ type: ADMIN_ACTIONS.ADD_COURSE_ASSIGNINGS, payload: res.result });
        //   }).catch((err) => {
        //     console.log(err);
        // });  
    }

    return ( 
        <Fragment>
            <label style={{fontSize: "22px",lineHeight: "33px",display:"flex",marginLeft:"3rem",color:color.TEXT_PRIMARY}}>Addons</label>
            {
                flag === null?
            <Fragment>
                <div style={{display:"flex",justifyContent:"space-between",margin:"0rem 3rem"}}>
                    <label style={{fontSize: "13px",lineHeight: "20px",display:"flex",justifyContent:"center", cursor:"pointer",color: flagType === "document" ? color.TEXT_PRIMARY : color.TEXT_PRIMARY_LIGHT}} onClick={()=>onFilterChange("document")}>Documents</label>
                    <label style={{fontSize: "13px",lineHeight: "20px",display:"flex",justifyContent:"center", cursor:"pointer",color: flagType == "image" ? color.TEXT_PRIMARY : color.TEXT_PRIMARY_LIGHT}} onClick={()=>onFilterChange("image")}>Images</label>
                    <label style={{fontSize: "13px",lineHeight: "20px",display:"flex",justifyContent:"center", cursor:"pointer",color: flagType == "video" ? color.TEXT_PRIMARY : color.TEXT_PRIMARY_LIGHT}} onClick={()=>onFilterChange("video")}>Videos</label>
                    <label style={{fontSize: "13px",lineHeight: "20px",display:"flex",justifyContent:"center",cursor:"pointer",color: flagType == "audio" ? color.TEXT_PRIMARY : color.TEXT_PRIMARY_LIGHT}} onClick={()=>onFilterChange("audio")}>Sounds</label>
                </div>
                {
                    files.length ===0? null:
                    <Fragment>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",width:"100%"}}>
                        {
                                    files.map((item,index)=>{
                                        return (
                                            <div key={index} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginLeft:"1rem"}}>
                                                <div style={{width:"60px",height:"60px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:color.FOREGROUND}}>
                                                    <Image src={PdfIcon} width={25} onClick={()=>onFileSelect(item)}/>
                                                </div>
                                                <label style={{fontSize: "11px",lineHeight: "17px",fontWeight:"bold",color:color.TEXT_PRIMARY}}>{item.name}</label>
                                            </div>
                                        )
                                    })
                        }
                        </div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1rem"}}>
                            <div style={{opacity:result.hasPrevPage?"1":"0.5"}}><img src={Left} width={10} alt="prev" onClick={result.hasPrevPage?()=>onPageChange("previous"):null}/></div>
                            <label style={{fontSize: "16px",lineHeight: "17px",color:color.MAIN,margin:"0rem 1rem"}}>{result.currentPage} / {result.totalPages}</label>
                            <div style={{opacity:result.hasNextPage?"1":"0.5"}}><img src={Right} width={10} alt="next" onClick={result.hasNextPage?()=>onPageChange("next"):null}/></div>
                        </div>
                        <label style={{fontSize: "13px",lineHeight: "20px",display:"flex",justifyContent:"center"}}>OR</label>
                    </Fragment>
                }
            </Fragment>
            :null
            }
                <Form onSubmit={()=>Sumbit()}>
                                        <input type='file' id="officialBook" name='officialBook' accept=".mov, .wmv, .mpg, .mpeg, .mp4, .mp3, .wav, m4a, .wma, .jpg, jpeg, .png, .pdf," onChange={onFileChange} style={{ display: "none" }} />
                                        {
                                            flag === null ?
                                            <label htmlFor="officialBook" style={{marginLeft: "15%"}}><Image src={UploadIcon} width={250} /></label>
                                            :
                                            <Container style={{padding:"0rem 2rem"}}>
                                                <Image src={CloseRed} width={25} style={{ marginLeft: "99%" }} onClick={() => setFlag(null)} />
                                                <Grid style={{ border: "1px solid #5E81F4", boxSizing: "border-box", borderRadius: "14px" }}>
                                                <Grid.Column width={3} verticalAlign="middle">
                                                    <Image src={UploadedIcon} />
                                                </Grid.Column>
                                                <Grid.Column width={13} verticalAlign="middle" >
                                                {
                                                    flag === "uploaded"?
                                                    <Header as='h3' style={{ marginBottom: "1px", color: color.TEXT_PRIMARY }}>{filedata.name}</Header>
                                                    :
                                                    <Header as='h3' style={{ marginBottom: "1px", color: color.TEXT_PRIMARY }}>{filedata.name}.{filedata.type}</Header>
                                                }
                                                </Grid.Column>
                                                </Grid>
                                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px",marginTop:"20px" }}>Page Number</label><br/>
                                                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Page to add addons on" value={pageNumber} onChange={(event, data) => setPageNumber(data.value)} /><br/>
                                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", margin: "10px 0px", }}>Addon Title</label><br/>
                                                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Molecules explanation" value={title} onChange={(event, data) => setTitle(data.value)} /><br/>
                                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", margin: "10px 0px", }}>Addon Description</label><br/>
                                                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="This video about the molecule structure" value={description} onChange={(event, data) => setDescription(data.value)} /><br/>
                                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", margin: "10px 0px", }}>Student Note</label><br/>
                                                <TextArea placeholder='Guideline...' value={studentNote} onChange={(event, data) => setStudentNote(data.value)} />
                                                <FormButton align="center" />
                                            </Container>
                                        }
                                        
                </Form>
        </Fragment>
     );
}

const CreateNote  = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open,setOpen] = useState(false);


    const clearState = () => {
        setTitle("");
        setDescription("");
    }

    const onSubmit = () => {
        setOpen(false);
        props.onNoteChange({title:title,description:description})
        clearState();
    };

    return ( 
        <Fragment>
            <label style={{fontSize: "13px",lineHeight: "20px" ,color:color.MAIN}} onClick={()=>setOpen(true)}>Add new note</label>
            <Modal open={open} change={setOpen} title={"Add note"}>
                            <Container style={{ margin: "auto", width: "90%" }}>
                                <Form onSubmit={onSubmit}>
                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Title</label><br/>
                                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Please give your note a title" value={title} onChange={(event, data) => setTitle(data.value)} /><br/>
                                
                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }} >
                                    Note
                                </label>
                                <br></br>
                                <TextArea placeholder="..." value={description} onChange={(event, data) => setDescription(data.value)}/>
                                <br></br>

                                <FormButton />
                                </Form>
                            </Container>
                            </Modal>
        </Fragment>
     );
}

export default SelectFile;