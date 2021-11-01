import React, { useEffect, useRef, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import { Button, Dropdown, Form, Grid, TextArea } from 'semantic-ui-react';
import COLORS from '../../../color';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { apiCall } from '../../../../main/axios';
import { UploadFile } from '../../../../utils/utils';
import { TEACHER_ACTIONS } from '../../../../main/store/actions';
import { useDispatch } from 'react-redux';

const StartGrading = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatcher = useDispatch();
    const [grade,setGrade]= useState("");
    const [feedback,setFeedback]= useState("");
    const [file,setFile]= useState("");
    const viewer = useRef(null);
    const [instance, setInstance] = useState(null);
  
    useEffect(() => {
      // console.log(location.assignment)
      WebViewer(
        {
          path: '/webviewer',
          // initialDoc: "https://deeplearningsystem.s3.us-east-2.amazonaws.com/books/sample.pdf",
          initialDoc: location.assignment.file,
          loadAsPDF: true,
        },
        viewer.current,
      ).then(instance => {
            setInstance(instance)
      });
    }, []);
  
    useEffect(() => {
      if(instance){
        instance.setHeaderItems(header => {
          header.push({
            type: 'actionButton',
            img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
            onClick: () => {
              const { docViewer } = instance;
              const doc = docViewer.getDocument();
              
              doc.getFileData().then(function(data) {
                var arr = new Uint8Array(data);
                var blob = new Blob([arr], {
                    type: 'application/pdf'
                });
                
                setFile(blob);
              
              });
              
            }
          });
        })
      }
    },[instance])

    const Submit = async() => {

      if (file){
        console.log(file)
        console.log(grade,feedback)
        let filedata;
        await UploadFile(file).then((data)=>{
          toast.success("File uploaded successfully!")
          filedata= data;
        })
        apiCall("put", "/assignment/gradeAssignment", { assignmentId:location.assignment.id,studentId:location.assignment.student,file:filedata,feedback:feedback,grade:grade}).then((data) => {
          apiCall("get", "/assignment/getAssignments").then((res) => {
              dispatcher({ type: TEACHER_ACTIONS.REPLACE_ASSIGNMENTS, payload: res.result });
              history.push("/teacher/assigments/management");
            }).catch((err) => {
              console.log(err);
            });
          console.log(data)
        }).catch((err) => {
          toast.error("An Error Occured!")
          console.log(err);
        });
      }else {
        toast.error("Please save file first");
      }
    }

    return ( 
        <Grid columns={2} style={{marginTop:"1em"}}>
            <Grid.Column width={9}>
            <div className="webviewer" ref={viewer} style={{height: "75vh"}}></div>
            </Grid.Column>
            <Grid.Column width={1}><div style={LineStyle}></div></Grid.Column>
            <Grid.Column width={6}>
                <header as="h3" style={{color: COLORS.TEXT_PRIMARY,marginBottom:"1em",}}>Give point</header>
                <Form onSubmit={Submit}>
                    <header as="h4">Point</header><br/>
                    <Dropdown fluid selection options={[{key: '10',text: '10',value: '10'},{key: '20',text: '20',value: '20'},{key: '30',text: '30',value: '30'},{key: '30',text: '30',value: '30'}]} scrolling search placeholder="Select Class" onChange={(event, data) => { setGrade(data.value); }} /><br/>
                    <label style={{ color: COLORS.TEXT_PRIMARY, marginBottom: "10px", }}>Add Feedback</label><br/>
                            <TextArea placeholder='Input' value={feedback} onChange={(event, data) => setFeedback(data.value)}/>
                            <br></br>
                            <Button style={{backgroundColor: COLORS.TEXT_SECONDARY,color: COLORS.BACKGROUND,marginTop: "20px", borderRadius: "12px", 
                            padding: "10px 40px 10px 40px", fontSize: "0.9rem",}} >Save</Button>
                </Form>
            </Grid.Column>
        </Grid>
        );
}

const LineStyle = {
    borderLeft: "2px solid" + COLORS.TEXT_SECONDARY,
    borderColor:COLORS.TEXT_SECONDARY,
    height: "100%",
}

export default StartGrading;