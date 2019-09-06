import React from 'react';
import ResponseTimer from './response_timer';

/********************************************* 
 * Re-factored as part of conversion to hooks
 * 
 * As part of this making StimulusDisplay the element that
 * App.js renders. StimulusDisplay in turn calls the ResponseTimer
 * and sets its initial randomized delay.
**********************************************/

function StimulusDisplay(props) {
  // wait a random interval, then start timer
  //const wait = 1000 * (2 + Math.floor(Math.random() * 8));  // milliseconds
  let wait = 1000 * (2 + Math.floor(Math.random() * (props.maxWait - 2)));  // milliseconds
  return(
    <div className="stimulus" >
      <ResponseTimer countBy={5} startDelay={wait} cb={props.cb} />
    </div>
  );
}


class OLD_StimulusDisplay extends React.Component {
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