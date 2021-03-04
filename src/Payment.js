import React , { useEffect, useState }  from "react";
import PaymentCard from './components/customCard/PaymentCard'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
const Payment = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { fullName, email } = props;
  const [cardType, setCardType] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    // Block native form submission.
    props.setIsLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmCardPayment(props.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: fullName,
        },
      },
      // receipt_email: email,
    });
    props.setIsLoading(false);

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      props.onError(result.error.message);
      // console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        // props.onClose();
        props.onSuccess();
      }
    }
  };

  const onChangeCard = (event) => {
   
    setCardType(event.brand);
  };
  const onName = (event) => {
   
    setName(event.target.value);
  };


  return (
    <div>
    
             
    <form id="stripeForm" onSubmit={handleSubmit}>

      <div
        style={{ margin: "2rem", display: "flex", justifyContent: "center" }}
      >
        <label>
          Card holder name:
          <input type="text"  onChange={onName}  />
             </label>
        <div>
          <div>
            <PaymentCard
              bank="sadaqah"
              model="normal"
              type="black"
              style={{ width: "100%!important" }}
              brand={cardType}
              number="1234567890123456"
              cvv="123"
              holderName={name?name:""}
              expiration="09/24"
              flipped={false}
            />
          </div>
          <div>
            <div style={{ marginTop: "2rem", marginBottom: "-1rem" }}>
              <CardElement onChange={onChangeCard} />
            </div>
          </div>
        </div>
      </div>

      {/* <PaymentRequestButtonElement/> */}
    </form>
    </div>
  );
};


export default Payment;


  
  
  