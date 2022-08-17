import { Meteor } from 'meteor/meteor';

import '../imports/api/boards.js';
import '../imports/api/pins.js';
import '../imports/api/posts.js';
function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {

});
