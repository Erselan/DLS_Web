import React, { Fragment, useState } from "react";
import { Header, Image, Button, Container, Table, Input, Form, Dropdown } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import COLORS from "../../../color";
import Modal from "../../../layouts/modal";
import { FormButton } from "../../../shared";
import { apiCall } from "../../../../main/axios";
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_ACTIONS } from "../../../../main/store/actions";
import { Link } from "react-router-dom";
import { FormatDate } from "./../../../../utils/utils";

const Teachers = () => {

  const dispatcher = useDispatch();
  let teachers = useSelector(state => state.admin.teachers);

  const [teacher, setTeacher] = useState(
    {
      name: "",
      surname: "",
      email: "",
      dob: "",
      subject: "",
      additionalInformation: "",
      hoursAvailible: { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, }
    }
  );
  const [open, setOpen] = useState(false);


  const onSubmit = () => {
    setOpen(false);
    apiCall("post", "/teacher/insertTeacher", { ...teacher, dob: new Date(teacher.dob) }).then((res) => {
      dispatcher({ type: ADMIN_ACTIONS.ADD_TEACHER, payload: res.result });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Fragment>
      <Container style={{ padding: "5px" }}>
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", width: "100%", alignItems: "center", height: "70px", paddingLeft: "20px" }}>
          <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px", display: "flex" }}>
            <Link to="/admin/user">
              <button style={{ ...ButtonStyle }} >Student</button>
            </Link>
            <Link to="/admin/user/teacher">
              <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Teacher</button>
            </Link>
            <Link to="/admin/user/admin">
              <button style={{ ...ButtonStyle }} >Admin</button>
            </Link>
          </div>
        </div>
        <Container style={{ margin: "auto", width: "85%", overflowY: "scroll", height: "65vh", paddingTop: "20px", }}>
          <Table celled padded selectable unstackable compact="very" size="small" style={{ fontSize: "1rem", color: COLORS.TEXT_PRIMARY }}        >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Teacher</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Email</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Password</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Date of Birth</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {teachers.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell verticalAlign="middle">
                      <Header as='h4' image>
                        <Image src={item.image} rounded size='mini' />
                        <Header.Content>
                          {item.name}
                          <Header.Subheader>{item.subject}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center" verticalAlign="middle">{item.email}</Table.Cell>
                    <Table.Cell textAlign="center" verticalAlign="middle">{item.isPasswordChanged ? "Password Changed" : item.password}</Table.Cell>
                    <Table.Cell textAlign="center" verticalAlign="middle">{FormatDate(item.dob)}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>

        <Container style={{ margin: "auto", width: "85%", textAlign: "right", padding: "15px 0px 15px 0px", }}      >
          <Button style={{ color: COLORS.BACKGROUND, backgroundColor: COLORS.MAIN, borderRadius: "50px", }} onClick={() => { setOpen(true); }}        >
            Add Teacher
        </Button>
          <Modal open={open} change={setOpen} title={"Add Teacher"}>
            <Container style={{ margin: "auto", width: "90%" }}>
              <Form onSubmit={onSubmit}>
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Enter Name</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Name" onChange={(event, data) => { setTeacher({ ...teacher, name: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Enter Surname</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Surname" onChange={(event, data) => { setTeacher({ ...teacher, surname: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Email</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Email" onChange={(event, data) => { setTeacher({ ...teacher, email: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Date of Birth</label><br />
                <DateInput name="date" placeholder="Date" value={teacher.dob} iconPosition="left" onChange={(event, data) => { setTeacher({ ...teacher, dob: data.value }); }} />
                {/* <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Date of Birth" onChange={(event, data) => { setTeacher({ ...teacher, dob: data.value }); }} /><br /> */}
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Subject</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Subject" onChange={(event, data) => { setTeacher({ ...teacher, subject: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Additional Info</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Additional Info" onChange={(event, data) => { setTeacher({ ...teacher, additionalInformation: data.value }); }} /><br /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Hours available work Schedule</label><br />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <div>
                    <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Mon</label><br />
                    <Dropdown fluid selection options={[{ key: "1", text: "1", value: "1" }, { key: "2", text: "2", value: "2" }, { key: "3", text: "3", value: "3" }, { key: "4", text: "4", value: "4" }, { key: "5", text: "5", value: "5" }, { key: "6", text: "6", value: "6" }]} scrolling search placeholder="hr" onChange={(event, data) => { setTeacher({ ...teacher, hoursAvailible: { ...teacher.hoursAvailible, monday: data.value } }); }} /><br />
                  </div>
                  <div>
                    <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Tue</label><br />
                    <Dropdown fluid selection options={[{ key: "1", text: "1", value: "1" }, { key: "2", text: "2", value: "2" }, { key: "3", text: "3", value: "3" }, { key: "4", text: "4", value: "4" }, { key: "5", text: "5", value: "5" }, { key: "6", text: "6", value: "6" }]} scrolling search placeholder="hr" onChange={(event, data) => { setTeacher({ ...teacher, hoursAvailible: { ...teacher.hoursAvailible, tuesday: data.value } }); }} /><br />
                  </div>
                  <div>
                    <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Wed</label><br />
                    <Dropdown fluid selection options={[{ key: "1", text: "1", value: "1" }, { key: "2", text: "2", value: "2" }, { key: "3", text: "3", value: "3" }, { key: "4", text: "4", value: "4" }, { key: "5", text: "5", value: "5" }, { key: "6", text: "6", value: "6" }]} scrolling search placeholder="hr" onChange={(event, data) => { setTeacher({ ...teacher, hoursAvailible: { ...teacher.hoursAvailible, wednesday: data.value } }); }} /><br />
                  </div>
                  <div>
                    <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Thu</label><br />
                    <Dropdown fluid selection options={[{ key: "1", text: "1", value: "1" }, { key: "2", text: "2", value: "2" }, { key: "3", text: "3", value: "3" }, { key: "4", text: "4", value: "4" }, { key: "5", text: "5", value: "5" }, { key: "6", text: "6", value: "6" }]} scrolling search placeholder="hr" onChange={(event, data) => { setTeacher({ ...teacher, hoursAvailible: { ...teacher.hoursAvailible, thursday: data.value } }); }} /><br />
                  </div>
                  <div>
                    <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Fri</label><br />
                    <Dropdown fluid selection options={[{ key: "1", text: "1", value: "1" }, { key: "2", text: "2", value: "2" }, { key: "3", text: "3", value: "3" }, { key: "4", text: "4", value: "4" }, { key: "5", text: "5", value: "5" }, { key: "6", text: "6", value: "6" }]} scrolling search placeholder="hr" onChange={(event, data) => { setTeacher({ ...teacher, hoursAvailible: { ...teacher.hoursAvailible, friday: data.value } }); }} /><br />
                  </div>
                </div>
                <FormButton />
              </Form>
            </Container>
          </Modal>
        </Container>
      </Container>
    </Fragment>
  );
};

const ButtonStyle = {
  color: COLORS.TEXT_PRIMARY,
  backgroundColor: "#EBECF2",
  borderRadius: "14px",
  fontSize: "0.8rem",
  border: "none",
  fontWeight: "bolder",
  padding: "12px 20px 12px 20px",
  outline: "none"
}

export default Teachers;
