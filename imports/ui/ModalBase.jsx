import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById( 'modal-root' );

class ModalBase extends Component {
  constructor(props){
    super(props);
    this.element = document.createElement('div');
  }
  componentDidMount(){
    modalRoot.appendChild(this.element);
  }
  componentWillUnmount(){
    modalRoot.removeChild(this.element);
  }
  render() {
    return createPortal(this.props.children, this.element);
  }
}

export default ModalBase;
