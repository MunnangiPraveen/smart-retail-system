const express = require("express");

const router = express.Router();

const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// DEBUG

console.log("Auth Routes Loaded");


// REGISTER

router.post(

    "/register",

    async (req, res) => {

        console.log(req.body);

        try {

            const {

                fullName,

                email,

                password

            } = req.body;

            // HASH PASSWORD

            const hashedPassword =
                await bcrypt.hash(password, 10);

            const sql =

                `
                INSERT INTO users
                (full_name, email, password)
                VALUES (?, ?, ?)
                `;

            db.query(

                sql,

                [

                    fullName,

                    email,

                    hashedPassword

                ],

                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({

                            message:
                                "Registration Failed"

                        });

                    }

                    res.json({

                        message:
                            "User Registered Successfully"

                    });

                }

            );

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Server Error"

            });

        }

    }

);


// LOGIN

router.post(

    "/login",

    (req, res) => {

        console.log(req.body);

        const {

            email,

            password

        } = req.body;

        const sql =

            `
            SELECT *
            FROM users
            WHERE email = ?
            `;

        db.query(

            sql,

            [email],

            async (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({

                        message:
                            "Login Failed"

                    });

                }

                if (result.length === 0) {

                    return res.status(401).json({

                        message:
                            "User Not Found"

                    });

                }

                const user = result[0];

                // CHECK PASSWORD

                const validPassword =
                    await bcrypt.compare(

                        password,

                        user.password

                    );

                if (!validPassword) {

                    return res.status(401).json({

                        message:
                            "Invalid Password"

                    });

                }

                // TOKEN

                const token = jwt.sign(

                    {

                        id: user.user_id,

                        email: user.email

                    },

                    "smartRetailSecret",

                    {

                        expiresIn: "7d"

                    }

                );

                res.json({

                    message:
                        "Login Successful",

                    token,

                    user: {

                        id: user.user_id,

                        fullName:
                            user.full_name,

                        email:
                            user.email

                    }

                });

            }

        );

    }

);

module.exports = router;