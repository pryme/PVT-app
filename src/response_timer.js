import React, {useState, useEffect, useRef} from 'react';

/************************************
 * Timer that waits props.delay ms, displaying an instruction prompt.
 * When delay expires, records a start time and displays a stimulus.
 * On mouse down, stops timing and calls props.callback.
 * If mouse down during initial delay returns -1.
*************************************/

function ResponseTimer(props) {
  const timeoutRef = useRef();  // so click handler can clear delay timer
  const startStop = useRef([]);  // TODO debug; array of start, stop times from Date.now
  const [timingStarted, setTimingStarted] = useState(false);
  
  // delay before showing stimulus
  useEffect(() => {
    const tid = setTimeout(() => {
      setTimingStarted(true);
      startStop.current = [Date.now().toString()];  // start of response time

    }, props.delay);
    timeoutRef.current = tid;
    return(() => {clearTimeout(tid);})  // cleanup
  }, [props.delay]); 

  function handleMouseDown() {
    clearTimeout(timeoutRef.current);  // in case delay still running (false start)
    let delta = -1;
    if (startStop.current.length > 0) {
      startStop.current = ((a) => [...a, Date.now().toString()])(startStop.current);  // add end of response interval
      delta = startStop.current[1] - startStop.current[0];  
    } 
    props.callback(delta);  // -1 means false start
    setTimingStarted(false);  // ready for new trial
    startStop.current = [];  // ready for new trial
  }
  const msg = <p>Stop the counter by clicking on it.</p>
  let p = <h1>_</h1>;  // TODO: can improve display with CSS
  if (timingStarted) p = <h1>Click!</h1>
  return (
    <>
    <div onMouseDown={handleMouseDown}>
      {p}
      {msg}
    </div>
    </>
  );
}

export default ResponseTimer;