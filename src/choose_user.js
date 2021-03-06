import React, { useState } from 'react';
import AddNewUser from './add_new_user';

function ChooseUser(props) {
  const msg = "I'm not on the list";
  const [addUser, setAddUser] = useState(false);
  const [action, setAction] = useState("runTest");  // alt is "viewData"

  const onSelectSubmit = (e) => {
    e.preventDefault();
    console.log("");
    let pick = e.target.list.value;  // name from select
    if (pick !==msg) {
      props.cb(pick, action);  // return selected name upward
    } else {  // need to add a new user
      setAddUser(true);  // set flag
    }
  }
  const addNewDoneCB = (name) => {   // call this when done adding new user
    setAddUser(false);  // assume future users are existing
    props.cb(name);
  }

  const handleRadioChg = () => {
    setAction((action === "runTest") ? "viewData":"runTest");
  }

  const lsKeys = Object.keys(localStorage);
  if (!(addUser) && lsKeys.length > 0) {  // first ask to select from list
    let names = lsKeys.map(   // array of userNames
        key => (JSON.parse(localStorage.getItem(key)).userName)
      );
    return(
      <div>
        <form onSubmit={onSelectSubmit} >
          <p>Choose your name from the list:</p>
            <select name="list">    
              {names.map(
                name => <option>{name}</option>
              )}
              <option>{msg}</option>
            </select>
          <div className="form-option">
            <label>
              <input type="radio" name="action" value="test"
              checked={action === "runTest"} 
              onChange={handleRadioChg} />
              Run a test
            </label>
          </div>
          <div className="form-option">
            <label>
              <input type="radio" name="action" value="view"
              onChange={handleRadioChg} />
              View past data
            </label>
          </div>
          <input type="submit" value="Submit" >
          </input>
        </form>
      </div>
    );
  } else {  // need to add new user
    return(
      <AddNewUser 
        cb={addNewDoneCB} 
      />
    );
  }
}

export default ChooseUser;