import React, { Fragment, useState } from "react";
import { Container, Form, Image, Input } from "semantic-ui-react";
import Admin from "../../assets/images/topbar/admin.png";
import Teacher from "../../assets/images/topbar/teacher.png";
import { Link, useHistory } from "react-router-dom";
import { FormButton } from "../shared";
import COLORS from "../color";
import Modal from "../layouts/modal"
import { apiCall } from "../../main/axios";
import { toast } from "react-toastify";

const HomePage = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    const login = () => {
        setOpen(false);
        apiCall("post", "/teacher/login",{email:email,password:password}).then((res) => {
            localStorage.setItem('teacherId',res.result.id )
            toast.success("Login Succesfully");
            history.push("/teacher");
          }).catch((err) => {
            toast.error(err);
          });
    };

    return (
        <Fragment>
            <div style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Link to="/admin">
                    <Image src={Admin}></Image>
                </Link>
                <Image src={Teacher} onClick={()=>setOpen(true)} />
                <Modal open={open} change={setOpen} title={"Login"}>
                    <Container style={{ margin: "auto", width: "90%"}}>
                        <Form onSubmit={login}>
                            <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Email</label><br/>
                            <Input style={{ width: "100%", marginTop: "5px" }} placeholder="Email" value={email} onChange={(event, data) => setEmail(data.value)} /><br/>
                            <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>Password</label><br/>
                            <Input style={{ width: "100%", marginTop: "5px" }} type="password" placeholder="Password" value={password} onChange={(event, data) => setPassword(data.value)} /><br/>
                            <FormButton />
                        </Form>
                    </Container>
                </Modal>
            </div>
        </Fragment>
    );
};

export default HomePage;
