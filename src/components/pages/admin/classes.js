import React, { Fragment, useState } from "react";
import { Button, Container, Form, Table, Dropdown } from "semantic-ui-react";
import COLORS from "./../../color";
import Modal from "./../../layouts/modal";
import { FormButton } from "../../shared";
import { apiCall } from "../../../main/axios";
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_ACTIONS } from "../../../main/store/actions";
import Utils from "./../../../utils/utils";

const Classes = () => {

  const dispatcher = useDispatch();
  const classes = useSelector(state => state.admin.classes);

  const [classname, setClassname] = useState("");
  const [section, setSection] = useState("");
  const [open, setOpen] = useState(false);

  const classesOptions = [
    { key: 1, text: "1 - Grade One", value: 1 },
    { key: 2, text: "2 - Grade Two", value: 2 },
    { key: 3, text: "3 - Grade Three", value: 3 },
    { key: 4, text: "4 - Grade Four", value: 4 },
    { key: 5, text: "5 - Grade Five", value: 5 },
    { key: 6, text: "6 - Grade Six", value: 6 },
    { key: 7, text: "7 - Grade Seven", value: 7 },
    { key: 8, text: "8 - Grade Eight", value: 8 },
    { key: 9, text: "9 - Grade Nine", value: 9 },
    { key: 10, text: "10 - Grade Ten", value: 10 },
  ];

  const sectionOptions = [
    { key: 1, text: "1 - Section A", value: "A" },
    { key: 2, text: "2 - Section B", value: "B" },
    { key: 3, text: "3 - Section C", value: "C" },
    { key: 4, text: "4 - Section D", value: "D" },
    { key: 2, text: "5 - Section E", value: "E" },
    { key: 3, text: "6 - Section D", value: "F" },
    { key: 4, text: "7 - Section G", value: "G" },
    { key: 4, text: "8 - Section H", value: "H" },
  ];

  const onSubmit = () => {
    setOpen(false);
    apiCall("post", "/class/insertClass", { name: classname, section: section }).then((res) => {
      dispatcher({ type: ADMIN_ACTIONS.ADD_CLASS, payload: res.result });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Fragment>
      <Container style={{ margin: "auto", width: "50%", overflowY: "scroll", height: "73.5vh", paddingTop: "50px", }}      >
        <Table celled selectable unstackable compact="very" size="small" style={{ fontSize: "1rem", color: COLORS.TEXT_PRIMARY }}        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}              >
                Class
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}              >
                Section
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}              >
                Date
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              classes.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell textAlign="center">{item.name}</Table.Cell>
                    <Table.Cell textAlign="center">{item.section}</Table.Cell>
                    <Table.Cell textAlign="center">{Utils.FormatDate(item.createdAt)}</Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      </Container>

      <Container style={{ margin: "auto", width: "85%", textAlign: "right", padding: "15px 0px 15px 0px", }}>
        <Button style={{ color: COLORS.BACKGROUND, backgroundColor: COLORS.MAIN, borderRadius: "50px", }} onClick={() => { setOpen(true); }}>
          Add Class
        </Button>
        <Modal open={open} change={setOpen} title={"Add Class"}>
          <Form onSubmit={onSubmit} >
            <Container style={{ margin: "auto", width: "90%" }}>
              <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>
                Enter Class Name
              </label>
              <br></br>
              <Dropdown fluid selection options={classesOptions} search placeholder="Select Class" onChange={(event, data) => { setClassname(data.value); }} ></Dropdown>
              {/* <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Enter Class Name" onChange={(event, data) => setClassname(data.value)} /> */}
              <br></br>
              <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>                Select Section
              </label>
              <br></br>
              <Dropdown fluid selection options={sectionOptions} search placeholder="Select Section" onChange={(event, data) => { setSection(data.value); }} ></Dropdown>
              {/* <Input style={{ width: "100%", marginTop: "5px", marginBottom: "10px" }} placeholder="Enter Section Name" onChange={(event, data) => setSection(data.value)} /> */}
              <br></br>
            </Container>
            <Container style={{ margin: "auto", width: "90%" }}>
              <FormButton />
            </Container>
          </Form>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Classes;
