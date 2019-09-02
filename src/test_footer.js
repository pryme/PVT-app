import React from 'react';
import Button from './button';

class TestFooter extends React.Component {
   constructor(props) {
       super(props);
   } 

   render() {
    switch (this.props.testStage) {
      case "get_user":
        return null;
        break;
      case "header":
        return(
            <div>
                <Button name="Reset" onClick={this.props.resetAllCB}/>
                <Button name="Settings" onClick={this.props.showSettingsCB}/>
            </div>
        );
        break;
      case "ready":
        return(
            <div>
                <Button name="Reset" onClick={this.props.resetAllCB}/>
            </div>
        );
        break;
      case "running":
        return null;
        break;
      case "done":
        return(
            <div>
                <Button name="Reset" onClick={this.props.resetAllCB}/>
            </div>
        );
        break;
      case "settings":
        return(
            <div>
                <Button name="Done with Settings" 
                onClick={this.props.showSettingsCB}/>
            </div>
        );
        break;
      default:
        return null;
    }
   }
}

export default TestFooter;