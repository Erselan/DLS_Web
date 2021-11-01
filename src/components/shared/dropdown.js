import React from "react";
import { Dropdown } from 'semantic-ui-react';

const Dropdown = (props) => {
  return (
    <Dropdown fluid selection options={[{key:"0",text:"0",value:"0"},{key:"1",text:"1",value:"1"}]} scrolling search placeholder="hr" onChange={(event, data) => { setWorkHour({...workHour,monday:data.value}); }} />
  );
};

export { Dropdown };
