// import {createPaymentPage} from 'paytabs_pt2'
// import PayTabs from "paytabs_pt2";
import axios from "axios";
import { v4 } from 'uuid'; 
import User from "./models/User.js";

export default async function createPage(req, res) {
  const user=await User.findById(req.userId)

let paymentMethods = ["creditcard"];

const cart = {
  id: req.body.cartId,
  currency: "SAR",
  amount: req.body.amount,
  description: "Sample Cart",
};
const customer = {
  name: user.userName,
  email: user.email,
  phone: "1234567890",
  street1: "123 Main St",
  city: "Anytown",
  state: "CA",
  country: "SAU",
  zip: "12345",
  IP: "192.168.1.1",
};
const url = {
  response: "https://webhook.site/5a9e05a0-10f5-4307-9fd3-cf8e7faf55cf",
  callback: "https://webhook.site/5a9e05a0-10f5-4307-9fd3-cf8e7faf55cf",
};


let lang = "ar";



  const data = {
    profile_id: process.env.PAY_TABS_PROFILE_ID,
    tran_type: 'sale',
    tran_class: 'ecom',

    cart_id: cart.id,
    cart_currency: 'SAR',
    cart_amount: cart.amount,
    cart_description: cart.description,

    hide_shipping: true,
    customer_details: customer,
    shipping_details: customer,

    return: url.response,
    callback: url.callback,

    lang: lang,
    payment_methods: paymentMethods,
    frame_mode:  true,

  };
 

  const request = await axios.post(
    'https://secure.paytabs.sa/payment/request',
    data,
    {
      headers: {
        Authorization: process.env.PAY_TABS_API_KEY,
      },
    }
  );

  const result = {
    payment_reference: v4(),
    redirect_link: request.data.redirect_url,
    transaction_reference: request.data.tran_ref,
  };
   

  res.json(result);
}

