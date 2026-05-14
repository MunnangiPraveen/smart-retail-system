const express = require("express");

const router = express.Router();

const db = require("../config/db");


// CREATE ORDER

router.post("/", (req, res) => {

    const {

        user_email,

        products,

        total_price,

        payment_method

    } = req.body;

    const orderSql =

        `
        INSERT INTO orders
        (
            user_email,
            products,
            total_price,
            payment_method
        )
        VALUES (?, ?, ?, ?)
        `;

    db.query(

        orderSql,

        [

            user_email,

            JSON.stringify(products),

            total_price,

            payment_method

        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Order Failed"

                });

            }

            // ORDER ID

            const orderId =
                result.insertId;

            // FAKE TRANSACTION ID

            const transactionId =

                "TXN" +

                Math.floor(

                    Math.random() * 1000000

                );

            // PAYMENT INSERT

            const paymentSql =

                `
                INSERT INTO payments
                (
                    order_id,
                    transaction_id,
                    amount,
                    payment_method,
                    payment_status
                )
                VALUES (?, ?, ?, ?, ?)
                `;

            db.query(

                paymentSql,

                [

                    orderId,

                    transactionId,

                    total_price,

                    payment_method,

                    "Success"

                ],

                (paymentErr, paymentResult) => {

                    if (paymentErr) {

                        console.log(paymentErr);

                        return res.status(500).json({

                            message:
                                "Payment Failed"

                        });

                    }

                    res.json({

                        message:
                            "Order Placed Successfully"

                    });

                }

            );

        }

    );

});


// GET ALL ORDERS

router.get(

    "/all",

    (req, res) => {

        const sql =

            `
            SELECT *
            FROM orders
            ORDER BY order_id DESC
            `;

        db.query(

            sql,

            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({

                        message:
                            "Failed To Fetch Orders"

                    });

                }

                res.json(result);

            }

        );

    }

);


// GET USER ORDERS

router.get("/:email", (req, res) => {

    const { email } = req.params;

    const sql =

        `
        SELECT *
        FROM orders
        WHERE user_email = ?
        ORDER BY created_at DESC
        `;

    db.query(

        sql,

        [email],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Failed To Fetch Orders"

                });

            }

            res.json(result);

        }

    );

});


// UPDATE ORDER STATUS

router.put(

    "/status/:id",

    (req, res) => {

        const { id } = req.params;

        const { status } = req.body;

        const sql =

            `
            UPDATE orders
            SET status = ?
            WHERE order_id = ?
            `;

        db.query(

            sql,

            [status, id],

            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({

                        message:
                            "Status Update Failed"

                    });

                }

                res.json({

                    message:
                        "Order Status Updated"

                });

            }

        );

    }

);


module.exports = router;