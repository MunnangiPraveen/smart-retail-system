import React from "react";

import {
    Link
} from "react-router-dom";

import {
    FaCheckCircle
} from "react-icons/fa";

import "../styles/success.css";

function Success() {

    return (

        <div className="success-page">

            <div className="success-card">

                <FaCheckCircle />

                <h1>
                    Order Placed Successfully
                </h1>

                <p>

                    Thank you for shopping with us.
                    Your order has been placed
                    successfully and is now being processed.

                </p>

                <div className="success-buttons">

                    <Link to="/orders">

                        View Orders

                    </Link>

                    <Link to="/products">

                        Continue Shopping

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Success;