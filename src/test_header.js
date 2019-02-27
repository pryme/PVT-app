import React from 'react';
import ChooseUser from './choose_user';

class TestHeader extends React.Component {
  // get subject info and adjust settings
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    };
  
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  
  handleCommentChange(e) {
    this.props.onCommentChange(e.target.value);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    Object.keys(localStorage).forEach( key => {
      console.log(localStorage.getItem(key));
    });
    // TODO: this needs work...
    //this.props.onSubmit()
  }

 // 
  render() {
    return(
      <div className="TestHeader">
        <form onSubmit={this.handleSubmit}>
          <p>Please enter or update your info below:</p>
          <input 
            type="text" 
            placeholder="Test subject name"
            onChange={this.handleNameChange}
            value={this.props.userName}
            name="userName"
          /> 
          <br/>
          <textarea 
            rows={4}
            placeholder="Comments"
            onChange={this.handleCommentChange}
            value={this.props.userComment}
          />
          <br />
          <input
            type="submit"
            value="Proceed to testing"
          />
        </form>
      </div>
    );          
  }
}

export default TestHeader;