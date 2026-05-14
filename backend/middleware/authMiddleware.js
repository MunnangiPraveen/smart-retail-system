const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {

        return res.status(403).send("Access Denied");

    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "SECRET_KEY", (err, decoded) => {

        if (err) {

            return res.status(401).send("Invalid Token");

        }

        req.user = decoded;

        next();

    });

};

module.exports = verifyToken;