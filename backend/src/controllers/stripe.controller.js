import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentStripe = async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount, description } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description,
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
};

export default { paymentStripe };
