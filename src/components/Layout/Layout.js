import React from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;