import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
        .then(res => {
          this.setState({ingredients: res.data});
        })
        .catch(error => {
          this.setState({error: true});
        });
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients,
    };
    const sum = Object.keys(ingredients)
          .map(igKey => {
            return ingredients[igKey];
          })
          .reduce( (sum, el) => sum + el, 0 );

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients}, () => {
      this.updatePurchaseState();
    });

  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount === 0)
      return false;
    
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients}, () => {
      this.updatePurchaseState();
    })
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Jefferson Ribeiro',
        address: {
          street: 'Rua Abadia dos Dourados',
          zipCode: '05586030',
          country: 'Brazil',
        },
        email: 'jefferson.ribeiro.contato@gmail.com',
      },
      deliveryMethod: 'fastest',
    }

    this.setState({loading: true});

    axios.post('/orders.json/', order)
        .then(res => {
          this.setState({loading: false, purchasing: false});
          console.log(res);
        })
        .catch(err => {
          this.setState({loading: false, purchasing: false});          
          console.log(err);
        });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    
    if(this.state.ingredients){
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    }

    if(!!this.state.loading){
      orderSummary = <Spinner />;
    }

    let burger = !!this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if(!!this.state.ingredients){
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </React.Fragment>
      );
    }

    return(
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);