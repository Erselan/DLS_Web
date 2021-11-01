import React, { Fragment, useEffect, useState } from 'react';
import color from '../../../color';
import Selected from "../../../../assets/images/icons/Selected.png";
import Unselected from "../../../../assets/images/icons/Unselected.png";
import "../../../globalStyle.css";
import { GetCurrent, GetMonth } from "../../../../utils/utils";
import { useSelector } from 'react-redux';

const Weekly = ({month,week,lessonList}) => {
    const [format, setFormart] = useState([]);
    const data2 = useSelector(state => state.teacher.schedules);

    useEffect(()=>{
        let { currentYear } = GetCurrent();
        let {startDay,endDate} = GetMonth(month,currentYear);
        // console.log(startDay,endDate)
        formatMaker(startDay,endDate,week);
    },[month,week]);

    const dataSetter = (i,n,startDay,date) =>{
        let schedule=[];
        let lecture = [];

        if (data2.length !== 0){
            switch(true){
                case (i===n):
                    schedule=data2[i-n].schedule;
                    // console.log(schedule)
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
            // console.log(schedule)
            
            if (schedule){
                schedule.map((x)=>{
                    let lessonFound=x.scheduleLessons.filter((item)=>{
                        return item.date === (i-(startDay===0?startDay:startDay-1)) && item.month === month;
                    })
                    if(lessonFound.length!==0){
                        lecture.push({scheduleId:x._id,subjectId:x.course._id,subject:x.course.name,time:x.startTimeHour+":"+x.startTimeMinutes,classId:x.class._id,class:x.class.name+"/"+x.class.section,date:date,month:month,planned:true})
                    }else{
                        lecture.push({scheduleId:x._id,subjectId:x.course._id,subject:x.course.name,time:x.startTimeHour+":"+x.startTimeMinutes,classId:x.class._id,class:x.class.name+"/"+x.class.section,date:date,month:month,planned:false})
                    }
                });
            }

            // schedule.map((item)=>{
            //     let lessonList=item.lessons.filter(x=>{
            //                 return (x.date === (i-(startDay===0?startDay:startDay-1)) && x.month === month)
            //             })
            //     lecture.push(lessonList.length !== 0 ?{class:item.class,course:item.course.name,lessonPlanned:lessonList[0].planned}:{class:item.class,course:item.course.name});
            // });
        }
        
        return lecture;
    }
    const formatMaker = (startDay,endDate,week) => {
        // console.log(data2[0].schedule)

        startDay = parseInt(startDay);
        endDate = parseInt(endDate);
        let week1 = [];
        let week2 = [];
        let week3 = [];
        let week4 = [];
        let week5 = [];
        let week6 = [];
        // let month = [];

        let date=1;
        for(let i=1;i<=42;i++){
            switch(true){
                case i<=7:
                    if (i<startDay){
                        week1.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===6 || i===7){
                            // week1.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lecture=dataSetter(i,1,startDay,date);
                            week1.push({date:date,lecture:lecture});
                            date++;
                        }
                    }
                    break;
                case i<=14:
                    if (i===13 || i===14){
                        // week2.push({date:date,color:"#E3F0F8"});
                        date++;
                    }
                    else{
                        let lecture=dataSetter(i,8,startDay,date);
                        week2.push({date:date,lecture:lecture});
                        date++;
                    }
                    break;
                case i<=21:
                    if (i===20 || i===21){
                        // week3.push({date:date,color:"#E3F0F8"});
                        date++;
                    }
                    else{
                        let lecture=dataSetter(i,15,startDay,date);
                        week3.push({date:date,lecture:lecture});
                        date++;
                    }
                    break;
                case i<=28:
                    if ( i>(endDate + (startDay-1))){
                        console.log(endDate)
                        week4.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===27 || i===28){
                            // week4.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lecture=dataSetter(i,22,startDay,date);
                            week4.push({date:date,lecture:lecture});
                            date++;
                        }
                    }
                    break;
                case i<=35:
                    if ( i>(endDate + (startDay-1))){
                        week5.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===34 || i===35){
                            // week5.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lecture=dataSetter(i,29,startDay,date);
                            week5.push({date:date,lecture:lecture});
                            date++;
                        }
                    }
                    break;
                case i<=42:
                    if ( i>(endDate + (startDay-1))){
                        week6.push({date:"",color:"#E3F0F8"})
                    }else{
                        if (i===41 || i===42){
                            // week6.push({date:date,color:"#E3F0F8"});
                            date++;
                        }
                        else{
                            let lecture=dataSetter(i,36,startDay,date);
                            week6.push({date:date,lecture:lecture});
                            date++;
                        }
                    }
                    break;
                default:
                    console.log(i);
                    break;

            }

            
        }
        // monthpush(week1,week2,week3,week4,week5,week6)
        // setFormart(week1);
        // console.log(week2);
        switch(true){
            case week===1:
                setFormart(week1);
                break;
            case week===2:
                setFormart(week2);
                break;
            case week===3:
                setFormart(week3);
                break;
            case week===4:
                setFormart(week4);
                break;
            case week===5:
                setFormart(week5);
                break;
            case week===6:
                setFormart(week6);
                break;
            default:
                break;
        }
        
    };

    const onClick = (data) => {
        lessonList(data)
    };

    // const Header = (props) => {
    //     let headerHeadings = props.topHeader;
    //     return (
    //         <div style={{ display: "flex" }}>
    //             {headerHeadings.map((item) => {
    //                 return (
    //                         <div style={{marginLeft:"1.5rem", width: "200px", height: "40px", padding: "10px 22px", color: color.TEXT_SECONDARY, textAlign: "center",fontSize:"16px" }}>
    //                             {item}
    //                         </div>
    //                 );
    //             })}
    //         </div>
    // )};

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
            <Header topHeader={[ "Mon", "Tue", "Wed", "Thu", "Fri"]} />
            <div style={{height:"220px",overflow:"scroll"}}>
                {/* {format.map(row=>{
                    return( */}
                        <div style={{display:"flex",marginTop:"0.2rem"}}>
                            {format.map((item,index)=>{
                                {/* console.log(item.lecture) */}
                                return(
                                    
                                    <div key={index} style={{marginRight:"0.2rem",width: "125px",height: "75px",background: item.color,borderRadius: "5px",cursor:item.lecture?"pointer":""}} onClick={item.lecture?()=>onClick(item.lecture):()=>onClick([])}> 
                                        <label style={LabelStyle}>{item.date}</label>
                                        <div style={{display:"flex",flexDirection:"column-reverse"}}>
                                            {
                                                item.lecture?
                                                <Fragment>
                                                {
                                                    item.lecture.map((x,index)=>{
                                                        return(
                                                            <div style={{display:"flex",justifyContent:"space-around",textAlign:"center"}} key={index}>
                                                                <div style={{display:"flex",justifyContent:"flex-end"}} >
                                                                    <img alt={index} style={{ marginTop: "0.8rem" }} src={x.planned ? Selected : Unselected} width={12} height={12} />                                                                       
                                                                </div>
                                                                <label style={LabelStyle}>{x.subject}</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                                </Fragment>
                                                :null
                                            }
                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    {/* ) */}
                {/* })} */}
            </div>
        </div>
        // <div class="scrollbar" style={{overflow:"auto"}}>
        //     <Header topHeader={[ "09:00", "10:00", "11:00", "12:00", "01:00","02:00","03:00" ]} />
        //     <div style={{height:"225px"}}>
        //         {data.map((row,x)=>{
        //             return(
        //             <div style={{display:"flex"}}>
        //                 <div style={{display:"flex",flexDirection:"column",marginRight:"0.2rem"}}>
        //                     {row.map((item,index)=>{

        //                         {/* const day=days.filter((item)=>{
        //                             return item.key === 1;
        //                         })
        //                         console.log(day.name) */}

        //                         return(
        //                             <div style={{display:"flex"}}>
        //                                 {x===0?<label style={{...LabelStyle,paddingTop:"2.2rem"}}>d</label>:null}
        //                                 <div key={index} style={{marginTop:"0.2rem",width: "100px",height: "75px",background: item.color,borderRadius: "5px"}}> 
        //                                     <label style={LabelStyle}>{item.date}</label>
        //                                     {item.text?<label style={LabelStyle}>{item.text}</label>:null}
        //                                     {
        //                                         item.lessons?
        //                                         <div style={{display:"flex",justifyContent:"flex-end"}}>
        //                                             {item.lessons.map((status,index)=>{
        //                                                 return(
        //                                                     <Fragment>
        //                                                         <img alt={index} style={{ marginRight: "0.2rem" }} src={status ? Selected : Unselected} width={10} height={10} />
        //                                                         {/* {index%4===0?<div class="break"></div>:null} */}
        //                                                     </Fragment>
        //                                                 )
        //                                             })}
        //                                         </div>
        //                                         :null
        //                                     }
        //                                 </div>
        //                             </div>
        //                         )
        //                     })}
        //                 </div>
        //             </div>
        //             )
        //         })}
        //     </div>
        // </div>
     );
}
 
const LabelStyle={
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "24px",
    color:color.TEXT_SECONDARY,
    padding:"0.5rem"
}

export default Weekly;