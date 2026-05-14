import React, {
    useContext
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    FaShoppingCart
} from "react-icons/fa";

import {
    AuthContext
} from "../context/AuthContext";

import {
    CartContext
} from "../context/CartContext";

import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const {
        user,
        logout
    } = useContext(AuthContext);

    const {
        cartItems
    } = useContext(CartContext);

    // LOGOUT

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="navbar">

            {/* LOGO */}

            <Link
                to="/"
                className="logo"
            >

                SmartRetail

            </Link>

            {/* MENU */}

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/orders">
                    Orders
                </Link>

                <Link to="/payments">
                    Payments
                </Link>

            </div>

            {/* RIGHT */}

            <div className="nav-right">

                {/* CART */}

                <Link
                    to="/cart"
                    className="cart-btn"
                >

                    <FaShoppingCart />

                    Cart

                    <span>

                        {
                            cartItems.length
                        }

                    </span>

                </Link>

                {/* USER */}

                {
                    user ? (

                        <div className="user-box">

                            {/* PROFILE AVATAR */}

                            <div

                                className="profile-circle"

                                onClick={() =>

                                    navigate("/profile")

                                }

                            >

                                {

                                    user?.name

                                        ?.charAt(0)

                                        .toUpperCase()

                                }

                            </div>

                            {/* USER NAME */}

                            <span>

                                {

                                    user?.name

                                }

                            </span>

                            {/* LOGOUT */}

                            <button
                                onClick={handleLogout}
                            >

                                Logout

                            </button>

                        </div>

                    ) : (

                        <Link
                            to="/login"
                            className="login-btn"
                        >

                            Login

                        </Link>

                    )
                }

            </div>

        </nav>

    );

}

export default Navbar;