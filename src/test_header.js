import React from 'react';

function TestHeader(props) {
  const handleNameChange = (e) => {
    props.onNameChange(e.target.value);
  }
  
  const handleCommentChange = (e) => {
    props.onCommentChange(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit()
  }

  return(
    <div className="TestHeader">
      <form onSubmit={handleSubmit}>
        <p>Please enter or update your info below:</p>
        <input 
          type="text" 
          placeholder="Test subject name"
          onChange={handleNameChange}
          value={props.userName}
          name="userName"
        /> 
        <br/>
        <textarea 
          rows={4}
          placeholder="Comments"
          onChange={handleCommentChange}
          value={props.userComment}
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

export default TestHeader;