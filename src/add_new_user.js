import React from 'react';
import { valueInLS, addNewUser} from './user_list';

function AddNewUser(props) {
  const onSubmit = (e) => {
    e.preventDefault();
    // e.target is the id="newUser" form
    // e.target.firstName.value gives value of name="firstName" field
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const fullName = firstName + " " + lastName;
    let isNew = !valueInLS(fullName);
    if (isNew) {addNewUser(fullName);}
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