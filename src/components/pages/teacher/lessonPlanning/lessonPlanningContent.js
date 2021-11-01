import React, { Fragment } from "react";
import { Route, Switch } from "react-router";
import { Checkbox, Grid, Image } from "semantic-ui-react";
import Avatar from "../../../../assets/images/icons/robotAvatar.png"
import color from "../../../color";
import UploadFile from "./uploadFile";
import SelectFile from "./selectFile";
import Authenticator from "../../../../main/auth";

const Content = () => {
    return (
        <Fragment>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <div style={{display: "flex",flexDirection: "column", padding: "30px 20px",background: color.FOREGROUND,borderRadius: "20px"}}>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <label style={{fontSize:"17px",fontWeight:"bold",lineHeight:"25px",color:color.TEXT_PRIMARY}}>Class 1C</label>
                                <Checkbox />
                            </div>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding: "8px 16px",
                                        background: color.FOREGROUND,boxShadow: "0px 3.17797px 6.35593px #E1E4ED",borderRadius: "6px",marginBottom:"1rem"}}>
                                <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
                                    <Image src={Avatar} width={30}></Image>
                                    <label style={{marginLeft:"1rem",fontSize:"11px",fontWeight:"bold",lineHeight:"25px",color:color.TEXT_PRIMARY}}>Class 1C</label>
                                </div>
                                <Checkbox />
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Switch>
                            <Route exact path="/teacher/lessonPlanning/content" component={Authenticator(UploadFile, "teacher")} />
                            <Route exact path="/teacher/lessonPlanning/content/select" component={Authenticator(SelectFile, "teacher")} />\
                            <Route><Fragment>
                                <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {404}
                                </div>
                            </Fragment></Route>
                        </Switch>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    );
};

export default Content;
