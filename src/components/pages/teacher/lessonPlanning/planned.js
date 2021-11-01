import React, { useState } from 'react';
import Colors from "../../../color";
import { Dropdown } from "semantic-ui-react";
import Plan from "../../../../assets/images/icons/lesson_icon1.png";
import Down from "../../../../assets/images/icons/down.png";
import Up from "../../../../assets/images/icons/up.png";
import Selected from "../../../../assets/images/icons/Selected.png";
import Unselected from "../../../../assets/images/icons/Unselected.png";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { apiCall } from '../../../../main/axios';

const Planned = (props) => {
  const [drop, setDrop] = useState(false);
  const [Option, setOption] = useState();
  const history = useHistory();

  const PlanLesson = () => {
    if (Option){
      if (Option === "Resources"){
        history.push({
          pathname:'/teacher/lessonPlanning/content',
          schedule:props.schedule,
          source:"Resource"
        });
      }else{
        apiCall("post", '/classCourse/getClassCourse', {classId:props.schedule.classId,courseId:props.schedule.subjectId}).then((res) => {
            if(res.result.officialBook){
              history.push({
                pathname: '/teacher/lessonPlanning/content/select',
                link: res.result.officialBook.fileLocation,
                schedule:props.schedule,
                source:"Book and resource"
              });
            } else {
              toast.error("Book is assigned to this course.")
            }
        }).catch((err) => {
          console.log(err);
        });
      
      }
    }else{
      toast.error("Please Select an option to plan lesson");
    }
  }
  return (
    <div style={{ width: "100%", backgroundColor: "white", borderRadius: "20px", padding: "20px", marginBottom: "10px" }}>
      <div style={{ width: "100%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <img alt="s" src={Plan} width={38} height={35} />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", textAlign: "left" }}>
            <label style={SubjectStyle}>{props.schedule.subject}</label>
            {/* <label style={TopicStyle}>{props.schedule.topic}</label> */}
            <div style={{ display: "flex" }}>
              <img alt="s" style={{ marginRight: "10px" }} src={props.schedule.planned ? Selected : Unselected} width={20} height={20} />
              <label style={{ ...PlannedStyle, color: props.schedule.planned ? "" : "red" }}>{props.schedule.planned ? "Planned" : "Not Planned"}</label>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px" }}>
            <label style={TimeStyle}>{"Time " + props.schedule.time}</label>
            <label style={ClassStyle}>{"Class " + props.schedule.class}</label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img onClick={() => { setDrop(!drop) }} alt="down" src={drop ? Down : Up} width={17} height={10} />
          </div>
        </div>
      </div>
      {
        drop && !props.schedule.planned ? <div style={{ marginTop: "20px" }}>
          <label style={{ fontSize: "1.1rem", fontWeight: "bold", color: Colors.TEXT_PRIMARY }}>Content Type</label>
          <br></br>
          <Dropdown placeholder="Select" search selection options={[{key: '0',text:'Resources',value: 'Resources'},{key: '1',text:'Book and Resources',value: 'Book'}]} compact style={{ width: "70%", fontSize: "1rem" }} onChange={(event,data)=>setOption(data.value)} />
          <br></br>
          <div style={{ textAlign: "right" }}>
            <button style={{ outline: "none", borderRadius: "15px", border: "none", fontWeight: "bold", padding: "10px 30px 10px 30px", color: "white", backgroundColor: Colors.MAIN, fontSize: "14px" }} onClick={()=>PlanLesson()}>Plan</button>
          </div>
        </div> : ""
      }
    </div>

  );
}

const SubjectStyle = {
  fontSize: "1.4rem",
  color: Colors.TEXT_PRIMARY
}
// const TopicStyle = {
//   fontSize: "0.9rem",
//   color: Colors.TEXT_PRIMARY
// }
const PlannedStyle = {
  fontSize: "0.9rem",
  color: Colors.TEXT_PRIMARY
}
const TimeStyle = {
  fontSize: "0.9rem",
  color: Colors.TEXT_PRIMARY,
}
const ClassStyle = {
  fontSize: "0.9rem",
  color: Colors.TEXT_PRIMARY_LIGHT
}

export default Planned;