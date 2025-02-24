const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST instead." });
    }

    const { amount } = req.body;

    // Validate the amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ error: "Invalid or missing 'amount' in the request body." });
    }

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount), // Ensure the amount is an integer
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    } catch (error) {
        console.error("Error creating PaymentIntent:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
