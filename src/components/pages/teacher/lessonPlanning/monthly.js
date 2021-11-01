import React, { Fragment, useEffect, useState } from 'react';
import color from '../../../color';
import Selected from "../../../../assets/images/icons/Selected.png";
import Unselected from "../../../../assets/images/icons/Unselected.png";
import { GetMonth, GetCurrent } from "../../../../utils/utils";
import { useSelector } from 'react-redux';

const Monthly = ({monthName,lessonList}) => {
    const [format, setFormart] = useState([]);
    const data2 = useSelector(state => state.teacher.schedules);

    useEffect(()=>{
        let { currentYear } = GetCurrent();
        let {startDay,endDate} = GetMonth(monthName.month,currentYear);
        // console.log(startDay,endDate)
        formatMaker(startDay,endDate);
    },[monthName]);

    const dataSetter = (i,n,startDay,date) =>{
        let schedule=[];
        let lessons=[];

        if (data2.length !== 0){
            switch(true){
                case (i===n):
                    schedule=data2[i-n].schedule;
                    break;
                case (i===n+1):
                    schedule=data2[i-n].schedule;
                    break;
                case (i===n+2):
                    schedule=data2[i-n].schedule;
                    break;
                case (i===n+3):
                    schedule=data2[i-n].schedule;
                    break;
                case (i===n+4):
                    schedule=data2[i-n].schedule;
                    break;
                default:
                    break;
            };
            

            if (schedule){
                schedule.map((x)=>{
                    let lessonFound=x.scheduleLessons.filter((item)=>{
                        return item.date === (i-(startDay===0?startDay:startDay-1)) && item.month === monthName.month;
                    })
                    if(lessonFound.length!==0){
                        lessons.push({scheduleId:x._id,subjectId:x.course._id,subject:x.course.name,time:x.startTimeHour+":"+x.startTimeMinutes,classId:x.class._id,class:x.class.name+"/"+x.class.section,date:date,month:monthName.month,planned:true})
                    }else{
                        lessons.push({scheduleId:x._id,subjectId:x.course._id,subject:x.course.name,time:x.startTimeHour+":"+x.startTimeMinutes,classId:x.class._id,class:x.class.name+"/"+x.class.section,date:date,month:monthName.month,planned:false})
                    }
                });
            }
                // for (let item=0;item<schedule.length;item++){

                // let lessonList=schedule[item].lessons.filter(x=>{
                //     return (x.date === (i-(startDay===0?startDay:startDay-1)) && x.month === monthName.month)
                // })

                // if (lessonList.length !==0){
                //     lessons.push(lessonList[0]);
                // }
            // }

            }
        return lessons;
    }
    const formatMaker = (startDay,endDate) => {
        // console.log(data2[0].schedule)

        startDay = parseInt(startDay);
        endDate = parseInt(endDate);
        let week1 = [];
        let week2 = [];
        let week3 = [];
        let week4 = [];
        let week5 = [];
        let week6 = [];
        let month = [];

        let date=1;
        for(let i=1;i<=42;i++){
            switch(true){
                case i<=7:
                    if (i<startDay){
                        week1.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===6 || i===7){
                            week1.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lessons=dataSetter(i,1,startDay,date);
                            week1.push(lessons.length !==0?{date:date,lessons:lessons}:{date:date});
                            date++;
                        }
                    }
                    break;
                case i<=14:
                    if (i===13 || i===14){
                        week2.push({date:date,color:"#E3F0F8"});
                        date++;
                    }
                    else{
                        let lessons=dataSetter(i,8,startDay,date);
                        week2.push(lessons.length !==0?{date:date,lessons:lessons}:{date:date});
                        date++;
                    }
                    break;
                case i<=21:
                    if (i===20 || i===21){
                        week3.push({date:date,color:"#E3F0F8"});
                        date++;
                    }
                    else{
                        let lessons=dataSetter(i,15,startDay,date);
                        week3.push(lessons.length !==0?{date:date,lessons:lessons}:{date:date});
                        date++;
                    }
                    break;
                case i<=28:
                    if ( i>(endDate + (startDay-1))){
                        console.log(endDate)
                        week4.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===27 || i===28){
                            week4.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lessons=dataSetter(i,22,startDay,date);
                            week4.push(lessons.length !==0?{date:date,lessons:lessons}:{date:date});
                            date++;
                        }
                    }
                    break;
                case i<=35:
                    if ( i>(endDate + (startDay-1))){
                        week5.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===34 || i===35){
                            week5.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lessons=dataSetter(i,29,startDay,date);
                            week5.push(lessons.length !==0?{date:date,lessons:lessons}:{date:date});
                            date++;
                        }
                    }
                    break;
                case i<=42:
                    if ( i>(endDate + (startDay-1))){
                        week6.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===41 || i===42){
                            week6.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lessons=dataSetter(i,36,startDay,date);
                            week6.push(lessons.length !==0?{date:date,lessons:lessons}:{date:date});
                            date++;
                        }
                    }
                    break;
                default:
                    console.log(i);
                    break;

            }

            
        }
        month.push(week1,week2,week3,week4,week5,week6)
        setFormart(month);
        // console.log(month);
        
    }; 



    const onClick = (data) => {
        lessonList(data)
    };

    const Header = (props) => {
        let headerHeadings = props.topHeader;
        return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {headerHeadings.map((item,index) => {
                    return (
                            <div key={index} style={{ width: "16.67%", height: "40px", padding: "10px", color: color.TEXT_SECONDARY, textAlign: "center",fontSize:"16px" }}>
                                {item}
                            </div>
                    );
                })}
            </div>
    )};

    return (
        <div>
            <Header topHeader={[ "Mon", "Tue", "Wed", "Thu", "Fri","Sat","Sun"]} />
            <div style={{height:"100%",overflow:"scroll"}}>
                {format.map(row=>{
                    return(
                        <div style={{display:"flex",marginTop:"0.2rem"}}>
                            {row.map((item,index)=>{
                                return(
                                    <div key={index} style={{marginRight:"0.2rem",width: "17%",height: "75px",background: item.color,borderRadius: "5px",cursor:item.lessons?"pointer":""}} onClick={item.lessons?()=>onClick(item.lessons):()=>onClick([])}> 
                                        <label style={LabelStyle}>{item.date}</label>
                                        {/* {item.text?<label style={LabelStyle}>{item.text}</label>:null} */}
                                        {
                                            item.lessons?
                                            <div style={{display:"flex",justifyContent:"flex-end"}}>
                                                {item.lessons.map((item,index)=>{
                                                    return(
                                                        <Fragment>
                                                            <img alt={index} style={{ marginRight: "0.2rem" }} src={item.planned ? Selected : Unselected} width={12} height={12} />
                                                            {/* {index%4===0?<div class="break"></div>:null} */}
                                                        </Fragment>
                                                    )
                                                })}
                                            </div>
                                            :null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
const LabelStyle={
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "24px",
    color:color.TEXT_SECONDARY,
    padding:"0.5rem"
}

export default Monthly;