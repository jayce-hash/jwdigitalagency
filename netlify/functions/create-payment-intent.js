exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { amount, services, customerName, customerEmail } = JSON.parse(event.body);

        const params = new URLSearchParams({
            amount: amount,
            currency: "usd",
            "payment_method_types[]": "card",
            description: `JW Digital deposit - ${services}`,
            receipt_email: customerEmail,
            "metadata[customer_name]": customerName,
            "metadata[services_ordered]": services,
        });

        const response = await fetch("https://api.stripe.com/v1/payment_intents", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.STRIPE_SECRET_KEY}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        const paymentIntent = await response.json();

        if (paymentIntent.error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: paymentIntent.error.message }),
            };
        }

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
};
