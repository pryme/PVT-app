import React, { useState, useEffect, useRef } from 'react';
import ResponseTimer from './response_timer';

/*************************************************
 * Repeats response time trials for a given duration.
 * Includes the "start test" and "stop test" buttons.
 * States are:
 *   - ready to start test period
 *   - RT started: RT trial underway
 *   - RT finished: RT measurement concluded
 *   - done with test period: show 'test completed' for now
 * Actions (events) are:
 *   - start test (start button click)
 *   - stop test (stop button click or test duration expired)
 * 
 * Input props are:
 *   - testDuration (ms): how long to run the test
 *   - maxWait (ms): max delay before showing stimulus
 *   - callback from parent for data passing
*************************************************/

function Button(props) {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  );
}
  
function TestManager(props) {
  const [state, setState] = useState('ready');
  const durRef = useRef();
  
  // test duration timer
  useEffect(() => {
    const durId = setTimeout(() => {
      handleStopClick();
    }, props.duration);
    durRef.current = durId;  // so click handler can cancel
    return(() => {clearTimeout(durId);}) // cleanup
  }, []);
  
  function RTCallback(val) {
    props.cbRT(val);
    setState('RT-finished');
  }

  // construct views
  function viewSelector(s) {
    switch(s) {
      case 'ready':
        return (
          <>
          <Button name='Start Test' onClick={handleStartClick} />
          <Button name='Stop Test' onClick={handleStopClick} />
          </>
          );
      case 'RT-started':
        // the delay before showing stimulus
        let wait = 1000 * (2 + Math.floor(Math.random() * (props.maxWait - 2)));
        return (
          <>
          <Button name='Start Test' onClick={handleStartClick} />
          <Button name='Stop Test' onClick={handleStopClick} />
          <ResponseTimer delay={wait} callback={RTCallback} />
          </>
          );
      case 'RT-finished':
        setState('RT-started')
        return(
          <div>RT-finished</div>
        );
      case 'done':
        props.cbTM(true);  // tell parent test is done
        return (
          <>
          <>Test completed</>
          </>
          );
      default:
        throw new Error();
    }
  }

  function handleStartClick() {
    switch (state) {
      case 'ready':
        setState('RT-started');
        break; 
      case 'RT-started':
        break;  // nothing to do
      case 'RT-finished':
        break;  // nothing to do
      case 'done':
        break;  // nothing to do
      default:
        throw new Error();
    }
  }

  function handleStopClick() {
    switch (state) {
      case 'ready':
        setState('done');
        break;
      case 'RT-started':
        setState('done');
        clearTimeout(durRef.current);  // clear the test duration timer
        break;
      case 'RT-finished':
        setState('done');
        clearTimeout(durRef.current);  // clear the test duration timer
        break;  
      case 'done':
        break;  // nothing to do
      default:
        throw new Error();
    }
  }

  return (
    <>
    {viewSelector(state)}
    </>
  );
}

export default TestManager;