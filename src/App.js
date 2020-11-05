import React, { useState, useEffect } from 'react';
import './App.css';
import TestManager from './test_manager';
import ChooseUser from './choose_user';
import TestHeader from './test_header';
import DataTable from './data_table';
import DataSummary from './data_summary';
import TestFooter from './test_footer';
import Settings from './settings';
import ViewData from './view_data';
import ProgressBar from './progress_bar';

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

  const handleResetAll = () => {
    setAppState("getUser");
    setResults([]);  // clear out old results
  }

  const showSettingsCB = () => {
    if (appState === "doSettings") {
      setAppState("getTestInfo");
    } else {
      setAppState("doSettings");
    }
  }

  const changeSettingsCB = (obj) => {
    setSettings(obj);
  }

  let mainPane;  // what to show based on appState
  switch (appState) {
    case "getUser":
      mainPane = 
        <>
        <ChooseUser
          cb={namePickCB}
        />
        </>
      break;
    case "getTestInfo":
      // TODO: can't backtrack from this view
      mainPane = 
        <>
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
      // TODO: ProgressBar better as part of TestManager
      mainPane = 
        <>
        <TestManager
        duration={settings.testDuration}
        cbRT={cbRT}
        maxWait={settings.maxWait}
        cbTM={cbTM}
        setTestStart={setTestStart}
        />
        <ProgressBar 
          duration={settings.testDuration} 
          start={testStart}/>
        </>
      break;
    case "doReview":
      mainPane = 
        <>
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
        <Settings 
          settings={settings}
          cb={changeSettingsCB}
        />
        </>
      break;
    case "manageData":
      mainPane = 
        <>
        <ViewData userName={userName} />
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
  testPane = <li>{testStart.getTime()}</li>;

  return (
    <div className="App">
      <h1>Psychomotor Vigilance Test</h1>
      <h2>(Under development)</h2>
      {mainPane}
      
      <TestFooter 
        appState={appState}
        resetAllCB={handleResetAll}
        showSettingsCB={showSettingsCB}
        changeSettingsCB={changeSettingsCB}
      />
      <h2>==== test area below ====</h2>
      <ul>{testPane}</ul>
    </div>
  );
}

export default App;
