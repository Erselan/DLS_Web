import React, { Fragment,useState } from "react";
import Planned from "./planned"
import Monthly from "./monthly"
import Weekly from "./weekly"
import { Dropdown, Grid } from "semantic-ui-react"
import color from "../../../color";
import LeftArrow from "./../../../../assets/images/icons/leftIcon.png";
import RightArrow from "./../../../../assets/images/icons/rightIcon.png";
import { GetCurrent } from "../../../../utils/utils";
const LessonPlanningDate = () => {

    const { currentMonthInNumber, currentMonth} = GetCurrent();
    const [schedules, setSchedules] = useState([]);
    const [calenderView,setCalenderView] = useState("monthly")
    const [month,setMonth] = useState({key:parseInt(currentMonthInNumber),month:currentMonth});
    const [week,setWeek] = useState({key:1,name:"Week 1"});

    const months = [{key:1,month:"Jan"},{key:2,month:"Feb"},{key:3,month:"Mar"},{key:4,month:"Apr"},
                    {key:5,month:"May"},{key:6,month:"Jun"},{key:7,month:"Jul"},{key:8,month:"Aug"},
                    {key:9,month:"Sep"},{key:10,month:"Oct"},{key:11,month:"Nov"},{key:12,month:"December"}];
    const weeks = [{key:1,name:"Week 1"},{key:2,name:"Week 2"},{key:3,name:"Week 3"},{key:4,name:"Week 4"},
                    {key:5,name:"Week 5"},{key:6,name:"Week 6"}];

    const onScheduleChange = (data) => {
        setSchedules(data);
    }

    const monthChanged = (data) => {
        let target = (data === "previous"?((month.key - 1)===0?12:month.key - 1):((month.key + 1)===13?1:month.key + 1));
        let targetMonth=months.filter((item)=>{
            return item.key === target;
        })
        setMonth(...targetMonth)
    };

    const weekChanged = (data) => {
        let target = (data === "previous"?((week.key - 1)===0?6:week.key - 1):((week.key + 1)===7?1:week.key + 1));
        let targetWeek=weeks.filter((item)=>{
            return item.key === target;
        })
        setWeek(...targetWeek)
    };

    return (
        <Fragment>
            <Grid columns={2}>
                <Grid.Row>
                    {
                        schedules.length === 0?
                        <Grid.Column width={5}>
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <label style={{ color: color.TEXT_PRIMARY, fontWeight: "bolder" }}>No lesson to Show</label>
                            </div>
                        </Grid.Column>
                        :
                        <Grid.Column width={5}>
                            {
                                schedules.map((item) => {
                                    return (<Planned schedule={item} />)
                                })
                            }
                        </Grid.Column>
                    }
                    
                    <Grid.Column width={11}>
                        <div style={{ padding: "0px 10px" }}>
                            <div style={{ width: "100%", height: "100%", backgroundColor: color.FOREGROUND, borderRadius: "10px", padding: "15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "40px" }}>
                                    <div style={{ marginLeft: "10px" }}>
                                    {   calenderView === "monthly" ?
                                        <Fragment>
                                            <img width={10} src={LeftArrow} style={{ marginRight: "15px",cursor:"pointer"}} alt="asd" onClick={()=>monthChanged("previous")} />
                                            <label style={{ marginRight: "15px", fontSize: "1rem", color: color.TEXT_PRIMARY }}> {month.month} </label>
                                            <img width={10} src={RightArrow} style={{ cursor:"pointer"}} alt="asd"onClick={()=>monthChanged("next")} />
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <img width={10} src={LeftArrow} style={{ marginRight: "15px",cursor:"pointer"}} alt="asd" onClick={()=>weekChanged("previous")} />
                                            <label style={{ marginRight: "15px", fontSize: "1rem", color: color.TEXT_PRIMARY }}> {month.month} {week.name} </label>
                                            <img width={10} src={RightArrow} style={{ cursor:"pointer"}} alt="asd"onClick={()=>weekChanged("next")} />
                                        </Fragment>
                                    }
                                    </div>
                                    <div>
                                        <button style={{ outline: "none", border: "none", fontSize: "0.9rem", color: "white", backgroundColor: color.MAIN, borderRadius: "8px", padding: "6px 15px 6px 15px", marginRight: "20px" }}>Plan By Class</button>
                                        <button style={{ outline: "none", border: "none", fontSize: "0.9rem", color: "white", backgroundColor: color.MAIN, borderRadius: "8px", padding: "6px 15px 6px 15px", marginRight: "20px" }}>Plan By Lesson</button>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", height: "40px",margin:"1rem 0rem" }}>
                                    <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px", display: "flex" }}>
                                    {   calenderView === "monthly" ?
                                        <Fragment>
                                            <button style={{ ...ButtonStyle }} onClick={()=>setCalenderView("weekly")}>Weekly</button>
                                            <button style={{ ...ButtonStyle, backgroundColor: color.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Monthly</button>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <button style={{ ...ButtonStyle,backgroundColor: color.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Weekly</button>
                                            <button style={{ ...ButtonStyle }} onClick={()=>setCalenderView("monthly")}>Monthly</button>
                                        </Fragment>
                                    }
                                    </div>
                                    <div style={{fontSize: "11px"}}>
                                        <Dropdown selection options={[]} scrolling search placeholder="Select Class" />
                                        <Dropdown selection options={[]} scrolling search placeholder="Select Lesson" />
                                    </div>
                                </div>
                                {   
                                    calenderView === "monthly" ?
                                    <Monthly monthName={month} lessonList={onScheduleChange}/>:<Weekly month={month.month} week={week.key} lessonList={onScheduleChange}/>
                                }
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    );
};

const ButtonStyle = {
    color: color.TEXT_PRIMARY,
    backgroundColor: "#EBECF2",
    borderRadius: "14px",
    fontSize: "0.7rem",
    border: "none",
    fontWeight: "bolder",
    padding: "6px 20px",
    outline: "none"
}

export default LessonPlanningDate;
