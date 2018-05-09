import React from 'react';

import classes from './Spinner.css';

const spinner = () => {
  return(
    <div class={classes.Loader}>Loading...</div>
  );
}

export default spinner;