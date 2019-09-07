import React from 'react';

/************************************************* 
 * This displays and allows user to edit the `settings` object.
 * `settings` structure is: {key: value, key: value}
 * `settings` object is received in props.
 * Also rec'd in props is a CB that will returned updated object
 * to state at higher level.
***************************************************/

function Settings(props) {
  const handleChange = (e) => {
      console.log("From Settings.handleChange: called");
      //let tempSettings = this.props.settings;
      // below: checking issues with mutation
      let tempSettings = JSON.parse(JSON.stringify(props.settings));
      tempSettings[e.target.name] = e.target.value;
      props.cb(tempSettings);  // pass up to state
    return;
  }
  let settings = props.settings;  // get obj from props
  let rows = Object.keys(settings).map( (item) => {
    return <tr key={item}>
        <td>{item}</td>
        <td>
            <input type="text" value={settings[item]} 
            onChange={handleChange}
            name={item}
            />
        </td>
        </tr>
  });
  return( 
    <div>
      <h1>Settings</h1>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default Settings;