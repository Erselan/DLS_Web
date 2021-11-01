import React from "react";
import { useHistory, useLocation } from "react-router";
import { Checkbox, Grid, Image } from "semantic-ui-react";
import Avatar from "../../../../assets/images/icons/robotAvatar.png"
import color from "../../../color";
import Viewer from "./Viewer";
import AssignmentIcon from "../../../../assets/images/icons/lesson_icon1.png"
import Clock from "../../../../assets/images/icons/Clock.png"
import Edit from "../../../../assets/images/icons/edit.png"
import Share from "../../../../assets/images/icons/share.png"
import { apiCall } from "../../../../main/axios";
import { useDispatch } from "react-redux";
import { TEACHER_ACTIONS } from './../../../../main/store/actions';

const Summary = () => {
    const location = useLocation();
    const history = useHistory();
    let dispatcher = useDispatch();

    // useEffect(()=>{
    //     console.log(location.schedule)
    //     console.log(location.resource)
    //     console.log(location.addons)
    // })
    
    const CompletePlanning = () => {
        console.log("sad")
        let data={date:location.schedule.date,month:location.schedule.month,file:location.resource,addons:location.addons}
        apiCall("post", '/lesson/insertLesson', {scheduleId:location.schedule.scheduleId,lessonData:data}).then((res) => {
            
            apiCall("get", "/schedule/getMonthlyScheduleForTeacher?teacherId="+localStorage.getItem('teacherId')).then((res) => {
                console.log(res.result)
                dispatcher({ type: TEACHER_ACTIONS.REPLACE_SCHEDULES, payload: res.result });
                history.push("/teacher/lessonPlanning/date");
            }).catch((err) => {
              console.log(err);
              
            });

        }).catch((err) => {
          console.log(err);
        });
    }

    return (
        <Grid columns={2}>
            <Grid.Row>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",margin:"0rem 2rem"}}>
                    <div style={{display:"flex"}}>
                        <div style={{display:"flex",flexDirection:"column",marginRight:"2rem"}}>
                            <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_PRIMARY_LIGHT}}>Date</label>
                            <label style={{fontSize:"16px",lineHeight:"24px",color:color.TEXT_PRIMARY}}>{location.schedule.date} {location.schedule.month}</label>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",marginRight:"2rem"}}>
                            <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_PRIMARY_LIGHT}}>Lesson</label>
                            <label style={{fontSize:"16px",lineHeight:"24px",color:color.TEXT_PRIMARY}}>{location.schedule.subject}</label>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",marginRight:"2rem"}}>
                            <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_PRIMARY_LIGHT}}>Class</label>
                            <label style={{fontSize:"16px",lineHeight:"24px",color:color.TEXT_PRIMARY}}>{location.schedule.class}</label>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",marginRight:"2rem"}}>
                            <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_PRIMARY_LIGHT}}>Source</label>
                            <label style={{fontSize:"16px",lineHeight:"24px",color:color.TEXT_PRIMARY}}>{location.source}</label>
                        </div>
                    </div>
                    <div>
                    <button style={{ outline: "none", border: "none", fontSize: "1rem", color: "white", backgroundColor: color.MAIN, borderRadius: "8px", padding: "8px 10px", marginLeft: "20px" }} onClick={()=>CompletePlanning()}>Complete Planning</button>
                    </div>
                </div>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={5}>
                    <div style={{display: "flex",flexDirection: "column", padding: "30px 20px",background: color.FOREGROUND,borderRadius: "20px"}}>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <label style={{fontSize:"17px",fontWeight:"bold",lineHeight:"25px",color:color.TEXT_PRIMARY}}>Class 1C</label>
                            <Checkbox />
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding: "8px 16px",
                                    background: color.FOREGROUND,boxShadow: "0px 3.17797px 6.35593px #E1E4ED",borderRadius: "6px",marginBottom:"1rem"}}>
                            <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
                                <Image src={Avatar} width={30}></Image>
                                <label style={{marginLeft:"1rem",fontSize:"11px",fontWeight:"bold",lineHeight:"25px",color:color.TEXT_PRIMARY}}>Class 1C</label>
                            </div>
                            <Checkbox />
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={7}>
                {/* <iframe width="100%" height="100%" title="Pdf Viewer" src={location.resource+"&embedded=true"} ></iframe> */}
                    <Viewer docToLoad={location.resource} />
                </Grid.Column>
                <Grid.Column width={4}>
                    {/* <div style={{height:"80%",overflow:"scroll"}}> */}
                        <label style={{fontSize:"22px",fontWeight:"bold",lineHeight:"31px",color:color.TEXT_PRIMARY}}>Assignment</label>
                        <div style={{height:"50vh",overflow:"scroll"}}>
                            <ViewAssignment data={location.assigments}/>
                        </div>
                    {/* </div> */}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

const  ViewAssignment = ({data}) => {
    
    let assignments = data;

    return (
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
     );
}

export default Summary;
