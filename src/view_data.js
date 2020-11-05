import React, { useState } from 'react';
import { getKeyForUser } from './storage-fn'

/***** Present historical test data for viewing *****/

export function ViewData(props) {

  const user = props.userName;
  const key = getKeyForUser(user);
  const userTests = JSON.parse(localStorage.getItem(key)).userTests;
  const testKeys = Object.keys(userTests);  
  let rows = testKeys.map(
    (item) => <tr>
      <td>{userTests[item].unixtime}</td>
      <td>{userTests[item].date}</td>
      <td>{userTests[item].time}</td>
      <td>{userTests[item].trials}</td>
      <td>{userTests[item].RT.mean.normal}</td>
      <td>{userTests[item].RT.median.normal}</td>
      <td>{userTests[item].lapses}</td>
      <td>{userTests[item].falseStarts}</td>
      </tr>
  );

  /* 
  * Display a table like:
  * |Date|Time|Trials|Mean-normal|Median-normal|Lapses|Falses|
  */
  return(
    <div>
      <table>
        <thead>
          <th>Unixtime</th>
          <th>Date</th>
          <th>Time</th>
          <th>Trials</th>
          <th>RT (mean)</th>
          <th>RT (median)</th>
          <th>Lapses</th>
          <th>False Starts</th>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default ViewData;