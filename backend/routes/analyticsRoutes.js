const express = require("express");
const router = express.Router();

const db = require("../config/db");

const verifyToken = require("../middleware/authMiddleware");


// TOTAL REVENUE

router.get("/analytics/revenue", verifyToken, (req, res) => {

    const sql = `
        SELECT
            SUM(total_amount) AS total_revenue
        FROM orders
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);
            res.status(500).send("Revenue Error");

        } else {

            res.json(result);

        }

    });

});


// TOTAL ORDERS

router.get("/analytics/orders", verifyToken, (req, res) => {

    const sql = `
        SELECT
            COUNT(order_id) AS total_orders
        FROM orders
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);
            res.status(500).send("Orders Error");

        } else {

            res.json(result);

        }

    });

});


// TOP SELLING PRODUCTS

router.get("/analytics/top-products", verifyToken, (req, res) => {

    const sql = `
        SELECT
            p.product_name,
            SUM(oi.quantity) AS total_sold

        FROM order_items oi

        JOIN products p
        ON oi.product_id = p.product_id

        GROUP BY p.product_name

        ORDER BY total_sold DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);
            res.status(500).send("Top Products Error");

        } else {

            res.json(result);

        }

    });

});


// MONTHLY SALES

router.get("/analytics/monthly-sales", verifyToken, (req, res) => {

    const sql = `
        SELECT
            MONTH(created_at) AS month,
            SUM(total_amount) AS revenue

        FROM orders

        GROUP BY MONTH(created_at)

        ORDER BY month
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);
            res.status(500).send("Monthly Sales Error");

        } else {

            res.json(result);

        }

    });

});

module.exports = router;