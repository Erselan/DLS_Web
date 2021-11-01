import React, { Fragment, useEffect } from "react";
import { Image, Input, Dropdown } from "semantic-ui-react";
import Logo from "../../assets/images/icons/Logo.png";
import Profile from "../../assets/images/topbar/profile.png";
import COLORS from "../color";
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../../main/axios";
import { ADMIN_ACTIONS, TEACHER_ACTIONS } from "../../main/store/actions";

const Topbar = (props) => {
  // console.log(props.userType);
  let dispatcher = useDispatch();
  let isAdded = useSelector(state => state.admin.isAdded);

  const loadAdminData = () => {
    const promiseClasses = apiCall("get", "/class/getClasses");
    const promiseCourses = apiCall("get", "/course/getCourses");
    const promiseTeachers = apiCall("get", "/teacher/getTeachers");
    const promiseStudents = apiCall("get", "/student/getStudents");
    const promiseAdmins = apiCall("get", "/admin/getAdmins");
    const promiseCourseAssigning = apiCall("get", "/classCourse/getClassCourses")
    const promiseSchedules = apiCall("get", "/schedule/getSchedules")
    Promise.all([promiseClasses, promiseCourses, promiseTeachers, promiseStudents, promiseAdmins, promiseCourseAssigning, promiseSchedules]).then((responses) => {
      const data = {
        classes: responses[0].result,
        courses: responses[1].result,
        teachers: responses[2].result,
        students: responses[3].result,
        admins: responses[4].result,
        courseAssignings: responses[5].result,
        schedules: responses[6].result,
        isAdded: true
      }
      dispatcher({ type: ADMIN_ACTIONS.LOAD_DATA, payload: data });
    }).catch((error) => { console.log(error) });
  }

  const loadTeacherData = () => { 
    const promiseSchedules = apiCall("get", "/schedule/getMonthlyScheduleForTeacher?teacherId="+localStorage.getItem('teacherId'))
    const promiseResource = apiCall("get", "/resource/getResources")
    const promiseClasses = apiCall("get", "/class/getClasses");
    const promiseCourses = apiCall("get", "/course/getCourses");
    const promiseStudents = apiCall("get", "/student/getStudents");
    const promiseAssignments = apiCall("get", "/assignment/getAssignments");
    
    Promise.all([promiseSchedules,promiseResource,promiseClasses,promiseCourses,promiseStudents,promiseAssignments]).then((responses) => {
      const data = {
        schedules: responses[0].result,
        resources: responses[1].result,
        classes: responses[2].result,
        courses: responses[3].result,
        students: responses[4].result,
        assignments: responses[5].result,
        isAdded: true
      }
      dispatcher({ type: TEACHER_ACTIONS.LOAD_DATA, payload: data });
    }).catch((error) => { console.log(error) });
  }

  useEffect(() => {
    if (props.userType === "admin") {
      if (!isAdded) {
        loadAdminData();
      }
    } else if (props.userType === "teacher") {
      loadTeacherData();
    }
  });

  const isDesktop = useMediaQuery({ minWidth: 1020 });

  return <div style={NavBarStyle}>
    <div style={AlignCenterStyle}>
      <Image size="small" src={Logo} spaced />
    </div>
    {
      props.userType === "teacher" ? <Fragment>
        {
          isDesktop ? <div style={AlignCenterStyle}>
            <Input
              icon="search"
              size="mini"
              iconPosition="left"
              placeholder="Search here"
              style={{ width: "400px", height: "50px", marginRight: "15px" }}
            />
            <Dropdown placeholder="Everywhere" search selection clearable options={[]} compact style={{ width: "300px", height: "10px", }} />
          </div> : null
        }
        <div style={AlignCenterStyle}>
          <div>
            <Image size="mini" src={Profile} avatar />
            <Dropdown placeholder="Peter Parker" options={[]} compact style={{ height: "10px", }} />
          </div>
        </div>
      </Fragment> : <Fragment></Fragment>
    }

  </div>
};

const NavBarStyle = {
  width: "100vw",
  height: "80px",
  backgroundColor: COLORS.FOREGROUND,
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  paddingLeft: "15px",
  paddingRight: "15px",
  position: "fixed",
  top: "0",
  zIndex: "1",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
}

const AlignCenterStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "1.1rem"
}

export default Topbar;
