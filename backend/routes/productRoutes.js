const express = require("express");

const router = express.Router();

const db = require("../config/db");


// GET ALL PRODUCTS

router.get("/", async (req, res) => {

    try {

        const [products] = await db.query(

            `
            SELECT *
            FROM products
            ORDER BY product_id DESC
            `
        );

        res.json(products);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Failed To Fetch Products"

        });

    }

});


// GET SINGLE PRODUCT

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [product] = await db.query(

            `
            SELECT *
            FROM products
            WHERE product_id = ?
            `,
            [id]

        );

        res.json(product);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Failed To Fetch Product"

        });

    }

});


// ADD PRODUCT

router.post("/", async (req, res) => {

    try {

        const {

            product_name,

            description,

            price,

            image_url

        } = req.body;

        await db.query(

            `
            INSERT INTO products
            (
                product_name,
                description,
                price,
                image_url
            )
            VALUES (?, ?, ?, ?)
            `,
            [

                product_name,

                description,

                price,

                image_url

            ]

        );

        res.json({

            message:
                "Product Added Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Failed To Add Product"

        });

    }

});


// UPDATE PRODUCT

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {

            product_name,

            description,

            price,

            image_url

        } = req.body;

        await db.query(

            `
            UPDATE products
            SET

                product_name = ?,

                description = ?,

                price = ?,

                image_url = ?

            WHERE product_id = ?
            `,
            [

                product_name,

                description,

                price,

                image_url,

                id

            ]

        );

        res.json({

            message:
                "Product Updated Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Failed To Update Product"

        });

    }

});


// DELETE PRODUCT

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(

            `
            DELETE FROM products
            WHERE product_id = ?
            `,
            [id]

        );

        res.json({

            message:
                "Product Deleted Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Failed To Delete Product"

        });

    }

});


module.exports = router;