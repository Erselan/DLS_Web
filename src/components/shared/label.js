import React from "react";
import COLORS from "../color"
const Label = (props) => {
  return (
      <label style={{ color: COLORS.TEXT_PRIMARY, fontWeight: "bolder", marginBottom: "10px", }}>{props.text}</label>
  );
};

export { Label };