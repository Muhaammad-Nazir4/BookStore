const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NeB1oCjjtnAMxY3nRbuO0Epv0KWozrAEejT4fCL7NXtjcGPfNnRcVLoIC5ALMEbUMh0L2sAc5pEM9U1Bho7Jjna003Mlm2Vh2');

router.get('/', async (req, res) => {
  var  RoomNo= req.query.roomNo;
  var  RoomPrice= req.query.roomPrice;
  var  RoomImage= req.query.roomImage;
  console.log(RoomNo,RoomImage,RoomPrice);

  try {
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'pkr',
        product_data: {
          name: RoomNo,
          images: [RoomImage],  // Use 'images' instead of 'Image'
        },
        unit_amount: RoomPrice * 100,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: `http://localhost:4000/?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: 'http://localhost:4000',
});

res.send(session.url);

  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("An error occurred while initiating payment.");
  }
});

module.exports = router;

