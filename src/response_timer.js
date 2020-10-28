import React, { useState, useEffect, useRef } from 'react';
// following is not needed TODO 
//import StimulusDisplay from './stimulus_display';

/***************************************************
 * Refactoring this into a functional component using hooks.
 * 
 * Simple up-counter with:
 *    * count increment is parametric number of ms
 *    * output value is ms
 *    * starts at 0
 *    * starts automatically after parametric delay after render
 **************************************************/

function ResponseTimer(props) {
  const [total, setTotal] = useState(null);  // ms
  const [increment, setIncrement] = useState(null);  // ms
  const savedCallback = useRef();
  const startStop = useRef([]);  // temp for debug; array of start, stop Unix times (ms)

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
      startStop.current = ((a) => [...a, Date.now().toString()])(startStop.current);  // debug TODO
      return(
        () => {
          clearInterval(id);  // clean up tick
          props.cb(false, null);  // allow new timer to launch
        }
      ) 
    }
  }, [increment]);

  useEffect(() => {
    if (increment === null) {
      let tid = setTimeout(() => {
        setIncrement(props.countBy);
      }, props.startDelay);
      return () => clearTimeout(tid);
    }
  });

  function handleStop() {
    setIncrement(null);
    props.cb(true, total);  // sent done signal and data
  }

  function handleStart() {
    setTimeout(() => setIncrement(props.countBy), props.startDelay);
  }

  function handleClick() {
    props.cb(true, total);  // sent done signal and data
    if (increment !== null) {
      setIncrement(null);  // reset after valid response
      startStop.current = ((a) => [...a, Date.now().toString()])(startStop.current);  // debug TODO
      console.log(startStop.current[1] - startStop.current[0]);  // stop time; debug TODO
      
    } else {
      props.cb(false, null);  // allow new timer to launch
    }
  }

  const msg = 
     <p style={{fontSize: "20px"}} className="stimulus-text">Stop the counter by clicking in the rectangle</p>
  if (total === null) {
    return (
      <div id="response-timer"  onClick={handleClick}>
       <h1 className="stimulus-text-hidden">0</h1>
       {msg}
      </div>
    );
  } else {
    return (
      <div id="response-timer" onClick={handleClick}>
       <h1>{total}</h1>
       {msg}
      </div>
    );
  }
}

export default ResponseTimer;