/class PvtTest extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleHeaderSubmit = this.handleHeaderSubmit.bind(this);
    this.handleResetAll = this.handleResetAll.bind(this);
    this.rtDoneCB = this.rtDoneCB.bind(this);
    this.state = {
      // stage of PVT test state machine (header, ready, running, done)
      testStage: "header",  
      rtDone: false,  // response timer finished?
      testStart: new Date(),  // mark start of test duration
      results: [],
      testDuration: 300 * 1000,  // milliseconds
      maxInterval: 10,  // seconds, not currently used
      lapseThresh: 500,  // milliseconds; RT > thresh is lapse
      userName: "Patrick",
      userComment: ""
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
      () => this.handleStopClick(), this.state.testDuration
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
  
  render() {
    let pane;  // what to show
    
    switch (this.state.testStage) {
      case "header":
        pane = 
          <div>
          <TestHeader 
            userName={this.state.userName}
            onNameChange={this.handleNameChange}
            userComment={this.state.userComment}  
            onCommentChange={this.handleCommentChange}
            onSubmit={this.handleHeaderSubmit}
          />
          </div>;
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
            <ResponseTimer cb={this.rtDoneCB}/>
            <ProgressBar duration={this.state.testDuration} 
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
              lapseThresh={this.state.lapseThresh}
              />
          <ErrorBoundary>
            <DataSummary 
              results={this.state.results}
              userName={this.state.userName}
              testStart={this.state.testStart}
              lapseThresh={this.state.lapseThresh}
              />
          </ErrorBoundary>
            <div className="controls">
              <Button name="Start Test" onClick={this.handleStartClick}/>
            </div>
          </div>;  
        break;
      default:
        pane = null;
    }
  
    return (
      <div className="pvttest">
        {pane}
        <div id="reset">
          <Button name="Reset All" onClick={this.handleResetAll}/>
        </div>
      </div>
    );
  } 
}
