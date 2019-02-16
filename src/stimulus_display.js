import React from 'react';

class StimulusDisplay extends React.Component {
  // shows the stimulus counter
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return(
           <div className="stimulus" onClick={this.props.onClick}>
           <span className="stimulus-text">{this.props.msElapsed}</span>
           </div> 
          ); 
  }
}

export default StimulusDisplay;