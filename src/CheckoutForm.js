import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';

export default class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const {stripe, elements} = this.props;
    const [cardType, setCardType] = useState("");
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };
   onChangeCard = (event) => {
    setCardType(event.brand);
  };
  render() {
    const {stripe} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement onChange={onChangeCard}  />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    ); 
  }
}

