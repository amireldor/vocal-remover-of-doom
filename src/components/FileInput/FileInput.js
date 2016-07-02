/**
 * This is a true false file input HTML element.
 * It's a button with a hidden real file input element so it becomes
 * pretty and beautiful
 */
import React, {Component, PropTypes} from 'react';

export default class FileInput extends Component {
  static propTypes = {
    onFileChange: PropTypes.func.isRequired,
    fileSelected: PropTypes.bool,
    fileName: PropTypes.string
  }

  render() {
    const styles = require('./FileInput.scss');
    return (
      <div>
        <button className={styles.button} onClick={() => this.refs.fileInput.click()}>
          Browse for file...
        </button>
        <input className={styles.inputElement} type="file" ref="fileInput"
               onChange={this.props.onFileChange} />
        <span className={styles.fileName}>{this.props.fileName}</span>
      </div>
    );
  }
}
