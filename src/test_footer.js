import React from 'react';
import Button from './button';

function TestFooter(props) {
  switch (props.appState) {
    case "getUser":
      return null;
      break;
    case "getTestInfo":
      return(
          <div>
              <Button name="Reset" onClick={props.resetAllCB}/>
              <Button name="Settings" onClick={props.showSettingsCB}/>
          </div>
      );
      break;
    case "doTest":
      return(
          <div>
              <Button name="Reset" onClick={props.resetAllCB}/>
          </div>
      );
      break;
    case "doReview":
      return(
          <div>
              <Button name="Reset" onClick={props.resetAllCB}/>
          </div>
      );
      break;
    case "doSettings":
      return(
          <div>
              <Button name="Done with Settings" 
              onClick={props.showSettingsCB}/>
          </div>
      );
    case "manageData":
      return (
        <div>
          <Button name="Reset" onClick={props.resetAllCB}/>
        </div>
      );
      break;
    default:
      return null;
  }
}

export default TestFooter;