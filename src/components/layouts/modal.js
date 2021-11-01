import React, { Fragment } from "react";
import { Container, Modal, Image } from "semantic-ui-react";
import COLORS from "./../color";
import CrossImage from "./../../assets/images/icons/close.png";

const MyModal = (props) => {
  return (
    <Fragment>
      <Modal size="tiny" open={props.open} style={{ height: "90vh" }}>
        <Modal.Content scrolling style={{maxHeight: "85vh"}}>
          <Container>
            <Image style={{ position: "absolute", right: "20px", top: "20px" }} width={25} onClick={() => { props.change(false); }} src={CrossImage} />
            <Container style={{ margin: "auto", width: "90%" }}>
              <p style={{ fontSize: "1.4rem", fontWeight: "bolder", color: COLORS.TEXT_PRIMARY, marginBottom: "15px", marginTop: "10px", }}              >
                {props.title}
              </p>
            </Container>
            {props.children}
          </Container>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};
export default MyModal;
