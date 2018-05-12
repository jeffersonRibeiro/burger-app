import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends Component  {
  

  render() {
    console.log(this.props);
    
    let transformedIngredients = Object.keys(this.props.ingredients)
          .map(igKey => {
            return [...Array(this.props.ingredients[igKey])].map( (_, i) => {
              return <BurgerIngredient key={igKey + i} type={igKey} />
            });
          })
          .reduce( (arr, el) => arr.concat(el), []);
    
    if(transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return(
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  }

}

Burger.proptypes = {
  ingredients: Proptypes.object.isRequired,
}



export default withRouter(Burger);