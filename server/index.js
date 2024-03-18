const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_51NqrX2SAya69TUBdcYVQ9wnUqGc4PD33DzDyqIEFXTYStsMZ8bphFHDEuVxsoE1ISjvXNoqhgYjTt4h5MmGmNJFu00AQT73xeq");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/payment", async (req, res) => {
    const { product } = req.body;
    console.log(product);

    const lineItems = product.map((product) => {
        // Sanitize and encode the image URL
        const sanitizedImageUrl = product.image[0].url // Trim whitespace
       
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.name,
                    images: [sanitizedImageUrl] 
                },
                unit_amount: product.price
            },
            quantity: product.amount
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${"https://react-ecommerce-yash.onrender.com/success"}?success=true`,
            cancel_url: `${"https://react-ecommerce-yash.onrender.com/canceled"}?canceled=true`,
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: "An error occurred while processing the payment." });
    }
});
app.get('/', (req,res) => {
    res.send('Hello World!');
})
app.listen(8282, () => console.log("8282 Port is working"));
