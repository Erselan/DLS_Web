import React, { Fragment, useEffect, useState } from "react";
import { Image, Header, Button, Container, Form, Table, Dropdown, Input } from "semantic-ui-react";
import COLORS from "../../../color";
import Modal from "../../../layouts/modal";
import { FormButton } from "../../../shared";
import { FormatDate } from "../../../../utils/utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_ACTIONS } from "../../../../main/store/actions";
import { apiCall } from "../../../../main/axios";
import { DateInput } from "semantic-ui-calendar-react";

const Students = () => {

  const dispatcher = useDispatch();
  let students = useSelector(state => state.admin.students);
  let newClasses = useSelector(state => state.admin.classes);

  const [student, setStudent] = useState({
    class: "",
    name: "",
    surname: "",
    email: "",
    dob: "",
    parent_one_name: "",
    parent_one_email: "",
    parent_one_surname: "",
    parent_one_phone: "",
    parent_two_name: "",
    parent_two_email: "",
    parent_two_surname: "",
    parent_two_phone: "",
    additionalInformation: ""
  });
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    setOpen(false);
    apiCall("post", "/student/insertStudent", { ...student, dob: new Date(student.dob) }).then((res) => {
      dispatcher({ type: ADMIN_ACTIONS.ADD_STUDENT, payload: res.result });
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    let alterClasses = newClasses.map((item, index) => {
      return { key: index, text: item.name + " (" + item.section + ")", value: item._id }
    });
    setClasses(alterClasses);
  }, [newClasses]);

  return (
    <Fragment>
      <Container style={{ padding: "5px" }}>
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", height: "70px", paddingLeft: "20px", width: "100%", alignItems: "center" }}>
          <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px", display: "flex" }}>
            <Link to="/admin/user">
              <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Student</button>
            </Link>
            <Link to="/admin/user/teacher">
              <button style={{ ...ButtonStyle }} >Teacher</button>
            </Link>
            <Link to="/admin/user/admin">
              <button style={{ ...ButtonStyle }} >Admin</button>
            </Link>
          </div>
        </div>
        <Container
          style={{
            margin: "auto",
            width: "95%",
            overflowY: "scroll",
            height: "65vh",
            paddingTop: "20px",
          }}
        >
          <Table
            celled
            selectable
            unstackable
            compact="very"
            size="small"
            style={{ fontSize: "1rem", color: COLORS.TEXT_PRIMARY }}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Student</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>DOB</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Password</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Guardian 1</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Guardian 2</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {students.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell verticalAlign="middle">
                      <Header as='h4' image>
                        <Image src={item.image} rounded size='mini' />
                        <Header.Content>
                          {item.name}
                          <Header.Subheader>{item.email}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell verticalAlign="middle">{FormatDate(item.dob)}</Table.Cell>
                    <Table.Cell textAlign="center">{item.isPasswordChanged ? "Password Changed" : item.password}</Table.Cell>
                    <Table.Cell verticalAlign="middle">
                      <Header as='h4' >
                        <Header.Content>
                          {item.parent_one_name}
                          <Header.Subheader>{item.parent_one_email}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell verticalAlign="middle">
                      <Header as='h4'>
                        <Header.Content>
                          {item.parent_two_email}
                          <Header.Subheader>{item.parent_two_email}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
        <Container style={{ margin: "auto", width: "85%", textAlign: "right", padding: "15px 0px 15px 0px", }}      >
          <Button style={{ color: COLORS.BACKGROUND, backgroundColor: COLORS.MAIN, borderRadius: "50px", }} onClick={() => { setOpen(true); }}        >
            Add Student
        </Button>
          <Modal open={open} change={setOpen} title={"Add Student"}>
            <Container style={{ margin: "auto", width: "90%" }}>
              <Form onSubmit={onSubmit}>
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}> Select Grade Enrolled</label><br />
                <Dropdown fluid selection options={classes} search placeholder="Select Section" onChange={(event, data) => { setStudent({ ...student, class: data.value }); }} ></Dropdown><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Enter Name</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Name" onChange={(event, data) => { setStudent({ ...student, name: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Enter Surname</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Surname" onChange={(event, data) => { setStudent({ ...student, surname: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Email</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Email" onChange={(event, data) => { setStudent({ ...student, email: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Date of Birth</label><br />
                <DateInput name="date" placeholder="Date" value={student.dob} iconPosition="left" onChange={(event, data) => { setStudent({ ...student, dob: data.value }); }} />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 1 Name</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 1 Name" onChange={(event, data) => { setStudent({ ...student, parent_one_name: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 1 Surname</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 1 Surname" onChange={(event, data) => { setStudent({ ...student, parent_one_surname: data.value }); }} /><br />

                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 1 Email</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 1 Email" onChange={(event, data) => { setStudent({ ...student, parent_one_email: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 1 Phone Number</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 1 Phone Number" onChange={(event, data) => { setStudent({ ...student, parent_one_phone: data.value }); }} /><br />

                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 2 Name</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 2 Name" onChange={(event, data) => { setStudent({ ...student, parent_two_name: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 2 Surname</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 2 Surname" onChange={(event, data) => { setStudent({ ...student, parent_two_surname: data.value }); }} /><br />


                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 2 Email</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 2 Email" onChange={(event, data) => { setStudent({ ...student, parent_two_email: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Parent 2 Phone Number</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Parent 2 Phone Number" onChange={(event, data) => { setStudent({ ...student, parent_two_phone: data.value }); }} /><br />

                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Additional Info</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Additional Info" onChange={(event, data) => { setStudent({ ...student, additionalInformation: data.value }); }} /><br />

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

export default Students;
