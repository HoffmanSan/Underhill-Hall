// Imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

// Components
import { CheckoutForm } from "../../components/index";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY, {
  locale: 'en'
});

export default function Payment() {
  let data = useLocation();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (data.state !== null) {
      const getSecret = async () => {
        await axios.post(`https://${process.env.VERCEL_URL}:4000/api/secret`, {
          currency: 'pln',
          amount: data.state.reservationCost * 100,
        }).then((response) => {
          const secret = response.data.clientSecret.client_secret;
          setClientSecret(secret)
        })
      }
      getSecret();
    }
  }, [data.state])

  const appearance = {
    theme: 'night',
    labels: 'floating',
    variables: {
      fontFamily: 'Poppins, sans-serif',
      fontWeightNormal: '500',
      borderRadius: '8px',
      colorBackground: '#0A2540',
      colorPrimary: '#0A2540',
      colorPrimaryText: 'white',
      colorBackgroundText: 'white',
      colorText: 'white',
      colorTextSecondary: '#727F96',
      colorTextPlaceholder: '#727F96',
      colorIconTab: 'white',
      colorLogo: 'dark'
    },
    rules: {
      '.Input, .Block, .Tab': {
        border: '2px solid none',
      },
      '.Input::placeholder': {
        fontFamily: 'Poppins, sans-serif'
      },
      '.Tab:focus, .Tab:active, .Tab--selected': {
        border: '2px solid blue',
      }
    }
  };

  return (
    <>
      {clientSecret && (
        <Elements 
          stripe={stripePromise}
          options={{clientSecret, appearance}}>
          <CheckoutForm
            userName={data.state.userName}
            userEmail={data.state.userEmail}
            userSeats={data.state.userSeats}
            eventRef={data.state.eventRef}
            reservationCost={data.state.reservationCost}
          />
        </Elements>
      )}
    </>
  );
}

