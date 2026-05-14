const express = require("express");

const router = express.Router();

const db = require("../config/db");


// GET ALL PAYMENTS

router.get("/", (req, res) => {

    const sql =

        `
        SELECT *
        FROM payments
        ORDER BY payment_id DESC
        `;

    db.query(

        sql,

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Failed To Fetch Payments"

                });

            }

            res.json(result);

        }

    );

});


module.exports = router;