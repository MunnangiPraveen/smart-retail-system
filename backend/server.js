const express = require("express");

const cors = require("cors");

require("./config/db");

const productRoutes =
    require("./routes/productRoutes");

const authRoutes =
    require("./routes/authRoutes");

const orderRoutes =
    require("./routes/orderRoutes");

const cartRoutes =
    require("./routes/cartRoutes");

const paymentRoutes =
    require("./routes/paymentRoutes");

const analyticsRoutes =
    require("./routes/analyticsRoutes");

const app = express();

app.use(cors());

app.use(express.json());


// TEST ROUTE

app.get("/", (req, res) => {

    res.send(
        "Backend Running Successfully"
    );

});


// ROUTES

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/analytics", analyticsRoutes);


const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});