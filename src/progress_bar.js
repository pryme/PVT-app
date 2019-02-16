import React from 'react';

function ProgressBar(props) {
  const duration = props.duration;  // milliseconds
  const start = props.start.getTime();  // milliseconds
  const now = new Date();
  let pctComplete = Math.round(((now.getTime() - start) / duration) * 100);
  let divStyle = {
    width: pctComplete + "%",
    backgroundColor: "green"
  }
  return( <div id="frame" className="progress">
           <div id="bar" className="progress" style={divStyle}></div>
         </div>
         );
}

export default ProgressBar;