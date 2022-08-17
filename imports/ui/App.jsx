import React from 'react';
import Info from './Info.jsx';
import PinTable from './PinTable.jsx';
import NewForm from './NewForm.jsx';
import { Meteor } from 'meteor/meteor';
import {Navbar, Container} from 'react-bootstrap';

import AccountsUIWrapper from './AccountsUIWrapper.js';

const App = () => (
  <React.Fragment>
    <Navbar bg="light">
      <Navbar.Brand href="#home">Pinwheel</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <AccountsUIWrapper />
      </Navbar.Collapse>
    </Navbar>
    <Container fluid={true}>
      <NewForm />
      <PinTable />
    </Container>
  </React.Fragment>
);

export default App;
