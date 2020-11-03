import React, { useState, useEffect } from 'react';
import './App.css';
import TestBox from './test_box';

function App() {
  const [results, setResults] = useState([]);  // array of RTs from multiple runs
  const [settings, setSettings] = useState({
    testDuration: 30 * 1000,  // milliseconds
    maxWait: 10,  // seconds; max delay before stimulus
    validThresh: 100,  // milliseconds; RT > thresh is valid
    lapseThresh: 500,  // milliseconds; RT > thresh is lapse
  });
  
  /************************************************************************** 
   * Callback to pass to ResponseTimer.
   * Updating the array is tricky; see https://medium.com/javascript-in-plain-english/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
  **************************************************************************/
  function cb(val) {
    setResults(results => [...results, val]);  // add the new value to the array
  }

  let pane = <li>no results here</li>;
  if (results.length > 0) {
    pane = results.map( (item, index) => (
      <li key={index}>{item}</li>
    ));
  }
  
  return (
    <div className="App">
      <TestBox 
        duration={settings.testDuration}
        callback={cb}
        maxWait={settings.maxWait}
      />
      <ul>{pane}</ul>
    </div>
  );
}

export default App;
