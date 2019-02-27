import React from 'react';
import AddNewUser from './add_new_user';

class ChooseUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "I'm not on the list",
      addUser: false
    };
  }

  onSelectSubmit = (e) => {
    e.preventDefault();
    let pick = e.target.list.value;  // name from select
    if (pick !== this.state.msg) {
      this.props.cb(pick);  // return selected name upward
    } else {  // need to add a new user
      this.setState({
        addUser: true  // set flag
      });  
    }
  }

  addNewDoneCB = (name) => {   // call this when done adding new user
    this.setState({
      addUser: false  // assume future users are existing
    });
    this.props.cb(name);
  }

  render() {
    const lsKeys = Object.keys(localStorage);
    if (!(this.state.addUser) && lsKeys.length > 0) {  // first ask to select from list
      let names = lsKeys.map(   // array of userNames
          key => (JSON.parse(localStorage.getItem(key)).userName)
        );
      return(
        <div>
          <h1>Choose User</h1>
          <form onSubmit={this.onSelectSubmit} >
            <p>Choose your name from the list:</p>
              <select name="list">    
                {names.map(
                  name => <option>{name}</option>
                )}
                <option>{this.state.msg}</option>
              </select>
            <p><input type="submit" value="Submit" /></p>
          </form>
        </div>
      );
    } else {  // need to add new user
      return(
        <AddNewUser 
          cb={this.addNewDoneCB} 
        />
      );
    }
  }
}

export default ChooseUser;