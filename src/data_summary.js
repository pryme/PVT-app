import React from 'react';

// Refactor to functional component.
function DataSummary(props) {
  const isRT = (item) => {  // all reaction times, but not false starts
    // eliminate RTs less than validThresh
    return typeof(item) === "number" && (item > props.validThresh); 
  }
  const isNormalRT = (item) => {  // check normal reaction time
    return typeof(item) === "number" && 
      item > props.validThresh &&
      item <= props.lapseThresh;
  }
  const isLapseRT = (item) => {  // check lapsed reaction time
    if (typeof(item) === "number") {
      return item > props.lapseThresh;
    } else return false;
  }
  const getSum = (total, num) => {
    return total + num;
  }
  const meanRT = (array, filt) => {
    let result = null;
    let filtArray = array.filter(filt);
    if (filtArray.length > 0) {
      result = Math.round(filtArray.reduce(getSum) / filtArray.length);
    }
    return(result);
  }
  const fsCount = (array) => {
    let filtArray = array.filter(isRT);
    return(array.length - filtArray.length);
  }
  const lapseCount = (array) => {
    let filtArray = array.filter(isLapseRT);
    return(filtArray.length);
  }
  const medianRT = (array, filt) => {
    let result = null;
    let sortedFiltArray = array.filter(filt).sort( function(a, b){return a-b} );  // numeric sort
    let odd = (sortedFiltArray.length % 2 !== 0);
    let idx = Math.floor(sortedFiltArray.length / 2);
    if (odd) {
      result = sortedFiltArray[idx];
    } else {
      result = Math.round((sortedFiltArray[idx] + sortedFiltArray[idx-1]) / 2);
    }
    if (result === null || isNaN(result)) {result = null;}  // avoid NaN return
    return(result);
  }
  const getTestDuration = () => {
    let now = new Date();
    let duration = now.getTime() - props.testStart.getTime();  // ms
    return(Math.round(duration / 1000));  // seconds
  }
  const data = props.results;
  return (
    <div>
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
            <th>Mean time (ms):</th>
            <td>{meanRT(data, isNormalRT)}</td>
            <td>{meanRT(data, isRT)}</td>
          </tr>
          <tr>
            <th>Median time (ms):</th>
            <td>{medianRT(data, isNormalRT)}</td>
            <td>{medianRT(data, isRT)}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>Misses</caption>
        <tbody>
          <tr>
            <th>Number of lapses:</th>
            <td>{lapseCount(data)}</td>
          </tr>
          <tr>
            <th>Number of false starts:</th>
            <td>{fsCount(data)}</td>
          </tr>
          <tr>
            <th>Number of trials:</th>
            <td>{data.length}</td>
          </tr>
          <tr>
            <th>Test duration (s):</th>
            <td>{getTestDuration()}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>Metadata</caption>
        <thead><tr>
          <th>Subject</th><th>Date</th>
          </tr></thead>
        <tbody><tr>
          <td>{props.userName}</td>
          <td>{props.testStart.toLocaleString()}</td>
          </tr></tbody>
      </table>
      </div>
  )
}

export default DataSummary;