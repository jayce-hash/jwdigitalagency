const stripe = require(“stripe”)(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
if (event.httpMethod !== “POST”) {
return { statusCode: 405, body: “Method Not Allowed” };
}

```
try {
    const { amount, services, customerName, customerEmail } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // in cents, e.g. 37500 = $375.00
        currency: "usd",
        payment_method_types: ["card"],
        description: `JW Digital deposit - ${services}`,
        receipt_email: customerEmail,
        metadata: {
            customer_name: customerName,
            services_ordered: services,
        },
    });

    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
} catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
    };
}
```

};
