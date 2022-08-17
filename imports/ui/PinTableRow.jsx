import React, { PureComponent } from 'react';
import PinTableCell from './PinTableCell.jsx';
import {Pins} from '../api/pins';

class PinTableRow extends PureComponent {
  /*
  Is a single row on the table, starts by making the pin header, then renders
  a single pin cell for each.
  */
  delete_pin(id, e){
    Pins.remove(id);
  }
  render() {
    return (
      <tr>
        <th>
          <button type="button" className="close" aria-label="Close" onClick={(e) => this.delete_pin(this.props.pin._id, e)}>
            <span aria-hidden="true">&times;</span>
          </button>
          {this.props.pin.name}
        </th>
        {this.render_cells()}
      </tr>
    );
  }
  render_cells(){
    return this.props.boards.map(board => {
      let posts = this.props.posts;
      posts = posts.filter(post => post.board_id == board._id);
      return (<PinTableCell key={board._id} pin={this.props.pin} board={board} post={posts} />);
  });
  }
}

export default PinTableRow;
