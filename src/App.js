import React from "react";
import { loadStripe } from "@stripe/stripe-js";

import Payment from './Payment'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";


 
 


// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe("pk_test_NqtC5d58MB9RN6aZ6rORtJCb");

const App = () => {
  const [status, setStatus] = React.useState("ready");

  if (status === "success") {
    return <div>Congrats on your empanadas!</div>;
  }

  return (
  
    <Elements stripe={stripePromise}>
      <Payment
        success={() => {
          setStatus("success");
        }}
      />
    </Elements>
  );
};

export default App;
