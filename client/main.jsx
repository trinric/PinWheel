import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../imports/startup/accounts-config.js';
Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
