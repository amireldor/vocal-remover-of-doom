/**
 * This is a true false file input HTML element.
 * It's a button with a hidden real file input element so it becomes
 * pretty and beautiful
 */
import React, {Component, PropTypes} from 'react';

export default class FileInput extends Component {
  static propTypes = {
    onFileChange: PropTypes.func.isRequired
  }

  render() {
    const styles = require('./FileInput.scss');
    return (
        <div>
          <button className={styles.button} >Browse for file...</button>
          <input className={styles.inputElement} type="file" ref="fileInput"
            onChange={this.props.onFileChange} />
        </div>
    );
  }
}
