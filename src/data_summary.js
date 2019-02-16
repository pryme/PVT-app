import React from 'react';

class DataSummary extends React.Component {
  constructor(props) {
    super(props);
    this.isNormalRT = this.isNormalRT.bind(this);
    this.isLapseRT = this.isLapseRT.bind(this);
    this.getTestDuration = this.getTestDuration(this);
  }
  isRT(item) {  // all reaction times, but not false starts
    return(typeof(item) === "number");
  }
  isNormalRT(item) {  // check normal reaction time
    if (typeof(item) === "number") {
      return( (item > 0) && (item <= this.props.lapseThresh) );
    } else {return(false);}
  }
  isLapseRT(item) {  // check lapsed reaction time
    if (typeof(item) === "number") {
      return ( (item > this.props.lapseThresh) );
    } else {return(false);}
  }
  getSum(total, num) {
    return(total + num);
  }
  
  meanRT(array, filt) {
    let result = null;
    let filtArray = array.filter(filt);
    if (filtArray.length > 0) {
      result = Math.round(filtArray.reduce(this.getSum) / filtArray.length);
    }
    return(result);
  }
  fsCount(array) {
    let filtArray = array.filter(this.isRT);
    return(array.length - filtArray.length);
  }
  lapseCount(array) {
    let filtArray = array.filter(this.isLapseRT);
    return(filtArray.length);
  }
  medianRT(array, filt) {
    let result = null;
    let sortedFiltArray = array.filter(filt).sort( function(a, b){return a-b} );  // numeric sort
    let odd = (sortedFiltArray.length % 2 !== 0);
    let idx = Math.floor(sortedFiltArray.length / 2);
    if (odd) {
      result = sortedFiltArray[idx];
    } else {
      result = Math.round((sortedFiltArray[idx] + sortedFiltArray[idx-1]) / 2);
    }
    return(result);
  }
  getTestDuration() {
    let now = new Date();
    let duration = now.getTime() - this.props.testStart.getTime();  // ms
    return(Math.round(duration / 1000));  // seconds
  }
  
  render() {
    const data = this.props.results;
    return <div>
            <h2>Test Summary</h2>
            <table>
              <caption>Response Time</caption>
              <tbody>
                <tr>
                  <th></th>
                  <th>Normal</th>
                  <th>All</th>
                </tr>
                <tr>
                  <th>Mean response time (ms):</th>
                  <td>{this.meanRT(data, this.isNormalRT)}</td>
                  <td>{this.meanRT(data, this.isRT)}</td>
                </tr>
                <tr>
                  <th>Median response time (ms):</th>
                  <td>{this.medianRT(data, this.isNormalRT)}</td>
                  <td>{this.medianRT(data, this.isRT)}</td>
                </tr>
              </tbody>
            </table>
      
            <table>
              <caption>Misses</caption>
              <tbody>
                <tr>
                  <th>Number of lapses:</th>
                  <td>{this.lapseCount(data)}</td>
                </tr>
                <tr>
                  <th>Number of false starts:</th>
                  <td>{this.fsCount(data)}</td>
                </tr>
                <tr>
                  <th>Number of trials:</th>
                  <td>{data.length}</td>
                </tr>
                <tr>
                  <th>Test duration (s):</th>
                  <td>{this.getTestDuration}</td>
                </tr>
              </tbody>
            </table>
      
            <table>
              <caption>Metadata</caption>
              <thead><tr>
                <th>Subject</th><th>Date</th>
                </tr></thead>
              <tbody><tr>
                <td>{this.props.userName}</td>
                <td>{this.props.testStart.toLocaleString()}</td>
                </tr></tbody>
            </table>
           </div>
  }
}

export default DataSummary;