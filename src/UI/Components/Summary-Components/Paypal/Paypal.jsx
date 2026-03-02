// import React, { useEffect, useRef, useState } from 'react';
// import './Paypal.css';
// import { url } from '../../../../utils/api';
// import Image from 'next/image';
// import { useMyOrders } from '@/context/orderContext/ordersContext';

// const Paypal = () => {
//   const {
//     sendPaypalOrder
//   } = useMyOrders();
//   const paypalRef = useRef(null);
//   const [sdkReady, setSdkReady] = useState(false);

//   useEffect(() => {
//     const existingScript = document.getElementById('paypal-sdk');

//     if (existingScript) {
//       setSdkReady(true);
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = "https://www.paypal.com/sdk/js?client-id=AUSKOu68DQ_VOkt-8OkmsuXhyXs8CFM7t5ltloJ_63zpjAY9cwEuYqQUZxuC0TXjBlfPgeBDR4z_nTrT&currency=USD&disable-funding=card";
//     script.id = 'paypal-sdk';
//     script.async = true;
//     script.onload = () => setSdkReady(true);
//     document.body.appendChild(script);
//   }, []);

// useEffect(() => {
//   if (
//     sdkReady &&
//     window.paypal &&
//     paypalRef.current
//   ) {

//     // Clear old buttons
//     paypalRef.current.innerHTML = "";

//     const buttons = window.paypal.Buttons({
//       createOrder: async () => {
//         const orderData = await sendPaypalOrder();
//         return orderData?.paypalOrderId;
//       },

//       onApprove: async (data) => {
//         const res = await fetch(`${url}/capture-paypal-payment`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             paypalOrderId: data.orderID
//           })
//         });

//         const result = await res.json();

//         if (result.status === "success") {
//           localStorage.removeItem('cart2');
//           window.location.href =
//             `/order-confirmation/${result.orderId}`;
//         }
//       },

//       onCancel: () => alert("Payment cancelled"),
//       onError: (err) => console.error("PayPal Error:", err),
//     });

//     buttons.render(paypalRef.current);

//     return () => {
//       // Destroy when component unmounts
//       if (buttons.close) {
//         buttons.close();
//       }
//     };
//   }
// }, [sdkReady]);
//   return (
//     <div className='payment-type-paypal-main-container'>
//       <div className='payment-type-paypal-heading'>
//         <h3>Paypal</h3>
//         <Image src={'/Assets/icons/paypal-1.png'} width={35} height={35} alt='paypal' />
//       </div>
//       <div ref={paypalRef} id="paypal-button-container"></div>
//     </div>
//   );
// };

// export default Paypal;


import React, { useEffect, useRef, useState } from 'react';
import './Paypal.css';
import { url } from '../../../../utils/api';
import Image from 'next/image';
import { useMyOrders } from '@/context/orderContext/ordersContext';

const Paypal = () => {
  const { sendPaypalOrder } = useMyOrders();
  const paypalRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);

  // Script Loading Logic
  useEffect(() => {
    const scriptId = 'paypal-sdk';
    const existingScript = document.getElementById(scriptId);

    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AUSKOu68DQ_VOkt-8OkmsuXhyXs8CFM7t5ltloJ_63zpjAY9cwEuYqQUZxuC0TXjBlfPgeBDR4z_nTrT&currency=USD&disable-funding=card";
      script.id = scriptId;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => setSdkReady(true));
    }
  }, []);

  // Button Rendering Logic
  useEffect(() => {
    let buttons;

    if (sdkReady && window.paypal && paypalRef.current) {
      // Small timeout ensures the DOM node is painted before PayPal tries to grab it
      const renderTimeout = setTimeout(() => {
        if (!paypalRef.current) return;
        
        paypalRef.current.innerHTML = "";
        buttons = window.paypal.Buttons({
          createOrder: async () => {
            const orderData = await sendPaypalOrder();
            return orderData?.paypalOrderId;
          },
          onApprove: async (data) => {
            const res = await fetch(`${url}/capture-paypal-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paypalOrderId: data.orderID })
            });
            const result = await res.json();
            if (result.status === "success") {
              localStorage.removeItem('cart2');
              window.location.href = `/order-confirmation/${result.orderId}`;
            }
          },
          onCancel: () => alert("Payment cancelled"),
          onError: (err) => console.error("PayPal Error:", err),
        });

        if (buttons.isEligible()) {
          buttons.render(paypalRef.current);
        }
      }, 10);
    }

    return () => {
      if (buttons && buttons.close) {
        buttons.close();
      }
    };
  }, [sdkReady]);

  return (
    <div className='payment-type-paypal-main-container'>
      <div className='payment-type-paypal-heading'>
        <h3>Paypal</h3>
        <Image src={'/Assets/icons/paypal-1.png'} width={35} height={35} alt='paypal' />
      </div>
      {/* Ensure the ID matches what the SDK expects or use the ref */}
      <div ref={paypalRef} id="paypal-button-container"></div>
      {!sdkReady && <p>Loading PayPal...</p>}
    </div>
  );
};

export default Paypal;