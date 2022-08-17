import { Mongo } from 'meteor/mongo';
import {Posts} from './posts';

export const Boards = new Mongo.Collection('boards');

Boards.helpers({
  posted_today(){
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    var post = Posts.find({board_id: this._id, postTime: {$gte: today, $lt: tomorrow}}).fetch();
    if(post.length > 0){
      return true;
    }
    else{
      return false;
    }
  }
})
