import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResponseTimer from './response_timer';
import Button from './button';
import TestHeader from './test_header';
import ProgressBar from './progress_bar';
import DataTable from './data_table';
import ErrorBoundary from './error_boundary';
import DataSummary from './data_summary';
import Settings from './settings';
import TestFooter from './test_footer';
import AddNewUser from './add_new_user'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleHeaderSubmit = this.handleHeaderSubmit.bind(this);
    this.handleResetAll = this.handleResetAll.bind(this);
    this.rtDoneCB = this.rtDoneCB.bind(this);
    this.changeSettingsCB = this.changeSettingsCB.bind(this);
    this.showSettingsCB = this.showSettingsCB.bind(this);
    this.state = {
      // stage of PVT test state machine (header, ready, running, done, settings)
      testStage: "header",  
      //testStage: "test",  // TODO fix manual edit for test
      rtDone: false,  // response timer finished?
      testStart: new Date(),  // mark start of test duration
      results: [],
      userName: "Patrick",
      userComment: "",
      settings: {
        testDuration: 300 * 1000,  // milliseconds
        maxWait: 10,  // seconds; max delay before stimulus starts
        validThresh: 100,  // milliseconds; RT > thresh is valid
        lapseThresh: 500  // milliseconds; RT > thresh is lapse
      }
    };
  }

  handleStartClick() {  // start the test
    this.setState({
      testStage: "running",
      rtDone: false,
      testStart: new Date(),
      results: []
    });
    this.durationID = setTimeout(  // for test duration
      () => this.handleStopClick(), this.state.settings.testDuration
    );
  }
  
  handleStopClick() {  // need to sort which button
    this.setState({
      testStage: "done"
    });
    clearTimeout(this.durationID);
  }
  
  handleNameChange(text) {
    this.setState({userName: text});
    //alert("handleNameChange called");
  }
  
  handleCommentChange(text) {
    this.setState({userComment: text});
    //alert("handleCommentChange called");
  }
  
  handleHeaderSubmit() {
    this.setState({testStage: "ready"});
  }
  
  handleResetAll() {
    this.setState({testStage: "header"});
  }
  
  rtDoneCB(status, result) {
    this.setState({rtDone: status});
    if (status) {  // called from ResponseTimer.cleanup()
      // need to save response time data
      let newResults = this.state.results.slice();  // copy
      newResults.push(result);  // append new measurement
      this.setState({results: newResults});
    }
  }
// 
  changeSettingsCB(obj) {
    this.setState({
      settings: obj
    });
  }

  showSettingsCB() {
    if (this.state.testStage === "settings") {
      this.setState({
        testStage: "header"
      });
    } else {
      this.setState({
        testStage: "settings"
      });
    }
  }

  render() {
    let pane;  // what to show
    switch (this.state.testStage) {
      case "header":
        pane = 
          <TestHeader 
            userName={this.state.userName}
            onNameChange={this.handleNameChange}
            userComment={this.state.userComment}  
            onCommentChange={this.handleCommentChange}
            onSubmit={this.handleHeaderSubmit}
          />
        break;
      case "ready":
        pane = 
          <div className="controls">
          <Button name="Start Test" onClick={this.handleStartClick}/>
          </div>
        break;
      case "running":
        if (!this.state.rtDone) {
          pane = 
            <div>
            <ResponseTimer cb={this.rtDoneCB}
              maxWait={this.state.settings.maxWait}
            />
            <ProgressBar duration={this.state.settings.testDuration} 
              start={this.state.testStart}/>
            <div className="controls">
              <Button name="Stop Test" onClick={this.handleStopClick}/>
            </div>
            </div>;  
        } else {pane = null;}
        break;
      case "done":
        pane = 
          <div>
            <DataTable 
              results={this.state.results}
              validThresh={this.state.settings.validThresh}
              lapseThresh={this.state.settings.lapseThresh}
              />
            <DataSummary 
              results={this.state.results}
              userName={this.state.userName}
              testStart={this.state.testStart}
              lapseThresh={this.state.settings.lapseThresh}
              validThresh={this.state.settings.validThresh}
              />
            <div className="controls">
              <Button name="Start Test" onClick={this.handleStartClick}/>
            </div>
          </div>;  
        break;
      case "settings":
        pane =<Settings settings={this.state.settings}
          cb={this.changeSettingsCB}
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
        <TestFooter resetAllCB={this.handleResetAll}
          testStage={this.state.testStage}
          showSettingsCB={this.showSettingsCB}
          changeSettingsCB={this.changeSettingsCB}
        />
        <h2>==== test below ====</h2>
        <AddNewUser />
      </div>
    );
  } 
}

export default App;
