import React, { Fragment, useState } from "react";
import { Header, Button, Container, Form, Table, Input } from "semantic-ui-react";
import COLORS from "../../../color";
import Modal from "../../../layouts/modal";
import { FormButton } from "../../../shared";
import { FormatDate } from "../../../../utils/utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_ACTIONS } from "../../../../main/store/actions";
import { DateInput } from "semantic-ui-calendar-react";
import { apiCall } from "../../../../main/axios";

const Admin = () => {

  const dispatcher = useDispatch();
  let admins = useSelector(state => state.admin.admins);

  const [admin, setAdmin] = useState(
    {
      name: "",
      surname: "",
      email: "",
      dob: "",
      additionalInformation: ""
    });
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    setOpen(false);
    apiCall("post", "/admin/insertAdmin", { ...admin, dob: new Date(admin.dob) }).then((res) => {
      dispatcher({ type: ADMIN_ACTIONS.ADD_ADMIN, payload: res.result });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Fragment>
      <Container style={{ padding: "5px" }}>
        <div style={{ display: "flex", flexFlow: "row wrap", height: "70px", paddingLeft: "20px", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <div style={{ backgroundColor: "#EBECF2", borderRadius: "14px", display: "flex" }}>
            <Link to="/admin/user">
              <button style={{ ...ButtonStyle }} >Student</button>
            </Link>
            <Link to="/admin/user/teacher">
              <button style={{ ...ButtonStyle }} >Teacher</button>
            </Link>
            <Link to="/admin/user/admin">
              <button style={{ ...ButtonStyle, backgroundColor: COLORS.FOREGROUND, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Admin</button>
            </Link>
          </div>
        </div>
        <Container
          style={{
            margin: "auto",
            width: "85%",
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
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Admin</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>Password</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>DOB</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {admins.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell verticalAlign="middle">
                      <Header as='h4' >
                        <Header.Content>
                          {item.name}
                          <Header.Subheader>{item.email}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
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
            Add Admin
        </Button>
          <Modal open={open} change={setOpen} title={"Add Admin"}>
            <Container style={{ margin: "auto", width: "90%" }}>
              <Form onSubmit={onSubmit}>
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Enter Name</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Name" onChange={(event, data) => { setAdmin({ ...admin, name: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Enter Surname</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Surname" onChange={(event, data) => { setAdmin({ ...admin, surname: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Email</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Email" onChange={(event, data) => { setAdmin({ ...admin, email: data.value }); }} /><br />
                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Date of Birth</label><br />
                <DateInput name="date" placeholder="Date" value={admin.dob} iconPosition="left" onChange={(event, data) => { setAdmin({ ...admin, dob: data.value }); }} />


                <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginTop: "5px", marginBottom: "10px", }}>Enter Additional Info</label><br />
                <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Additional Info" onChange={(event, data) => { setAdmin({ ...admin, additionalInformation: data.value }); }} /><br />

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

export default Admin;
