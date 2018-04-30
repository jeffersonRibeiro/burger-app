import React, { Component } from 'react';
import Proptypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {

  render() {
    const { type } = this.props;
    let ingredient = null;

    switch (type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case "bread-top":
        ingredient = <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>;
        break;
      case "meat":
        ingredient = <div className={classes.Meat} />;
        break;
      case "cheese":
        ingredient = <div className={classes.Cheese} />;
        break;
      case "salad":
        ingredient = <div className={classes.Salad} />;
        break;
      case "bacon":
        ingredient = <div className={classes.Bacon} />;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
};

BurgerIngredient.propTypes = {
  type: Proptypes.string.isRequired
};

export default BurgerIngredient;