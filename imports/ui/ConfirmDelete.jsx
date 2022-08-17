import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import ModalBase from './ModalBase.jsx';

class ConfirmDelete extends Component {
  constructor(props){
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  handleConfirm(){
    this.props.handleConfirm(this.props.collectionId);
    this.props.onHide();
  }
  render() {
    return (
      <ModalBase>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Filler Text</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Go back!</Button>
            <Button onClick={this.handleConfirm} variant="danger">DELETE</Button>
          </Modal.Footer>
        </Modal>
      </ModalBase>
    );
  }

}

export default ConfirmDelete;
