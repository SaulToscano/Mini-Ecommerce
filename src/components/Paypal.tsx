import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import {paypalKey} from '../utils'
import {reduxInitialStateInterface} from "../interfaces/interface"
import { useEffect, useState } from "react";

function App({cartProducts}: reduxInitialStateInterface) {
  const [cartPrice, setCartPrice] = useState('0')
  
  const FUNDING_SOURCES = [
    FUNDING.PAYPAL,
    FUNDING.CARD
  ];

  const initialOptions = {
    "clientId": paypalKey,
    "enable-funding": "paylater,venmo",
  }

  useEffect(() => {
    const price = cartProducts.reduce((prev, current) => {
      return prev + (current.product.price * current.qty)
    }, 0)

    const stringPrice = price.toFixed(2).toString()
    setCartPrice(stringPrice)
  }, [cartProducts])

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        {
          FUNDING_SOURCES.map(fundingSource => {
            return (
              <PayPalButtons
                fundingSource={fundingSource}
                key={fundingSource}
                style={{
                  layout: 'vertical',
                  shape: 'pill',
                  color: 'black',
                }}
                createOrder={async (_, actions) => {

                  return actions.order.create({
                    purchase_units: [
                      {
                        description: "sunflower",
                        amount: {
                          currency_code: "USD", 
                          value: cartPrice
                        },
                      },
                    ]
                  })      
                }}
              />)
          })
        }
      </PayPalScriptProvider>
    </div>
  );
}


export default App;