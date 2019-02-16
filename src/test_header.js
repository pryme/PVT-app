import React from 'react';

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
    //alert("Form submitted");
    this.props.onSubmit()
    e.preventDefault();
  }
  
  render() {
    return(
        <form onSubmit={this.handleSubmit}>
          <p>Please enter or update your info below:</p>
          <input 
            type="text" 
            placeholder="Test subject name"
            onChange={this.handleNameChange}
            value={this.props.userName}
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
    );          
  }
}

export default TestHeader;