const express = require("express");

const router = express.Router();

const db = require("../config/db");


// GET ALL PRODUCTS

router.get("/", (req, res) => {

    const sql =
        `
        SELECT *
        FROM products
        ORDER BY product_id DESC
        `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({

                message:
                    "Failed To Fetch Products"

            });

        }

        res.json(result);

    });

});


// GET SINGLE PRODUCT

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql =

        `
        SELECT *
        FROM products
        WHERE product_id = ?
        `;

    db.query(

        sql,

        [id],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Failed To Fetch Product"

                });

            }

            res.json(result);

        }

    );

});


// ADD PRODUCT

router.post("/", (req, res) => {

    const {

        product_name,

        description,

        price,

        image_url

    } = req.body;

    const sql =

        `
        INSERT INTO products
        (
            product_name,
            description,
            price,
            image_url
        )
        VALUES (?, ?, ?, ?)
        `;

    db.query(

        sql,

        [

            product_name,

            description,

            price,

            image_url

        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Failed To Add Product"

                });

            }

            res.json({

                message:
                    "Product Added Successfully"

            });

        }

    );

});


// UPDATE PRODUCT

router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {

        product_name,

        description,

        price,

        image_url

    } = req.body;

    const sql =

        `
        UPDATE products
        SET

            product_name = ?,

            description = ?,

            price = ?,

            image_url = ?

        WHERE product_id = ?
        `;

    db.query(

        sql,

        [

            product_name,

            description,

            price,

            image_url,

            id

        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Failed To Update Product"

                });

            }

            res.json({

                message:
                    "Product Updated Successfully"

            });

        }

    );

});


// DELETE PRODUCT

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const sql =

        `
        DELETE FROM products
        WHERE product_id = ?
        `;

    db.query(

        sql,

        [id],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Failed To Delete Product"

                });

            }

            res.json({

                message:
                    "Product Deleted Successfully"

            });

        }

    );

});


module.exports = router;