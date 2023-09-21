import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../../store/AuthContext';

const PurchasePremium = () => {
	const authCtx = useContext(AuthContext);
	const buyPremium = async () => {
    try {
      const token = localStorage.getItem("token");
      const orderResponse = await fetch(`${process.env.REACT_APP_BACKEND_API}/purchase/buyPrimium`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      const orderData = await orderResponse.json();
  
      const options = {
        "key": orderData.key_id,
        "order_id": orderData.order.id,
        "handler": async (response) => {
          const paymentResponse = await fetch(`${process.env.REACT_APP_BACKEND_API}/purchase/updatePremium`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            },
            body: JSON.stringify({
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            })
          });
          if (paymentResponse.ok) {
            alert("You are a Premium User now!");
            authCtx.updatePremium();
          } else {
            console.error("Failed to update premium status");
          }
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on('payment.failed', async (response) => {
        console.log(response, "payment failed!");
  
        const failureResponse = await fetch(`${process.env.REACT_APP_BACKEND_API}/purchase/updateFailedOrder`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({
            order_id: options.order_id
          })
        });
        if (!failureResponse.ok) {
          console.error("Failed to update failed order status");
        }
        alert("Payment Failed, Something went Wrong!");
      });
    } catch (error) {
      console.error("Error in buyPremium function:", error);
    }
  };

  return (
    <Button onClick={buyPremium} >Buy Premium</Button>
  )
}

export default PurchasePremium