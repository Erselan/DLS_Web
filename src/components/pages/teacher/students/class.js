import React, { Fragment,useEffect, useState } from 'react';
import color from '../../../color';
import { Link, useHistory } from 'react-router-dom';
import Robot from "../../../../assets/images/icons/robotAvatar.png"
import Share from "../../../../assets/images/icons/share2.png"
import { Container, Icon, Image, Label , Form, Grid, Header,Input, TextArea} from 'semantic-ui-react';
import { FormButton } from '../../../shared';
import { toast } from 'react-toastify';
import { apiCall } from '../../../../main/axios';
import { UploadFile } from '../../../../utils/utils';
import UploadIcon from "../../../../assets/images/icons/upload.png"
import UploadedIcon from "../../../../assets/images/icons/file.png"
import CloseRed from "../../../../assets/images/icons/closeRed.png"
import Left from "../../../../assets/images/icons/leftIcon.png"
import Right from "../../../../assets/images/icons/rightIcon.png"
import PdfIcon from "../../../../assets/images/icons/types/pdf.png"

const Class = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <div>
                <Link to="/teacher/students">
                    <Label style={{backgroundColor:color.BACKGROUND,color:color.MAIN,pointer:"cursor"}}><Icon name='chevron left' />Back</Label><br/>
                </Link>
            </div>
            <div style={{width:"65%",display:"flex",justifyContent:"space-between"}}>
                 <label style={{fontSize:"34px",lineHeight:"51px",color:color.TEXT_PRIMARY}}>Class 1A</label>
                 <div>
                    <button style={ButtonStyle}>Share Resources</button>
                    <button style={ButtonStyle}>Assign Homework</button>
                 </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{width:"65%",display:"flex",flexDirection:"column"}}>
                    <div class="ui left icon input" style={{width:"100%",borderRadius:"8px",marginBottom:"1rem"}}><i aria-hidden="true" class="search icon" style={{color:color.MAIN,fontSize:"15px"}}></i><input type="text" placeholder="Search..." style={{fontSize:"15px",fontFamily:"poppins",borderRadius:"8px",borderColor:color.FOREGROUND}} /></div>
                    <div style={{width:"100%",display:"flex",flexWrap: "wrap",justifyContent:"space-between"}}>
                        {
                            [1,2,3,4,5].map((item,index)=>{
                                return(
                                    <div style={{width:"48%"}}>
                                        <StudentView />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{width:"30%",display:"flex"}}>
                    <div style={{marginTop:"-4rem",marginRight:"-2rem",paddingTop:"1rem",overflow:"scroll",height:"75vh",width:"25vw",background:"white",borderTopLeftRadius:"16px",borderBottomLeftRadius:"16px",boxShadow:"rgba(181, 181, 181, 0.42)" }}>
                        <Addon />
                    </div>
                </div>
            </div>
        </div> 
     );
}

const StudentView = () =>{
    const history = useHistory();
    return(
        <div style={{padding:"1rem",borderRadius:"10px",display:"flex",justifyContent:"space-between",marginBottom:"1rem",backgroundColor:color.FOREGROUND}} onClick={()=>history.push("/teacher/students/student")}> 
            <div style={{display:"flex",alignItems:"center"}}>
                <Image src={Robot} width={35} height={35} />
                <label style={{marginLeft:"1rem",fontSize:"16px",lineHeight:"18px",color:color.TEXT_PRIMARY}}>Name</label>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_SECONDARY}}>Student Id</label>
                <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_SECONDARY,marginLeft:"0.5rem",marginRight:"1rem"}}>213123</label>
                <Image src={Share} width={25}/>
            </div>
        </div>
    )
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
            <label style={{fontSize: "22px",lineHeight: "33px",display:"flex",marginLeft:"3rem",marginBottom:"1rem",color:color.TEXT_PRIMARY}}>Resources</label>
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

const ButtonStyle = {
    color: color.FOREGROUND, 
    backgroundColor: color.MAIN,
    borderRadius: "14px",
    fontSize: "0.8rem",
    border: "none",
    fontWeight: "bolder",
    padding: "12px 20px 12px 20px",
    outline: "none",
    marginLeft:"1rem"
}
 
export default Class;