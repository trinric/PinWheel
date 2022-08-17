import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Boards} from '../api/boards.js';
import {Pins} from '../api/pins.js';

class NewForm extends Component {
  handleBoardSubmit(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.boardInput).value.trim();
    console.log(text);

    Boards.insert({
      name: text
    });

    ReactDOM.findDOMNode(this.refs.boardInput).value = '';
  }
  handlePinSubmit(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.pinInput).value.trim();
    Pins.insert({
      name: text
    });
    ReactDOM.findDOMNode(this.refs.pinInput).value = '';
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <form onSubmit={this.handleBoardSubmit.bind(this)}>
            <div className="form-group">
              <label>Board Name</label>
              <input ref="boardInput" className="form-control form-control-lg" type="text" placeholder="random board"/>
            </div>
          </form>
        </div>
        <div className="col-sm">
          <form onSubmit={this.handlePinSubmit.bind(this)}>
            <div className="form-group">
              <label>Pins Name</label>
              <input ref="pinInput" className="form-control form-control-lg" type="text" placeholder="random pin"/>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default NewForm;
