import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Boards} from '../api/boards';
import {Pins} from '../api/pins';
import {Posts} from '../api/posts';

import PinTableRow from './PinTableRow.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';

class PinTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      deleteModal: false,
      deleteId: 0,
    };
    this.deleteModalHide = this.deleteModalHide.bind(this);
    this.deleteThisBoard = this.deleteThisBoard.bind(this);
  }
  deleteThisBoard(id) {
    Boards.remove(id);
  }
  deleteModalShow(id, e){
    this.setState({ deleteModal: true });
    this.setState({ deleteId: id});
  }
  deleteModalHide(){
    this.setState({ deleteModal: false});
    this.setState({ deleteId: 0});
  }
  render_rows(){
    const rows = this.props.pins.map((pin) => {
      let posts =  this.props.posts;
      posts = posts.filter(post => post.pin_id == pin._id);
      return (<PinTableRow key={pin._id} pin={pin} boards={this.props.boards} posts={posts} />);
    });
    return rows;
  }
  table_header(boards){
    return boards.map((board) => (
      <th key={board._id} scope="col">
        <button type="button" className="close" aria-label="Close" onClick={(e) => this.deleteModalShow(board._id, e)}>
          <span aria-hidden="true">&times;</span>
        </button>
        {board.name}
      </th>
    ))
  }
  render() {
    const boards = this.props.boards;
    return (
      <React.Fragment>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              {this.table_header(boards)}
            </tr>
          </thead>
          <tbody>
            {this.render_rows()}
          </tbody>
        </table>
        <ConfirmDelete handleConfirm={this.deleteThisBoard} collectionId={this.state.deleteId} show={this.state.deleteModal} onHide={this.deleteModalHide}/>
      </React.Fragment>
    );
  }
}

export default PinTableContainer = withTracker(() => {
  return {
    boards: Boards.find().fetch(),
    pins: Pins.find().fetch(),
    posts: Posts.find().fetch()
  };
})(PinTable);
