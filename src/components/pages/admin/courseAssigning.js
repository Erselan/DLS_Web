import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Table, Dropdown, Form, Image, Grid, Header } from "semantic-ui-react";
import COLORS from "../../color";
import Modal from "../../layouts/modal";
import { FormButton } from "../../shared";
import { apiCall } from "../../../main/axios";
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_ACTIONS } from "../../../main/store/actions";
import UploadIcon from "../../../assets/images/icons/upload.png"
import UploadedIcon from "../../../assets/images/icons/file.png"
import Close from "../../../assets/images/icons/closeRed.png"
import { toast } from "react-toastify";
import { UploadFile } from "../../../utils/utils";

const CourseAssigning = () => {

  const dispatcher = useDispatch();
  const courseAssignings = useSelector(state => state.admin.courseAssignings);
  const courses = useSelector(state => state.admin.courses);
  const classes = useSelector(state => state.admin.classes);

  const [classname, setClassname] = useState("");
  const [course, setCourse] = useState("");
  const [filedata, setFiledata] = useState(null);
  const [open, setOpen] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    createOptions(classes, courses);
  }, [classes, courses]);

  const onFileChange = (event) => {
    if (event.target.files.length !== 0 && event.target.files[0].type === "application/pdf") {
      setFiledata(event.target.files[0]);
    } else {
      toast.error("Please select a pdf file !")
    }
  };

  const onSubmit = async() => {
    let officialBook;
    if (filedata){
      setOpen(false);
      await UploadFile(filedata).then((data) => {
        toast.success("File uploaded successfully!")
        // console.log(data)
        officialBook = {filename:filedata.name,fileLocation:data}
      })
      apiCall("post", "/classCourse/insertCourseAssigning", { class: classname, course: course, officialBook:officialBook, teacherBook:officialBook}).then((res) => {
        dispatcher({ type: ADMIN_ACTIONS.ADD_COURSE_ASSIGNINGS, payload: res.result });
      }).catch((err) => {
        console.log(err);
      });
    }
    else {
      toast.error("Please select books !")
    }
  };

  const createOptions = (classes, courses) => {
    let myclassOptions = [];
    let mycourseOptions = [];

    classes.map((item) => {
      return myclassOptions.push({ key: item._id, text: item.name + " (" + item.section + ")", value: item._id, });
    });
    courses.map((item) => {
      return mycourseOptions.push({ key: item._id, text: item.name, value: item._id, });
    });

    setClassOptions(myclassOptions)
    setCourseOptions(mycourseOptions)
  };


  return (
    <Fragment>
      <Container style={{ margin: "auto", width: "85%", overflowY: "scroll", height: "73.5vh", paddingTop: "50px", }}      >
        <Table celled selectable unstackable compact="very" size="small" style={{ fontSize: "1rem", color: COLORS.TEXT_PRIMARY }}        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}             >
                Class
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" style={{ color: COLORS.TEXT_PRIMARY }}              >
                Course
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              courseAssignings.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell textAlign="center">
                      {item.class.name + " (" + item.class.section + ")"}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.course.name}
                    </Table.Cell>
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
          Assign Course
        </Button>
        <Modal open={open} change={setOpen} title={"Assign Course to Class"}>
          <Container style={{ margin: "auto", width: "90%" }}>
            <Form onSubmit={onSubmit}>
              <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                Select Class
              </label>
              <br></br>
              <Dropdown fluid selection options={classOptions} search placeholder="Select Class" onChange={(event, data) => { setClassname(data.value); }} />
              <br></br>
              <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                Select Course
              </label>
              <br></br>
              <Dropdown fluid selection options={courseOptions} search placeholder="Select Course" onChange={(event, data) => { setCourse(data.value); }} />
              <br></br>
              <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                Official Book
              </label><br/>
              <input type='file' id="officialBook" name='officialBook' accept="application/pdf" onChange={onFileChange} style={{ display: "none" }} />
              {
                filedata === null ?
                  <label htmlFor="officialBook"><Image src={UploadIcon} width={250} /></label>
                  :
                  <Container>
                    <Image src={Close} width={25} style={{ marginLeft: "99%" }} onClick={() => setFiledata(null)} />
                    <Grid style={{ border: "1px solid #5E81F4", boxSizing: "border-box", borderRadius: "14px" }}>
                      <Grid.Column width={3} verticalAlign="middle">
                        <Image src={UploadedIcon} />
                      </Grid.Column>
                      <Grid.Column width={13} verticalAlign="middle" >
                        <Header as='h3' style={{ marginBottom: "1px", color: COLORS.TEXT_PRIMARY }}>{filedata.name}</Header>
                        <Header as='h4' style={{ marginTop: "0", color: COLORS.MAIN }}>{filedata.size / 1000} KB</Header>
                      </Grid.Column>
                    </Grid>
                  </Container>
              }
              <br></br>
              <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                Notebook
              </label><br/>
              <input type='file' id="notebook" name='notebook' accept="application/pdf" onChange={onFileChange} style={{ display: "none" }} />
              {
                filedata === null ?
                  <label htmlFor="notebook" style={{textAlign:"center"}}><Image src={UploadIcon} width={250}/></label>
                  :
                  <Container>
                    <Image src={Close} width={25} style={{ marginLeft: "99%" }} onClick={() => setFiledata(null)} />
                    <Grid style={{ border: "1px solid #5E81F4", boxSizing: "border-box", borderRadius: "14px" }}>
                      <Grid.Column width={3} verticalAlign="middle">
                        <Image src={UploadedIcon} />
                      </Grid.Column>
                      <Grid.Column width={13} verticalAlign="middle" >
                        <Header as='h3' style={{ marginBottom: "1px", color: COLORS.TEXT_PRIMARY }}>{filedata.name}</Header>
                        <Header as='h4' style={{ marginTop: "0", color: COLORS.MAIN }}>{filedata.size / 1000} KB</Header>
                      </Grid.Column>
                    </Grid>
                  </Container>
              }
              <br></br>
              {/* <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}              >
                Teacher Book
              </label>
              <input type='file' name='File' onChange={UploadFile}/> 
              <br></br> */}
              <FormButton />
            </Form>
          </Container>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default CourseAssigning;