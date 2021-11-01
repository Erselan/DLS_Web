import React, { Fragment, useEffect, useState } from 'react';
import { Button, Container, Dropdown, Form } from 'semantic-ui-react';
import { FormButton, Label } from './../../../shared';
import { useDispatch, useSelector } from "react-redux";
import COLORS from './../../../color';
import Modal from "./../../../layouts/modal";
import { apiCall } from './../../../../main/axios/index';
import { ADMIN_ACTIONS } from './../../../../main/store/actions';
import Schedular from "./schedular"

const moment = require("moment");

const Schedule = () => {

    const dispatcher = useDispatch();
    const classes = useSelector(state => state.admin.classes);
    const classSchedules = useSelector(state => state.admin.schedules);
    const [timetable, settimetable] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [filter, setFilterOption] = useState([]);
    const [dataList, setDataList] = useState({ grade: "", weeklyHr: 0, lessonDuration: 0, breakDuration: 0, break: 0, dayStart: 0 });
    const [flag, setFlag] = useState({ weeklyHr: false, breakDuration: false, lunchBreak: false });
    const [open, setOpen] = useState(false);

    const teachers = useSelector(state => state.admin.teachers);
    const [teacher, setTeacher] = useState("");
    const [teacherOptions, setTeacherOptions] = useState([]);
    const courses = useSelector(state => state.admin.courses);
    const [course, setCourse] = useState("");
    const [courseOptions, setCourseOptions] = useState([]);
    const [openAssign, setOpenAssign] = useState(false);

    const [assignSchedule, setAssignSchedule] = useState();

    useEffect(() => {

        let options = [];
        classes.map((item) => {
            options.push({ key: item._id, text: item.name + " (" + item.section + ")", value: item._id });
            return null;
        });
        setClassOptions(options);

        let filterOptions = [];
        classSchedules.map((item) => {
            filterOptions.push({ key: item.class.id, text: item.class.name, value: item.class.id });
            return null;
        });
        setFilterOption(filterOptions);

        let myteacherOptions = [];
        teachers.map((item) => {
            return myteacherOptions.push({ key: item._id, text: item.name, value: item._id, image: { avatar: true, src: item.image }, });
        });
        setTeacherOptions(myteacherOptions)

        let mycourseOptions = [];
        courses.map((item) => {
            return mycourseOptions.push({ key: item._id, text: item.name, value: item._id, image: { avatar: true, src: item.image }, });
        });
        setCourseOptions(mycourseOptions)

    }, [classes, classSchedules, courses, teachers]);


    const onFilterChange = (event, data) => {
        let classData = classSchedules.filter(item => {
            return item.class.id === data.value
        })
        settimetable(classData)
    };

    const onSubmit = async () => {
        setOpen(false);
        let schedule = await scheduleMaker();
        apiCall("post", "/schedule/insertSchedule", schedule).then((res) => {
            apiCall("get", "/schedule/getSchedules").then((res) => {
                dispatcher({ type: ADMIN_ACTIONS.REPLACE_SCHEDULES, payload: res.result });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    };

    const scheduleMaker = async () => {
        let dayMins = ((dataList.weeklyHr / 5) * 60);
        let classtime = dataList.lessonDuration + dataList.breakDuration;
        let count = Math.ceil(((dayMins + dataList.breakDuration) - dataList.break) / classtime) + 1;
        let breakCount = Math.floor(count / 2);
        let currentTime = moment(dataList.dayStart, "hr");
        let scheduleList = []
        let key = 0;
        for (let i = 0; i < count; i++) {
            if (i === breakCount) {
                const lunchBreakEndtime = currentTime.clone().add(dataList.break, "m");
                scheduleList.push({ key: key, class: dataList.grade, dayStart: dataList.dayStart, startTimeHour: currentTime.hour(), startTimeMinutes: currentTime.minutes(), endTimeHour: lunchBreakEndtime.hour(), endTimeMinutes: lunchBreakEndtime.minutes(), type: "lunch break", course: null, teacher: null, lesson: null })
                currentTime.add(dataList.break, "m")
                key++;
            }
            else {
                if (((i + 1) === count) || ((i + 1) === breakCount)) {
                    const classEndtime = currentTime.clone().add(dataList.lessonDuration, "m");
                    scheduleList.push({ key: key, class: dataList.grade, dayStart: dataList.dayStart, startTimeHour: currentTime.hour(), startTimeMinutes: currentTime.minutes(), endTimeHour: classEndtime.hour(), endTimeMinutes: classEndtime.minutes(), type: "lesson", course: null, teacher: null, lesson: null })
                    currentTime.add(dataList.lessonDuration, "m")
                    key++;
                }
                else {
                    const classEndtime = currentTime.clone().add(dataList.lessonDuration, "m");
                    const breakEndtime = classEndtime.clone().add(dataList.breakDuration, "m");
                    scheduleList.push({ key: key, class: dataList.grade, dayStart: dataList.dayStart, startTimeHour: currentTime.hour(), startTimeMinutes: currentTime.minutes(), endTimeHour: classEndtime.hour(), endTimeMinutes: classEndtime.minutes(), type: "lesson", course: null, teacher: null, lesson: null })
                    scheduleList.push({ key: key + 1, class: dataList.grade, dayStart: dataList.dayStart, startTimeHour: classEndtime.hour(), startTimeMinutes: classEndtime.minutes(), endTimeHour: breakEndtime.hour(), endTimeMinutes: breakEndtime.minutes(), type: "break", course: null, teacher: null, lesson: null })
                    currentTime.add(classtime, "m")
                    key = key + 2;
                }
            }
        }
        let mySchdule = [];
        scheduleList.map((item) => {
            mySchdule.push({ ...item, day: 1 });
            mySchdule.push({ ...item, day: 2 });
            mySchdule.push({ ...item, day: 3 });
            mySchdule.push({ ...item, day: 4 });
            mySchdule.push({ ...item, day: 5 });
            return (null)
        });

        return mySchdule;
    }
    const onLessonClick = (data) => {
        setOpenAssign(true);
        setAssignSchedule(data)
    }

    const onAssign = () => {
        setOpenAssign(false);
        apiCall("put", "/schedule/updateSchedule", { ...assignSchedule, course: course, teacher: teacher }).then((res) => {
            let classId = res.result.class;
            apiCall("get", "/schedule/getSchedules").then(async (res) => {
                dispatcher({ type: ADMIN_ACTIONS.REPLACE_SCHEDULES, payload: res.result });
                let classData = res.result.filter(item => {
                    return item.class.id === classId
                })
                settimetable(classData)
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });

    }

    return (
        <Fragment>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "auto", width: "82%", marginTop: "15px", marginBottom: "15px", fontSize: "16px" }}>
                <label>Select Grade</label>
                <Dropdown selection options={filter} scrolling search placeholder="Select Class" onChange={onFilterChange} />
            </div>
            <Container style={{ margin: "auto", width: "85%", overflowY: "scroll", height: "65vh", paddingTop: "5px", }}>
                {
                    timetable.length === 0
                        ? <div>Please select a class first</div> :
                        <Fragment>
                            <Schedular rows={timetable[0]} onClick={onLessonClick} />
                            <Modal open={openAssign} change={setOpenAssign} title={"Assign Course and Teacher"}>
                                <Container style={{ margin: "auto", width: "90%" }}>
                                    <Form onSubmit={onAssign}>
                                        <Label text="Course" /><br />
                                        <Dropdown fluid selection options={courseOptions} scrolling search placeholder="Select Course" onChange={(event, data) => setCourse(data.value)} />
                                        <Label text="Teacher" /><br />
                                        <Dropdown fluid selection options={teacherOptions} scrolling search placeholder="Select Teacher" onChange={(event, data) => setTeacher(data.value)} />
                                        <FormButton text="Assign" align="left" />
                                    </Form>
                                </Container>
                            </Modal>
                        </Fragment>
                }
            </Container>

            <Container
                style={{ margin: "auto", width: "85%", textAlign: "right", padding: "15px 0px 15px 0px" }}      >
                <Button style={{ color: COLORS.BACKGROUND, backgroundColor: COLORS.MAIN, borderRadius: "50px", }} onClick={() => { setOpen(true); }}        >
                    Create Timetable
          </Button>

                <Modal open={open} change={setOpen} title={"Create Timetable Structure"}>
                    <Container style={{ margin: "auto", width: "90%" }}>
                        <Form onSubmit={onSubmit}>
                            <Label text="Class" /><br />
                            <Dropdown fluid selection options={classOptions} scrolling search placeholder="Select Class" onChange={(event, data) => setDataList({ ...dataList, grade: data.value })} />

                            <Label text="Total Weekly Hours" /><br />
                            <Dropdown fluid selection options={[
                                { key: "1", text: "20 hr", value: 20 },
                                { key: "2", text: "25 hr", value: 25 },
                                { key: "3", text: "30 hr", value: 30 },
                                { key: "4", text: "35 hr", value: 35 },
                                { key: "5", text: "40 hr", value: 40 },
                            ]}
                                scrolling search placeholder="Select in hr" onChange={(event, data) => { setDataList({ ...dataList, weeklyHr: data.value }); setFlag({ ...flag, weeklyHr: true }) }} />

                            <Label text="Break Duration" /><br />
                            <Dropdown fluid selection options={[
                                { key: "1", text: "15 mins", value: 15 },
                                { key: "2", text: "20 mins", value: 20 },
                                { key: "3", text: "25 mins", value: 25 },
                                { key: "4", text: "30 mins", value: 30 }
                            ]}
                                scrolling search placeholder="Select in mins" onChange={(event, data) => { setDataList({ ...dataList, breakDuration: data.value }); setFlag({ ...flag, breakDuration: true }) }} />

                            <Label text="Lunch BreaK" /><br />
                            <Dropdown fluid selection options={[
                                { key: "1", text: "15 mins", value: 15 },
                                { key: "2", text: "20 mins", value: 20 },
                                { key: "3", text: "25 mins", value: 25 },
                                { key: "4", text: "30 mins", value: 30 },
                                { key: "5", text: "35 mins", value: 35 },
                                { key: "6", text: "40 mins", value: 40 },
                                { key: "7", text: "45 mins", value: 45 },
                                { key: "8", text: "50 mins", value: 50 },
                            ]}
                                scrolling search placeholder="Select in mins" onChange={(event, data) => { setDataList({ ...dataList, break: data.value }); setFlag({ ...flag, lunchBreak: true }) }} />

                            <Label text="Lesson Duration" /><br />
                            <Dropdown disabled={((flag.weeklyHr && flag.breakDuration && flag.lunchBreak) ? false : true)} fluid selection options={[
                                { key: "1", text: "15 mins", value: 15 },
                                { key: "2", text: "20 mins", value: 20 },
                                { key: "3", text: "25 mins", value: 25 },
                                { key: "4", text: "30 mins", value: 30 },
                                { key: "5", text: "35 mins", value: 35 },
                                { key: "6", text: "40 mins", value: 40 },
                                { key: "7", text: "45 mins", value: 45 },
                                { key: "8", text: "50 mins", value: 50 },
                                { key: "9", text: "55 mins", value: 55 },
                                { key: "10", text: "60 mins", value: 60 }
                            ]}
                                scrolling search placeholder="Select other options first" onChange={(event, data) => setDataList({ ...dataList, lessonDuration: data.value })} />

                            <Label text="Day Start at" /><br />
                            <Dropdown fluid selection options={[
                                { key: "1", text: "8 am", value: 8 },
                                { key: "2", text: "9 am", value: 9 },
                                { key: "3", text: "10 am", value: 10 }
                            ]} scrolling search placeholder="Select starting hr" onChange={(event, data) => setDataList({ ...dataList, dayStart: data.value })} />

                            <FormButton text="Create" align="left" />
                        </Form>
                    </Container>
                </Modal>
            </Container>
        </Fragment>
    );


}

export default Schedule;