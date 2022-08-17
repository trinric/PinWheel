import React, { Component } from 'react';
import {Modal, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';
import {Posts} from '../api/posts';


class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
   }
  handleSubmit(){
    Posts.insert({
      postTime: this.state.date.toDate(),
      pin_id: this.props.pin,
      board_id: this.props.board,
    });
    this.props.onHide();
  }
  handleDisable(){
    // Posts.insert({
    //   postTime: new Date(),
    //   pin_id: this.props.pin,
    //   board_id: this.props.board,
    //   disabled: true
    // });
    this.props.onHide();
  }
  handleDelete(){
    Posts.remove(this.props.post[0]._id);
    this.props.onHide();
  }
  render() {
    const postExists = this.props.post.length > 0;
    let body;
    let bottomButton;
    let headerText;
    if(postExists){
      body = (<p>A post either already exists for this combination or you scheduled one within 30 days of right now.</p>);
      bottomButton = (<Button variant="danger" size="lg" block onClick = {this.handleDelete}>Delete posting (do at own risk)</Button>);
      headerText = (<p>POSTING ALREADY EXISTS</p>);
    }
    else {
      body = (<SingleDatePicker
        date={this.state.date} // momentPropTypes.momentObj or null
        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        isOutsideRange={() => false}
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id="your_unique_id" // PropTypes.string.isRequired,
      />);
      bottomButton =
      (<React.Fragment>
        <Button variant="primary" onClick={this.handleSubmit}>Submit Post</Button>
        <Button variant="warning" onClick={this.handleDisable}>Disable this cell</Button>
      </React.Fragment>);
      headerText = (<p>Choose the current or future date for your pin</p>);
    }
    return (
      <Modal size="lg" show={this.props.show} onHide= {this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer className="cell-modal-footer">
          {bottomButton}
        </Modal.Footer>
      </Modal>
    );
  }

}

export default PostModal;
