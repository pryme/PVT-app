import React from 'react';
import Button from './button';

function TestFooter(props) {
  switch (props.testStage) {
    case "get_user":
      return null;
      break;
    case "header":
      return(
          <div>
              <Button name="Reset" onClick={props.resetAllCB}/>
              <Button name="Settings" onClick={props.showSettingsCB}/>
          </div>
      );
      break;
    case "ready":
      return(
          <div>
              <Button name="Reset" onClick={props.resetAllCB}/>
          </div>
      );
      break;
    case "running":
      return null;
      break;
    case "done":
      return(
          <div>
              <Button name="Reset" onClick={props.resetAllCB}/>
          </div>
      );
      break;
    case "settings":
      return(
          <div>
              <Button name="Done with Settings" 
              onClick={props.showSettingsCB}/>
          </div>
      );
      break;
    default:
      return null;
  }

}

export default TestFooter;