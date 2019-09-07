import React from 'react';

function DataTable(props) {
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

export default DataTable;