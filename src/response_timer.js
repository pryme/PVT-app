import React, { useState, useEffect, useRef } from 'react';
// following is not needed TODO 
import StimulusDisplay from './stimulus_display';

/***************************************************
 * Refactoring this into a functional component using hooks.
 * 
 * Simple up-counter with:
 *    * count increment is parametric number of ms
 *    * output value is ms
 *    * starts at 0
 *    * starts automatically after parametric delay after render
 *    * can be stopped by clicking on associated button
 **************************************************/

function ResponseTimer(props) {
  const [total, setTotal] = useState(null);  // ms
  const [increment, setIncrement] = useState(null);  // ms
  const savedCallback = useRef();

  useEffect(() => {
    //savedCallback.current = callback;
    savedCallback.current = () => setTotal(total + increment);
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (increment !== null) {
      let id = setInterval(tick, increment);
      return () => clearInterval(id);
    }
  }, [increment]);

  useEffect(() => {
    if (increment === null) {
      let tid = setTimeout(() => {
        setIncrement(props.countBy);
      }, props.startDelay);
    }
  });

  function handleStop() {
    setIncrement(null);
    props.cb(true, total);  // sent done signal and data
  }

  function handleStart() {
    setTimeout(() => setIncrement(props.countBy), props.startDelay);
  }

  function handleReset() {
    setTotal(0);
    setIncrement(null);
  }

  if (total === null) {
    return (
      <div id="response-timer" className="stimulus-text-hidden" >
       <h1>0</h1>
       <button onClick={handleStop}>Stop</button>
      </div>
    );
  } else {
    return (
      <div id="response-timer">
       <h1>{total}</h1>
       <button onClick={handleStop}>Stop</button>
      </div>
    );
  }
}

class OLD_ResponseTimer extends React.Component {
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