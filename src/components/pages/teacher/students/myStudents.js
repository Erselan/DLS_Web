import React, { Fragment, useEffect, useState } from "react";
import color from "../../../color";
import Avatars from "../../../../assets/images/icons/avatars.png"
import Robot from "../../../../assets/images/icons/robotAvatar.png"
import Share from "../../../../assets/images/icons/share2.png"
import { Image } from "semantic-ui-react";
import { apiCall } from "../../../../main/axios";
import { useHistory } from "react-router-dom";

const MyStudents = () => {
    
    const [classes,setClasses] = useState([]);
    useEffect(()=>{
        apiCall("get", "/schedule/getClassesForTeacher?teacherId=610233881dc4c7002370c20a").then((res) => {
            console.log(res.result)
            setClasses(res.result)
          }).catch((err) => {
            console.log(err);
          });
    },[])

    return (
        <div style={{ padding: "2rem" }}>
            <div>
                 <label style={{fontSize:"34px",lineHeight:"51px",color:color.TEXT_PRIMARY}}>My Student</label>
            </div>
            <div>
                <div style={{display:"flex",}}>
                    <div style={{width:"70%",display:"flex",justifyContent:"space-between"}}>
                        <label style={{fontSize:"22px",lineHeight:"33px",color:color.TEXT_PRIMARY}}>Classes</label>
                        <div>
                            {/* <label>Grade</label> */}
                        </div>
                    </div>
                    <label style={{fontSize:"22px",lineHeight:"33px",color:color.TEXT_PRIMARY}}>My Students</label>
                </div>
                
                <div style={{display:"flex",justifyContent:"start"}}>
                    <div style={{width:"70%",display:"flex",flexWrap: "wrap"}}>
                        {
                            classes.length !== 0 ?
                            <Fragment>
                                {
                                    classes.map((item,index)=>{
                                        return(
                                            <ClassView key={index} />
                                        )
                                    })
                                }
                            </Fragment>
                            :null
                        }
                        {/* <ClassView />
                        <ClassView />
                        <ClassView />
                        <ClassView />
                        <ClassView /> */}
                    </div>
                    <div style={{width:"30%",}}><Search /></div>
                </div>
                
            </div>
        </div>
    );
};

const ClassView = () => {
    const history = useHistory();
    const colors = ['#5E81F4', '#0CC3E7', '#CAD1E8', '#FFAE33'];
    const rectColor = colors[Math.floor(Math.random() * colors.length)];
    
    return(
        <div style={{width:"17rem",height:"15rem",backgroundColor:color.FOREGROUND,margin:"0.5rem",borderRadius:"20px",display:"flex",flexDirection:"column",justifyContent:"space-around"}} onClick={()=>history.push("/teacher/students/class")}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>
                    <div style={{width:"15px",height:"40px",backgroundColor:rectColor,borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}></div>
                    <div style={{display:"flex",flexDirection:"column",marginLeft:"1rem"}}>
                        <label style={{fontSize:"22px",lineHeight:"24px",color:color.TEXT_PRIMARY}}>Class 1A</label>
                        <label style={{fontSize:"11px",lineHeight:"17px",color:color.TEXT_SECONDARY}}>Biology</label>
                    </div>
                </div>
                <div style={{marginTop:"-1rem",marginRight:"1rem"}}><Image src={Share} width={28}/></div>
            </div>
            
            <div style={{display:"flex",flexDirection:"column",marginLeft:"2rem"}}>
                <Image src={Avatars} width={100} />
                <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_SECONDARY}}>17 Students</label>
            </div>
        </div>
    )
};

const Search = () => {
    return(
        <div style={{margin:"0.5rem 0rem"}}>
            <div>
                <div class="ui right icon input" style={{width:"100%"}}><input type="text" placeholder="Search" style={{fontSize:"17px",lineHeight:"26px",color:color.TEXT_PRIMARY,fontFamily:"poppins",backgroundColor:"transparent",borderRadius:"10px",border:"2px solid #EBECF2"}} /><i aria-hidden="true" class="search icon" style={{color:color.TEXT_PRIMARY,fontSize:"1.5rem",cursor:"pointer"}}></i></div>
            </div>
            <div style={{padding:"2rem 1rem"}}>
                {
                    [1,2,3,4,5].map((item,index)=>{
                        return(
                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"1rem"}}> 
                                <div style={{display:"flex"}}>
                                    <Image src={Robot} width={35} height={35} />
                                    <div style={{display:"flex",flexDirection:"column",marginLeft:"1rem"}}>
                                        <label style={{fontSize:"16px",lineHeight:"18px",color:color.TEXT_PRIMARY}}>Name</label>
                                        <label style={{fontSize:"13px",lineHeight:"14px",color:color.TEXT_SECONDARY}}>Class</label>
                                    </div>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_SECONDARY}}>Student Id</label>
                                    <label style={{fontSize:"13px",lineHeight:"20px",color:color.TEXT_SECONDARY,marginLeft:"0.5rem",marginRight:"1rem"}}>213123</label>
                                    <Image src={Share} width={25}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MyStudents;
