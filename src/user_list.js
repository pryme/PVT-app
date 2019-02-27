import React from 'react';

// TODO file structure doesnt make sense
// convenience functions for using localStorage

// is argument already a value in LS? (string compare )
// returns true if value exists
export function valueInLS(value, caseSensitive=false) {
  let result = false;
  const lsKeys = Object.keys(localStorage);  // array of keys
  lsKeys.forEach(function(key) {
    if (JSON.parse(localStorage.getItem(key)).userName.toUpperCase() === 
        value.toUpperCase()) {
      result = true;
    }
  });
  return result;
}

// add a new user to LS 
export function addNewUser(name) {
  let result = false;
  if (name.length > 1) {  // avoid blank
    let numUsers = localStorage.length;  // 1 record / user
    let userID = "U" + (numUsers + 1);  // first user is ID 1, then integers
    let userObj = {
      userName: name,
      userSettings: {},
      userTests: {}
    };
    localStorage.setItem(userID, JSON.stringify(userObj));
    result = true;
    // maybe want try-catch TODO
  } 
  return result;
}