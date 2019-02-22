import React from 'react';

class AddNewUser extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (e) => {
    e.preventDefault();
    // e.target is the id="newUser" form
    // e.target.firstName.value gives value of name="firstName" field
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const fullName = firstName + " " + lastName;
    let numUsers = localStorage.length;  // 1 record / user
    let userID = 0;
    let isNew = true;  // assume new user
    if (numUsers > 0) {
      const lsKeys = Object.keys(localStorage);  // array of keys
      lsKeys.forEach(function(key) {
        if (JSON.parse(localStorage.getItem(key)).toUpperCase() === 
            fullName.toUpperCase()) {
          isNew = false;
          alert("This user name already exists");
        }
      });
      if (isNew) {
        userID = "U" + (numUsers + 1);  // first user is ID 1, then integers
        localStorage.setItem(userID, JSON.stringify(fullName));
      }
    } else {  // first user to add
      userID = "U" + (numUsers + 1);  // first user is ID 1, then integers
      localStorage.setItem(userID, JSON.stringify(fullName));
    }
  }

  render() {
    return(
      <form onSubmit={this.onSubmit} id="newUser">
        <h1>New User Setup</h1>
        <input type="text" name="firstName" placeholder="First name" />
        <input type="text" name="lastName" placeholder="Last name" />
        <input type="submit" value="Submit" />
      </form>            
    );
  }
}

export default AddNewUser;