import React from "react";
import { Button } from "semantic-ui-react";
import COLORS from "../color"
const FormButton = (props) => {
  return (
    <div style={{ width: "100%", textAlign: props.align || "right" }}>
      <Button
        type="submit"
        style={{
          backgroundColor: props.background || COLORS.MAIN,
          color: props.color || COLORS.BACKGROUND,
          marginTop: "20px", borderRadius: "10px", padding: "10px 40px 10px 40px", fontSize: "0.9rem",
        }}
        onClick={() => props.onClick?props.onClick(false):null}
      >
        {props.text || "Save"}
    </Button>
    </div>
  );
};

export { FormButton };
