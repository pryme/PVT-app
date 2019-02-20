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
            content = "FS"  // false start
          } else {
            content = item;
            if (Number(content) > lapseThresh) {cellClass = "lapse";} 
          }
          return <tr key={index}><td className={cellClass}> {content} </td></tr>;
        });
    }
  }

  generateRows2(array, lapseThresh, cols=5) {
    // cols is number of cols for table
    let result = [];
    if (array.length > 0) {
      let value = null;
      let cellClass = null;
      let rows = Math.ceil(array.length / cols);
      for (let i=0; i<rows; i++) {
        let newRow;
        for (let j=0; j<cols; j++) {
          let index = i * cols + j;
          if (index < array.length) {
            newRow = {newRow} + <td> + {array[index]} + </td>;
          } else {newRow = {newRow} + <td></td>;}
        }
        newRow = <tr> + {newRow} + </tr>;
        result.push({newRow});
      }
    }
    console.log(result);  // TODO temp
    return result;
  }
  
  toMatrix(arr, width) {
   return arr.reduce(function(rows, val, idx) {
     return (idx % width === 0 ? rows.push([val]) : 
       rows[rows.length - 1].push(val)) && rows;
   }, []);
  }

  render() {
    const lapseThresh = this.props.lapseThresh;
    const results = this.props.results.map(
      function(item) {
        let val;
        item === null ? val = "FS" : val = Number(item);
        return val;
      }
    );
    // reshape to matrix
    const mat = this.toMatrix(results, 5);  // false starts already labelled
    
    try {
      return <div className="results">
             <table>
               <caption>Response Time</caption>
               <tbody>
                 <tr><th>Milliseconds</th></tr>  
                {mat.map(
                  function(row, idx) {
                    return <tr key={idx}>
                      {row.map(function(cell, idx) {
                        return <td key={idx}>{cell}</td>;
                      })}
                    </tr>;
                  }
                )}

               </tbody>
             </table>
             </div>;
    } catch(err) {
      return <div> {err.message} </div>  ;       
    }
  }
}

export default DataTable;