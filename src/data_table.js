import React from 'react';

class DataTable extends React.Component {
  generateRows() {
    const results = this.props.results;
    const lapseThresh = this.props.lapseThresh;
    if (results.length > 0) {
      return results.map(function(item, index) {
          let content;
          let cellClass;
          if (item === null) {
            content = "False start"
          } else {
            content = item;
            if (Number(content) > lapseThresh) {cellClass = "lapse";} 
          }
          return <tr key={index}><td className={cellClass}> {content} </td></tr>;
        });
    }
  }
  
  render() {
    try {
      let rows = this.generateRows();
      return <div className="results">
             <table>
               <caption>Response Time</caption>
               <tbody>
                 <tr><th>Milliseconds</th></tr>  
                 {rows}
               </tbody>
             </table>
             </div>;
    } catch(err) {
      return <div> {err.message} </div>  ;       
    }
  }
}

export default DataTable;