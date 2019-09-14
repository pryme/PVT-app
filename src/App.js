import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './button';
import TestHeader from './test_header';
import ProgressBar from './progress_bar';
import DataTable from './data_table';
import ErrorBoundary from './error_boundary';
import DataSummary from './data_summary';
import Settings from './settings';
import TestFooter from './test_footer';
import AddNewUser from './add_new_user'
import ChooseUser from './choose_user';
import StimulusDisplay from './stimulus_display';
import { TestgetKeyForUser } from './storage-fn';

function App() {
  // stage of PVT test state machine (get_user, header, ready, running, done, settings)
  const [testStage, setTestStage] = useState("get_user");
  const [rtDone, setRtDone] = useState(false);  // response timer finished?
  const [testStart, setTestStart] = useState(new Date())  // mark start of test duration
  const [results, setResults] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [settings, setSettings] = useState(
    { testDuration: 300 * 1000,  // milliseconds
      maxWait: 10,  // seconds; max delay before stimulus starts
      validThresh: 100,  // milliseconds; RT > thresh is valid
      lapseThresh: 500  // milliseconds; RT > thresh is lapse
    }
  );

  let durationID;
  const handleStartClick = () => {  // start the test
    setTestStage("running");
    setRtDone(false);
    setTestStart(new Date());
    setResults([]);
    durationID = setTimeout(  // for test duration
      () => handleStopClick(), settings.testDuration
    );
  }

  const handleStopClick = () => {  // need to sort which button
    setTestStage("done");
    clearTimeout(durationID);
  }
  const handleNameChange = (text) => {
    setUserName(text);
  }
  const handleCommentChange = (text) => {
    setUserComment(text);
  }
  const handleHeaderSubmit = () => {
    setTestStage("ready");
  }
  const handleResetAll = () => {
    setTestStage("get_user");
  }
  const rtDoneCB = (status, result) => {
    setRtDone(status);
    if (status) {  // called from ResponseTimer.cleanup()
      // need to save response time data
      let newResults = results.slice();  // copy
      newResults.push(result);  // append new measurement
      setResults(newResults);
    }
  }
  const changeSettingsCB = (obj) => {
    setSettings(obj);
  }
  const showSettingsCB = () => {
    if (testStage === "settings") {
      setTestStage("header");
    } else {
      setTestStage("settings");
    }
  }
  // callback for ChooseUser name selection
  const namePickCB = (pick)  => {
    // pick is name selected from dropdown
    //alert("Go to Comments / Proceed with user: " + pick);
    setUserName(pick);
    setTestStage("header");
  }

  let pane;  // what to show
  switch (testStage) {
    case "get_user":
      pane = 
        <ChooseUser 
          cb={namePickCB}
          />
      break;
    case "header":
      pane = 
        <TestHeader 
          userName={userName}
          onNameChange={handleNameChange}
          userComment={userComment}  
          onCommentChange={handleCommentChange}
          onSubmit={handleHeaderSubmit}
        />
      break;
    case "ready":
      pane = 
        <div className="controls">
        <Button name="Start Test" onClick={handleStartClick}/>
        </div>
      break;
    case "running":
      if (!rtDone) {
        pane = 
          <div>
{/********************************************
          <ResponseTimer cb={this.rtDoneCB}
            maxWait={this.state.settings.maxWait}
          />
******************************************/}
          { /* <ResponseTimer countBy={10} startDelay={2000} cb={this.rtDoneCB} /> */}

{/********************************************
          Make StimulusDisplay the main element for timer display.
******************************************/}
          <StimulusDisplay cb={rtDoneCB} maxWait={settings.maxWait} />


          <ProgressBar duration={settings.testDuration} 
            start={testStart}/>
          <div className="controls">
            <Button name="Stop Test" onClick={handleStopClick}/>
          </div>
          </div>;  
      } else {pane = null;}
      break;
    case "done":
      pane = 
        <div>
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
            />
        {/*}    
          <div className="controls">
            <Button name="Start Test" onClick={this.handleStartClick}/>
          </div>
    */}
        </div>;  
      break;
    case "settings":
      pane =<Settings settings={settings}
        cb={changeSettingsCB}
      />;
      break;
    default:
      pane = null;
  }

  return (
    <div className="App">
      <h1>Psychomotor Vigilance Test</h1>
      <h2>Experimental</h2>
      {pane}
      <TestFooter resetAllCB={handleResetAll}
        testStage={testStage}
        showSettingsCB={showSettingsCB}
        changeSettingsCB={changeSettingsCB}
      />
      <h2>==== test below ====</h2>
    </div>
  );

}

export default App;
