import React from 'react';
import StimulusDisplay from './stimulus_display';

class ResponseTimer extends React.Component {
  // measures time to respond to a stimulus that appears after random wait
  constructor(props) {
    super(props);
    this.handleDisplayClick = this.handleDisplayClick.bind(this);
    this.state = {
      stimulusStart: null,  // when stimulus starts
      msElapsed: null,  // milliseconds
      clickEnabled: true  // whether displayClick is active or not
    };
  }
  
  componentDidMount() {
    // wait a random interval, then start ticking
    //const wait = 1000 * (2 + Math.floor(Math.random() * 8));  // milliseconds
    const wait = 1000 * (2 + Math.floor(Math.random() * (this.props.maxWait - 2)));  // milliseconds
    this.startID = setTimeout(
        () => this.start(), wait
      );
    //document.getElementById("debug").innerHTML = "initial wait";  // TODO temp
  }
  
  componentWillUnmount() {
    clearTimeout(this.startID);  // kill timer if running
    clearInterval(this.tickID);  // kill ticker
    clearTimeout(this.cleanID);  // kill cleanup timer
    this.props.cb(false, null);  // send ok to start signal
  }
  
  start() {  
    this.setState({
      stimulusStart: new Date()  // capture start time for stimulus
    });
    // start counting
    this.tickID = setInterval(
      () => this.tick(), 5  // arrow fn doesn't define new 'this' value
    );
    //document.getElementById("debug").innerHTML = "ticking";  // TODO temp
  }
  
  tick() {
    const maxRT = 2000;  // milliseconds; timeout if RT is bigger than this
    const d = new Date();
    const elapsed = d.getTime() - this.state.stimulusStart.getTime()
    this.setState({
      msElapsed: elapsed
    });
    if (elapsed > maxRT) {
      this.handleDisplayClick();
    }
  }
  
  handleDisplayClick() {
    clearInterval(this.tickID);  // stop ticking
    this.setState({clickEnabled: false});  // avoid double click issue
    this.cleanID = setTimeout(
      ( () => this.cleanUp() ), 1500
    );
  }
  
  cleanUp() {
    this.setState({clickEnabled: true});  // re-activate displayClick
    this.props.cb(true, this.state.msElapsed);  // send done signal and data
  }
  
  render() {
      return(<div id="response-timer">
             <StimulusDisplay msElapsed={this.state.msElapsed} 
               onClick={this.handleDisplayClick} >
             </StimulusDisplay>
             </div>
            ); 
  }
}

export default ResponseTimer;