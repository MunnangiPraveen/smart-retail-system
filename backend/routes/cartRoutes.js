const express = require("express");
const router = express.Router();

const db = require("../config/db");

const verifyToken = require("../middleware/authMiddleware");


// ADD TO CART

router.post("/cart", verifyToken, (req, res) => {

    const user_id = req.user.id;

    const {
        product_id,
        quantity
    } = req.body;

    // CHECK IF USER ALREADY HAS CART

    const checkCartSql = `
        SELECT * FROM cart
        WHERE user_id = ?
    `;

    db.query(checkCartSql, [user_id], (err, cartResult) => {

        if (err) {

            console.log(err);
            return res.status(500).send("Cart Error");

        }

        // IF CART DOES NOT EXIST

        if (cartResult.length === 0) {

            const createCartSql = `
                INSERT INTO cart (user_id)
                VALUES (?)
            `;

            db.query(createCartSql, [user_id], (err, newCart) => {

                if (err) {

                    console.log(err);
                    return res.status(500).send("Cart Creation Failed");

                }

                insertCartItem(newCart.insertId);

            });

        } else {

            insertCartItem(cartResult[0].cart_id);

        }

    });

    // INSERT ITEM FUNCTION

    function insertCartItem(cart_id) {

        const itemSql = `
            INSERT INTO cart_items
            (cart_id, product_id, quantity)
            VALUES (?, ?, ?)
        `;

        db.query(

            itemSql,

            [
                cart_id,
                product_id,
                quantity
            ],

            (err, result) => {

                if (err) {

                    console.log(err);
                    res.status(500).send("Add To Cart Failed");

                } else {

                    res.send("Product Added To Cart");

                }

            }

        );

    }

});


// VIEW CART

router.get("/cart", verifyToken, (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            ci.cart_item_id,
            p.product_name,
            p.price,
            ci.quantity
        FROM cart_items ci

        JOIN cart c
        ON ci.cart_id = c.cart_id

        JOIN products p
        ON ci.product_id = p.product_id

        WHERE c.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) {

            console.log(err);
            res.status(500).send("Error Fetching Cart");

        } else {

            res.json(result);

        }

    });

});


// REMOVE FROM CART

router.delete("/cart/:id", verifyToken, (req, res) => {

    const cart_item_id = req.params.id;

    const sql = `
        DELETE FROM cart_items
        WHERE cart_item_id = ?
    `;

    db.query(sql, [cart_item_id], (err, result) => {

        if (err) {

            console.log(err);
            res.status(500).send("Remove Failed");

        } else {

            res.send("Item Removed From Cart");

        }

    });

});

module.exports = router;