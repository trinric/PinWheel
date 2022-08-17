import React, { PureComponent } from 'react';
import PostModal from './PostModal.jsx';

class PinTableCell extends PureComponent {
  /*
  Little messy. Is a single cell that contains information about what board and
  pin it represents. The modal that appears when clicked is stored with it (I
  wasn't sure how else to do it to be honest snice you'd have to send the event
  back up through the parent components to the top. Maybe some event listener?)
  */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.state = {showModal: false};
  }
  handleClick() {
    if (this.state.showModal == false){
      this.handleModalShow()
    }
  }
  handleModalShow(){
    this.setState({ showModal: true })
  }
  handleModalHide(){
    this.setState({ showModal : false})
  }
  render() {
    const postExists = this.props.post.length > 0;
    const disabled = this.props.post.disabled;
    const postedAlready = this.props.board.posted_today();
    const disableModal = postedAlready && !postExists;
    let cellClass;
    let timeDif;
    let cellText;
    if(postExists) {
      var a = moment(this.props.post[0].postTime);
      var b = moment()
      timeDif = a.diff(b, 'days')
      cellText = this.props.post[0].postTime.toDateString();
    }
    else {
      cellText = "OPEN"
    }
    if (postedAlready) {
      if(!postExists){
        cellText = "Posted in this board today";
        cellClass = "table-secondary";
      }
      else {
        cellClass = "table-danger";
      }
    }
    else if(this.props.post.length == 0){
      cellClass = "table-success"
    }
    else if(timeDif > 30 || timeDif < -30) {
      cellClass = "table-info"
    }
    else if(timeDif <= 0 && timeDif >= -30) {
      cellClass = "table-danger"
    }
    else if(timeDif > 0 && timeDif <= 30){
      cellClass = "table-warning"
    }
    return (
      <td className={cellClass} onClick={this.handleClick}>
        {cellText}
        {!disableModal && <PostModal
          pin={this.props.pin._id}
          board={this.props.board._id}
          post={this.props.post}
          show={this.state.showModal}
          onHide = {this.handleModalHide}/>}
      </td>
    );
  }

}

export default PinTableCell;
