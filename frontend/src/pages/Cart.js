import React, {
    useContext
} from "react";

import {
    Link
} from "react-router-dom";

import {
    CartContext
} from "../context/CartContext";

import "../styles/cart.css";

function Cart() {

    const {

        cartItems,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity

    } = useContext(CartContext);

    const totalPrice =
        cartItems.reduce(

            (total, item) =>

                total +
                item.price * item.quantity,

            0

        );

    return (

        <div className="cart-page">

            <h1>
                Shopping Cart
            </h1>

            {
                cartItems.length === 0 ? (

                    <p className="empty-cart">
                        Your cart is empty
                    </p>

                ) : (

                    <div className="cart-container">

                        {/* LEFT */}

                        <div className="cart-items">

                            {
                                cartItems.map((item) => (

                                    <div
                                        className="cart-card"
                                        key={item.product_id}
                                    >

                                        <img
                                            src={item.image_url}
                                            alt="product"
                                        />

                                        <div className="cart-info">

                                            <h2>
                                                {item.product_name}
                                            </h2>

                                            <p>
                                                ₹{item.price}
                                            </p>

                                            <div className="quantity-box">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.product_id
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.product_id
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeFromCart(
                                                    item.product_id
                                                )
                                            }
                                        >

                                            Remove

                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                        {/* RIGHT */}

                        <div className="cart-summary">

                            <h2>
                                Order Summary
                            </h2>

                            <div className="summary-row">

                                <p>Total</p>

                                <h3>
                                    ₹{totalPrice}
                                </h3>

                            </div>

                            <Link to="/checkout">

                                <button>
                                    Proceed To Checkout
                                </button>

                            </Link>

                        </div>

                    </div>

                )
            }

        </div>

    );

}

export default Cart;