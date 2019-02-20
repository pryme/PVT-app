import React from 'react';

/************************************************* 
 * This displays and allows user to edit the `settings` object.
 * `settings` structure is: {key: value, key: value}
 * `settings` object is received in props.
 * Also rec'd in props is a CB that will returned updated object
 * to state at higher level.
***************************************************/
class Settings extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      let tempSettings = this.props.settings;
      tempSettings[e.target.name] = e.target.value;
      this.props.cb(tempSettings);  // pass up to state
    return;
  }

  render() {
      let settings = this.props.settings;  // get obj from props
      let rows = Object.keys(settings).map( (item) => {
        return <tr>
            <td>{item}</td>
            <td>
                <input type="text" value={settings[item]} 
                onChange={this.handleChange}
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
}

export default Settings;