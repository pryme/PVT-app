import React from 'react';
import Button from './button';

class TestFooter extends React.Component {
   constructor(props) {
       super(props);
   } 

   render() {
    if (this.props.testStage === "settings") {
        return(
            <div>
                <Button name="Done with Settings" 
                onClick={this.props.showSettingsCB}/>
            </div>
        );
    } else {
        return(
            <div>
                <Button name="Reset All" onClick={this.props.resetAllCB}/>
                <Button name="Settings" onClick={this.props.showSettingsCB}/>
            </div>
        );
    }
   }
}

export default TestFooter;