import React, { Component } from 'react';
import '../Filter.css';

class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <img src="" alt="" />
        <input type="text" onChange={(e) => {
          this.props.onTextChange(e.target.value)
        }} />
      </div>
    );
  }
}

export default Filter;
