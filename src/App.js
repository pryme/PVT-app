import React, { useState, useEffect } from 'react';
import './App.css';
import TestManager from './test_manager';
import ChooseUser from './choose_user';
import TestHeader from './test_header';
import DataTable from './data_table';
import DataSummary from './data_summary';

function App() {
  // states of App {getUser, getTestInfo, doTest, doReview, doSettings, manageData}
  const [appState, setAppState] = useState("getUser");
  const [results, setResults] = useState([]);  // array of RTs from multiple runs
  const [settings, setSettings] = useState({
    testDuration: 30 * 1000,  // milliseconds
    maxWait: 10,  // seconds; max delay before stimulus
    validThresh: 100,  // milliseconds; RT > thresh is valid
    lapseThresh: 500,  // milliseconds; RT > thresh is lapse
  });
  const [userName, setUserName] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [testStart, setTestStart] = useState(new Date())  // mark start of test session

  /************************************************************************** 
   * Callback ResponseTimer calls to return data.
   * Updating the array is tricky; see https://medium.com/javascript-in-plain-english/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
  **************************************************************************/
  function cbRT(val) {  // callback for ResponseTimer
    setResults(results => [...results, val]);  // add the new value to the array
  }

  function cbTM(done) {
    if (done) {
      setAppState("doReview");
    }
  }

  // callback for ChooseUser name selection
  const namePickCB = (pick, action)  => {
    // pick is name selected from dropdown
    setUserName(pick);
    if (action === "runTest") {
      setAppState("getTestInfo");
    } else {  // viewData
      setAppState("manageData");
      console.log("Setting appState to manageData");
    }
  }

  const handleNameChange = (text) => {
    setUserName(text);
  }
  const handleCommentChange = (text) => {
    setUserComment(text);
  }
  const handleHeaderSubmit = () => {
    setAppState("doTest");
  }

  let mainPane;  // what to show based on appState
  switch (appState) {
    case "getUser":
      mainPane = 
        <>
        <h2>== getUser ==</h2>
        <ChooseUser
          cb={namePickCB}
        />
        </>
      break;
    case "getTestInfo":
      // TODO: can't backtrack from this view
      mainPane = 
        <>
        <h2>== getTestInfo ==</h2>
        <TestHeader
          userName={userName}
          onNameChange={handleNameChange}
          userComment={userComment}
          onCommentChange={handleCommentChange}
          onSubmit={handleHeaderSubmit}
        />  
        </>
      break;
    case "doTest":
      // TODO: need progress bar
      mainPane = 
        <>
        <h2>== doTest ==</h2>
        <TestManager
        duration={settings.testDuration}
        cbRT={cbRT}
        maxWait={settings.maxWait}
        cbTM={cbTM}
        />
        </>
      break;
    case "doReview":
      mainPane = 
        <>
        <h2>== doReview ==</h2>
        <DataTable
          results={results}
          validThresh={settings.validThresh}
          lapseThresh={settings.lapseThresh}
        />
        <DataSummary 
          results={results}
          userName={userName}
          userComment={userComment}
          testStart={testStart}
          lapseThresh={settings.lapseThresh}
          validThresh={settings.validThresh}
          maxWait={settings.maxWait}
        />
        </>
      break;
    case "doSettings":
      mainPane = 
        <>
        <h2>== doSettings ==</h2>
        </>
      break;
    case "manageData":
      mainPane = 
        <>
        <h2>== manageData ==</h2>
        </>
      break;
    default:
      throw new Error();
  }

  // diagnostic
  let testPane = <li>no results here</li>;
  if (results.length > 0) {
    testPane = results.map( (item, index) => (
      <li key={index}>{item}</li>
    ));
  }

  return (
    <div className="App">
      <h1>Psychomotor Vigilance Test</h1>
      <h2>Experimental</h2>
      {mainPane}
      
      <h3>TestFooter goes here</h3>
      <h2>==== test area below ====</h2>
      <ul>{testPane}</ul>
    </div>
  );
}

export default App;
