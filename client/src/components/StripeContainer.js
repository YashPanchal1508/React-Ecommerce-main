import React,{useState} from "react";
import { useCartContext } from "../context/CartContext";
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "../styles/Button";
import Sucess from "../components/Sucess.js"
import CancelComponent from "../components/Canceled.js"
import styled from "styled-components";

const StripeContainer = () => {
  const { cart, total_item, shipping_fee, total_amount, clearCart } = useCartContext();

  const [success, setSuccess] = useState(false)
  const [cancle, setCancle] = useState(false)

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51NqrX2SAya69TUBdjscWQUvfIpwKLNTLVoVZtJynMZpGlEC48qifNP7n21xj6ci9XuOZlaWV2Z7LpSti2altD7IX002bMtCUmE");

    const body = {
      product: cart,
      total_item,
      shipping_fee,
      total_amount
    }
    const headers = {
      "content-type": "application/json"
    }
    const response = await fetch("https://react-ecommerce-jys4.onrender.com/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();
    setSuccess(true)
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
      setCancle(true)
    } 

    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    // const success = query.get("success");
    // const canceled = query.get("canceled");
  
    if (success) {
      return <Sucess />
    }
  
    if (cancle) {
      return <CancelComponent />;
    }

  }
  return (
    <Wrapper>
      <div className="container">
        <Button onClick={makePayment} className="center" >Pay Now</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    display: flex;
    justify-content: center;
  }
`

export default StripeContainer;
