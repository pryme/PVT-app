import React from 'react';

// TODO file structure doesnt make sense
// convenience functions for using localStorage

// is argument already a value in LS? (string compare )
// returns true if value exists
export  function valueInLS(value, caseSensitive=false) {
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
function addNewUserToLS(name) {
  let result = false;
  if (name.length > 1) {  // avoid blank
    let numUsers = localStorage.length;  // 1 record / user
    let userID = "U" + (numUsers + 1);  // first user is ID 1, then integers
    let userObj = {
      userName: name,
      userTests: {}
    };
    localStorage.setItem(userID, JSON.stringify(userObj));
    result = true;
    // maybe want try-catch TODO
  } 
  return result;
}

function AddNewUser(props) {
  const onSubmit = (e) => {
    e.preventDefault();
    // e.target is the id="newUser" form
    // e.target.firstName.value gives value of name="firstName" field
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const fullName = firstName + " " + lastName;
    let isNew = !valueInLS(fullName);
    if (isNew) {addNewUserToLS(fullName);}
    // this callback passes up the name, and also resets AddNew flag
    props.cb(fullName);  
    //alert("AddNewUser.onSubmit: Go to Comments / Proceed");
  }
  return(
    <form onSubmit={onSubmit} id="newUser">
      <h1>New User Setup</h1>
      <p>Enter your info below.</p>
      <input type="text" name="firstName" placeholder="First name" />
      <input type="text" name="lastName" placeholder="Last name" />
      <input type="submit" value="Submit" />
    </form>            
  );

}

export default AddNewUser;