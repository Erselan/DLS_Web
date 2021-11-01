import React, { Fragment, useState } from "react";
import { Button, Container, Table, Dropdown, Form } from "semantic-ui-react";
import COLORS from "./../../color";
import Modal from "./../../layouts/modal";
import { FormButton } from "../../shared";
import { apiCall } from "../../../main/axios";
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_ACTIONS } from "../../../main/store/actions";
import Utils from "./../../../utils/utils";

const Courses = () => {

  const dispatcher = useDispatch();
  const courses = useSelector(state => state.admin.courses);
  const [course, setCourse] = useState({});
  const [open, setOpen] = useState(false);
  const courseOptions = [
    { key: 1, text: "Biology", value: { name: "Biology", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/biology.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/biology.png" } },
    { key: 2, text: "English", value: { name: "English", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/english.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/english.png" } },
    { key: 3, text: "Finnish", value: { name: "Finnish", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/finnish.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/finnish.png" } },
    { key: 4, text: "Math", value: { name: "Math", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/maths.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/maths.png" } },
    { key: 5, text: "Music", value: { name: "Music", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/music.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/music.png" } },
    { key: 6, text: "Physics", value: { name: "Physics", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/physics.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/physics.png" } },
    { key: 7, text: "Sports", value: { name: "Sports", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/sports.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/sports.png" } },
    { key: 8, text: "Visual Art", value: { name: "Visual Art", image: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/visual_art.png" }, image: { avatar: true, src: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/subjects/visual_art.png" } },
  ]

  const onSubmit = () => {
    setOpen(false);
    apiCall("post", '/course/insertCourse', course).then((res) => {
      dispatcher({ type: ADMIN_ACTIONS.ADD_COURSE, payload: res.result });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Fragment>

      <Container
        style={{ margin: "auto", width: "40%", overflowY: "scroll", height: "73.5vh", paddingTop: "50px", }}>
        <Table celled selectable unstackable compact="very" size="small" style={{ fontSize: "1rem", color: COLORS.TEXT_PRIMARY }}        >
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>
                Image
              </Table.HeaderCell> */}
              <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}>
                Date
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              courses.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    {/* <Table.Cell textAlign="center" verticalAlign="middle"><Image src={item.image} size='mini' /></Table.Cell> */}
                    <Table.Cell textAlign="center" verticalAlign="middle">{item.name}</Table.Cell>
                    <Table.Cell textAlign="center" verticalAlign="middle">{Utils.FormatDate(item.createdAt)}</Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      </Container>

      <Container
        style={{ margin: "auto", width: "85%", textAlign: "right", padding: "15px 0px 15px 0px", }}      >
        <Button style={{ color: COLORS.BACKGROUND, backgroundColor: COLORS.MAIN, borderRadius: "50px", }} onClick={() => { setOpen(true); }}        >
          Add Course
        </Button>
        <Modal open={open} change={setOpen} title={"Add Course"}>
          <Container style={{ margin: "auto", width: "90%" }}>
            <Form onSubmit={onSubmit}>
              <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>
                Enter Course Name
              </label>
              <br></br>
              <Dropdown fluid selection options={courseOptions} search placeholder="Select Course" onChange={(event, data) => { setCourse(data.value); }}></Dropdown>
              <br></br>
              <FormButton />
            </Form>
          </Container>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Courses;
