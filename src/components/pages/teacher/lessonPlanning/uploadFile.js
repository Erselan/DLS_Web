import React, { useState } from 'react';
import { Container, Form, Grid, Header, Image, Modal } from 'semantic-ui-react';
import ResourceUpload from "../../../../assets/images/icons/resourceUpload.png"
import UploadIcon from "../../../../assets/images/icons/upload.png"
import UploadedIcon from "../../../../assets/images/icons/file.png"
import Close from "../../../../assets/images/icons/closeRed.png"
import PdfIcon from "../../../../assets/images/icons/types/pdf.png"
import color from '../../../color';
import { FormButton } from '../../../shared';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { UploadFile } from "../../../../utils/utils";
import { apiCall } from '../../../../main/axios';

const Upload = () => {
    const history= useHistory();
    const files = useSelector(state => state.teacher.resources);
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [filedata, setFiledata] = useState(null);
    const [filetype, setFileType] = useState("");
    const [open, setOpen] = useState(false);
    // const files = [{name:"world"},{name:"g"},{name:"hello"},{name:"world"}];
    const [filterFile,setFilterFile] = useState([]);

    const onFileChange = (event) => {
        // if (event.target.files.length !== 0 && event.target.files[0].type === "application/pdf") {
        if (event.target.files.length !== 0) {
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
            setFiledata(event.target.files[0]);
        } else {
          toast.error("Please select a file !")
        }
      };

    const onSearchChange = (event) => {
        setSearch(event.target.value)
        if (event.target.value !== ""){
            let f=files.filter(item=>{
                return item.name.includes(event.target.value);
            })
            setFilterFile(f)
        }else{
            setFilterFile([])
        }
        console.log(filterFile)
    }
     
      const onSelect = (file) => {
        history.push({
            pathname: '/teacher/lessonPlanning/content/select',
            link: file,
            schedule:location.schedule,
            source:location.source
        });
      }

      const onUpload = () => {
        setOpen(true);
        if (filedata){
            UploadFile(filedata).then((data) => {
              toast.success("File uploaded successfully!")
              // console.log(filename:filedata.name,location:data)
              apiCall("post", "/resource/insert", { name: filedata.name, type: filetype, file:data}).then((res) => {
                history.push({
                    pathname: '/teacher/lessonPlanning/content/select',
                    link: data,
                    schedule:location.schedule,
                    source:location.source
                });
              }).catch((err) => {
                console.log(err);
              });
              
            })
          }
       
    }

    return ( 
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div style={{display:"flex"}}>
                    <label style={{marginBottom:"1rem",fontSize:"17px",fontWeight:"bold",lineHeight:"25px",color:color.TEXT_PRIMARY}}>Search Documents</label>
                </div>
                <div class="ui left icon input" style={{height:"35px",width:"500px",borderRadius:"8px",marginBottom:"1rem"}}><i aria-hidden="true" class="search icon" style={{marginLeft:"15px",color:color.MAIN,fontSize:"15px"}}></i><input type="text" value={search} onChange={onSearchChange} placeholder="Search Pdf..." style={{marginLeft:"1rem",fontSize:"15px",fontFamily:"poppins",borderRadius:"8px",borderColor:color.FOREGROUND}} /><i aria-hidden="true" class="close icon" style={{marginLeft:"450px",color:color.MAIN,fontSize:"15px"}}></i></div>
                {
                    filterFile.length !==0 ?
                        <div style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
                        {
                            filterFile.map((item,index)=>{
                                return (
                                    <div key={index} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginLeft:"1rem"}}>
                                        <div style={{width:"80px",height:"80px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:color.FOREGROUND,cursor:"pointer"}} onClick={()=>onSelect(item.file)}>
                                            <Image src={PdfIcon} width={25} />
                                        </div>
                                        <label style={{fontSize: "11px",lineHeight: "17px",fontWeight:"bold",color:color.TEXT_PRIMARY}}>{item.name}</label>
                                    </div>
                                )
                            })
                        }
                        </div>
                    :null
                }
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
                <Image src={ResourceUpload} width={250} onClick={()=>setOpen(true)}></Image>
                <Modal centered open={open} change={setOpen} title={"Assign Course to Class"} style={{height:"300px",width:"500px",borderRadius: "20px",paddingTop:"2rem",marginTop:"10%",marginLeft:"37%"}}>
                    <Container>
                        <Form onSubmit={()=>onUpload()}>
                        <input type='file' id="officialBook" name='officialBook' accept=".mov, .wmv, .mpg, .mpeg, .mp4, .mp3, .wav, m4a, .wma, .jpg, jpeg, .png, .pdf" onChange={onFileChange} style={{ display: "none" }} />
                        {
                            filedata === null ?
                            <label htmlFor="officialBook" style={{marginLeft: "22%"}}><Image src={UploadIcon} width={250} /></label>
                            :
                            <Container>
                                <Image src={Close} width={25} style={{ marginLeft: "99%" }} onClick={() => setFiledata(null)} />
                                <Grid style={{ border: "1px solid #5E81F4", boxSizing: "border-box", borderRadius: "14px" }}>
                                <Grid.Column width={3} verticalAlign="middle">
                                    <Image src={UploadedIcon} />
                                </Grid.Column>
                                <Grid.Column width={13} verticalAlign="middle" >
                                    <Header as='h3' style={{ marginBottom: "1px", color: color.TEXT_PRIMARY }}>{filedata.name}</Header>
                                    <Header as='h4' style={{ marginTop: "0", color: color.MAIN }}>{filedata.size / 1000} KB</Header>
                                </Grid.Column>
                                </Grid>
                                <FormButton align="center" />
                            </Container>
                            
                        }
                        
                        </Form>
                        <FormButton align="center" background={color.FOREGROUND} color={color.TEXT_SECONDARY} text="Cancel" onClick={setOpen} />
                    </Container>
                </Modal>
            </div>
        </div>
        
     );
}
 
export default Upload;