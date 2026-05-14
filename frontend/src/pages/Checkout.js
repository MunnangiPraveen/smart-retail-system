import React, {
    useContext,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api";

import {
    CartContext
} from "../context/CartContext";

import "../styles/checkout.css";

function Checkout() {

    const navigate = useNavigate();

    const {
        cartItems,
        clearCart
    } = useContext(CartContext);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            fullName: "",
            email: "",
            address: "",
            city: "",
            pincode: "",
            paymentMethod: "COD"

        });

    // HANDLE INPUTS

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    // TOTAL PRICE

    const totalPrice =
        cartItems.reduce(

            (total, item) =>

                total +
                item.price * item.quantity,

            0

        );

    // PLACE ORDER

    const handlePlaceOrder = async () => {

        // PREVENT DOUBLE CLICK

        if (loading) return;

        setLoading(true);

        try {

            const user =
                JSON.parse(

                    localStorage.getItem("user")

                );

            const orderData = {

                user_email:
                    user.email,

                products:
                    cartItems,

                total_price:
                    totalPrice,

                payment_method:
                    formData.paymentMethod

            };

            const response =
                await API.post(

                    "/orders",

                    orderData

                );

            alert(
                response.data.message
            );

            // CLEAR CART

            clearCart();

            // REMOVE LOCAL STORAGE CART

            localStorage.removeItem("cart");

            // REDIRECT

            navigate("/success");

        } catch (error) {

            console.log(error);

            alert("Order Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="checkout-page">

            <h1>
                Checkout
            </h1>

            <div className="checkout-container">

                {/* LEFT */}

                <div className="checkout-form">

                    <h2>
                        Delivery Details
                    </h2>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                    />

                    <textarea
                        name="address"
                        placeholder="Full Address"
                        onChange={handleChange}
                    />

                    <div className="checkout-row">

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            onChange={handleChange}
                        />

                    </div>

                    {/* PAYMENT */}

                    <h2>
                        Payment Method
                    </h2>

                    <select
                        name="paymentMethod"
                        onChange={handleChange}
                    >

                        <option value="COD">
                            Cash On Delivery
                        </option>

                        <option value="Card">
                            Credit / Debit Card
                        </option>

                        <option value="UPI">
                            UPI Payment
                        </option>

                    </select>

                </div>

                {/* RIGHT */}

                <div className="checkout-summary">

                    <h2>
                        Order Summary
                    </h2>

                    {
                        cartItems.map((item) => (

                            <div
                                className="summary-item"
                                key={item.product_id}
                            >

                                <p>
                                    {item.product_name}
                                </p>

                                <span>

                                    ₹
                                    {
                                        item.price *
                                        item.quantity
                                    }

                                </span>

                            </div>

                        ))
                    }

                    <div className="summary-total">

                        <h3>
                            Total
                        </h3>

                        <h2>
                            ₹{totalPrice}
                        </h2>

                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Placing Order..."
                                : "Place Order"
                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Checkout;