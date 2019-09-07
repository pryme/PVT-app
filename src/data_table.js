import React from 'react';

function DataTable(props) {
  const generateRows = () => {
    const results = props.results;
    const lapseThresh = props.lapseThresh;
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

  const toMatrix = (arr, width) => {
   return arr.reduce(function(rows, val, idx) {
     return (idx % width === 0 ? rows.push([val]) : 
       rows[rows.length - 1].push(val)) && rows;
   }, []);
  }

  const lapseThresh = props.lapseThresh;
  const validThresh = props.validThresh;
  const results = props.results.map(
    function(item) {
      let val;
      item === null ? val = "FS" : val = Number(item);
      return val;
    }
  );
  // reshape to matrix
  const cols = 5;
  const mat = toMatrix(results, cols);  // false starts already labelled
  try {
    return <div className="results">
            <table>
              <caption>Response Time</caption>
              <tbody>
              {mat.map(
                function(row, idx) {
                  return <tr key={idx}>
                    {row.map(function(cell, idx) {
                      let cellClass;
                      if (cell === "FS" || cell < validThresh) {
                        cellClass = "false";
                      }
                      if (cell > lapseThresh) {
                        cellClass = "lapse";
                      }
                      return <td key={idx} className={cellClass}>{cell}</td>;
                    })}
                  </tr>;
                }
              )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={cols} className="footer">
                    Times in ms. 'FS' means false start.
                  </td>
                </tr>
                <tr>
                  <td colSpan={cols} className="footer">
                    Valid window: {validThresh} - {lapseThresh}
                  </td>
                </tr>
              </tfoot>
            </table>
            </div>;
  } catch(err) {
    return <div> {err.message} </div>  ;       
  }
  
}



//-------------------------------------------------------
class Old_DataTable extends React.Component {
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

  toMatrix(arr, width) {
   return arr.reduce(function(rows, val, idx) {
     return (idx % width === 0 ? rows.push([val]) : 
       rows[rows.length - 1].push(val)) && rows;
   }, []);
  }

  render() {
    const lapseThresh = this.props.lapseThresh;
    const validThresh = this.props.validThresh;
    const results = this.props.results.map(
      function(item) {
        let val;
        item === null ? val = "FS" : val = Number(item);
        return val;
      }
    );
    // reshape to matrix
    const cols = 5;
    const mat = this.toMatrix(results, cols);  // false starts already labelled
    try {
      return <div className="results">
             <table>
               <caption>Response Time</caption>
               <tbody>
                {mat.map(
                  function(row, idx) {
                    return <tr key={idx}>
                      {row.map(function(cell, idx) {
                        let cellClass;
                        if (cell === "FS" || cell < validThresh) {
                          cellClass = "false";
                        }
                        if (cell > lapseThresh) {
                          cellClass = "lapse";
                        }
                        return <td key={idx} className={cellClass}>{cell}</td>;
                      })}
                    </tr>;
                  }
                )}
               </tbody>
               <tfoot>
                  <tr>
                    <td colSpan={cols} className="footer">
                     Times in ms. 'FS' means false start.
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={cols} className="footer">
                     Valid window: {validThresh} - {lapseThresh}
                    </td>
                  </tr>
               </tfoot>
             </table>
             </div>;
    } catch(err) {
      return <div> {err.message} </div>  ;       
    }
  }
}

export default DataTable;