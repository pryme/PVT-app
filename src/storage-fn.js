import React, { useState } from 'react';
import './App.css';
import { isArray } from 'util';

/***************************************************************
 * Utility functions for using local storage.
 ***************************************************************/

// Returns the LS key for a userName or null if missing
export function getKeyForUser(uN) {
  let result = null;  // return null if uN not found
  let uNTrimmed = uN.trim();
  try {
    const lsKeys = Object.keys(localStorage);  // array of keys like 'U1, U2, ...'
    lsKeys.forEach(function(key) {
      let obj = JSON.parse(localStorage.getItem(key));
      // make sure we only use this app's data
      if (obj.hasOwnProperty("userName")) {
        if (obj.userName.trim().toUpperCase() === uNTrimmed.toUpperCase()) {
          result = key;
        }
      }
    });
    return result;
  }
  catch(err) {
    console.error(err);
  }
}

// Returns true if un exists as userName in localStorage
export function userInLS(un, caseSensitive=false) {
  // TODO caseSensitive not implemented
  let result = false;
  let unTrimmed = un.trim();
  try {
    const lsKeys = Object.keys(localStorage);  // array of keys like 'U1, U2, ...'
    lsKeys.forEach(function(key) {
      let obj = JSON.parse(localStorage.getItem(key));
      // make sure we only use this app's data
      if (obj.hasOwnProperty("userName")) {
        if (obj.userName.trim().toUpperCase() === unTrimmed.toUpperCase()) {
          result = true;
        }
      }
    });
    return result;
  }
  catch(err) {
    console.error(err);
  }
}
/*********************************************************************** */

// get keys from localStorage
function getLsKeys() {
  let lsKeys = null;
  if (isAvailable('localStorage')) {
    lsKeys = Object.keys(localStorage);  // array of keys
    console.log("lsKeys: " + lsKeys);  // debug
    //console.log("isArray lsKeys: " + isArray(lsKeys));
  } 
  return lsKeys;
}

// Add a new user to LS 
// TODO avoid duplicating an existing name
export function addNewUserToLS(name) {
  let result = false;
  if (name.length > 1) {  // avoid blank
    if (!userInLS(name)) {  // don't make a duplicate
      try {
        let numUsers = localStorage.length;  // 1 record / user
        let userID = "U" + (numUsers + 1);  // first user ID is "U1", then increment
        let userObj = {
          userName: name,
          userSettings: {},
          userTests: {}
        };
        localStorage.setItem(userID, JSON.stringify(userObj));
        result = true;
        return result;
      }
      catch(err) {
        console.error(err);
      }
    }
  } 
  return result;
}


/* Returns true if storage capability is available */
export function isAvailable(storage) {
  let store;  // the storage container
  switch (storage) {
    case 'localStorage':
      store = localStorage;
      break;
    case 'sessionStorage':
      store = sessionStorage;
      break;
    default:
      store = null;
  }
  let result = false;
  let val1 = 'test';  // value for testing
  if (store === null) {return result;}  // false
  store.setItem('key1', val1);  // write a value
  let getVal1 = store.getItem('key1'); 
  if (getVal1 === val1) {
    store.removeItem('key1');  // delete the test key
    return true;  // worked
  } else {
    return false;  // failed
  }
}

/****************************************************************
* Below is only for testing of above functions
*****************************************************************/

/* component to test addNewUserToLS function */
export function TestAddUser() {
  const testFn = () => {
    let name = document.getElementById("name").value;
    if (addNewUserToLS(name)) {
      document.getElementById("result").innerHTML = "Name added";
    } else {
      document.getElementById("result").innerHTML = "Failed";
    }
  }

  return(
    <div>
      <input type="text" id="name"></input>
      <button onClick={testFn} >Add User To LS</button>
      <p id="result"></p>
    </div>
  );

}

/* functional component to indicate availability status */
export  function TestLSButton() {
  const [col, setCol] = useState('gray');
  const [sizeMsg, setSizeMsg] = useState('');
  const test = () => {
    let avail = isAvailable('localStorage');
    setCol(avail ? 'green' : 'red');
    setSizeMsg(avail ? 'Local storage length: ' + localStorage.length : '');
  }

  return (
    <div className="Box" >
     <button onClick={test} style={{backgroundColor: col, fontSize: '24px'}}>Test local storage</button>
     <p>{sizeMsg}</p>
    </div>
  );
}

// functional component to test lsKeys function
export function TestLsKeys() {
  let list = getLsKeys();
  if (list === null) {list = ['Unavailable'];}
  const [disp, setDisp] = useState('none');
  const makeCells = list.map(
    (item) => <td>{item}, </td>
  );
  const showKeys = () => setDisp('table');
  //userInLS('');  // test only

  return (
    <>
      <button onClick={showKeys} >Show lsKeys</button>
      <table id='keys'  style={{display: disp}} align='center'>
        <tbody>
          <tr>{makeCells}</tr>
        </tbody>
      </table>
    </>
  );
}

// functional component for test only
export function TestUserInLS() {
  const check = () => {
    let name = document.getElementById("test1").value;
    let result = "Name not found";
    if (userInLS(name)) {
      result = "Found name!";
    }
    document.getElementById("test1Result").innerHTML=result;
  }
  return (
    <div>
      <br/>
      <input type="text" id="test1"  ></input>
      <button onClick={check}>Check name</button>
      <p id="test1Result"></p>
    </div>
  );
}

// functional component for test only
export function TestgetKeyForUser() {
  const check = () => {
    let name = document.getElementById("test2").value;
    let key = getKeyForUser(name);
    let result = "Found key: " + key;
    document.getElementById("test2Result").innerHTML=result;
  }
  return (
    <div>
      <input type="text" id="test2"  ></input>
      <button onClick={check} >Check name</button>
      <p id="test2Result">result p</p>
    </div>
  );
}