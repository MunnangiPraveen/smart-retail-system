import React, {
    useState,
    useContext
} from "react";

import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    signInWithPopup
} from "firebase/auth";

import {
    auth,
    provider
} from "../firebase";

import API from "../services/api";

import {
    AuthContext
} from "../context/AuthContext";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const { login } =
        useContext(AuthContext);

    const [formData, setFormData] =
        useState({

            email: "",

            password: ""

        });

    // HANDLE INPUTS

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    // NORMAL LOGIN

    const handleLogin =
        async () => {

            try {

                const response =

                    await API.post(

                        "/auth/login",

                        formData

                    );

                // SAVE TOKEN

                localStorage.setItem(

                    "token",

                    response.data.token

                );

                // SAVE USER

                localStorage.setItem(

                    "user",

                    JSON.stringify(

                        response.data.user

                    )

                );

                // CONTEXT LOGIN

                login(
                    response.data.user
                );

                alert(
                    "Login Successful"
                );

                navigate("/");

            } catch (error) {

                console.log(error);

                alert(
                    "Invalid Email Or Password"
                );

            }

        };

    // GOOGLE LOGIN

    const handleGoogleLogin =
        async () => {

            try {

                const result =

                    await signInWithPopup(

                        auth,

                        provider

                    );

                const googleUser =
                    result.user;

                const userData = {

    name:
        googleUser.displayName,

    email:
        googleUser.email

};

                // SAVE USER

                localStorage.setItem(

                    "user",

                    JSON.stringify(
                        userData
                    )

                );

                // OPTIONAL TOKEN

                localStorage.setItem(

                    "token",

                    "google-auth-token"

                );

                // CONTEXT LOGIN

                login(userData);

                alert(
                    "Google Login Successful"
                );

                navigate("/");

            } catch (error) {

                console.log(error);

                alert(
                    error.message
                );

            }

        };

    return (

        <div className="login-page">

            {/* LEFT */}

            <div className="login-left">

                <div className="login-box">

                    <div className="logo-circle">

                        SR

                    </div>

                    <h1>
                        Welcome Back
                    </h1>

                    <p className="login-subtitle">

                        Login to continue your
                        premium shopping experience.

                    </p>

                    {/* EMAIL */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {/* PASSWORD */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {/* LOGIN BUTTON */}

                    <button
                        onClick={handleLogin}
                    >

                        Login

                    </button>

                    {/* GOOGLE BUTTON */}

                    <button
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >

                        Continue With Google

                    </button>

                    {/* REGISTER */}

                    <p className="register-text">

                        Don’t have an account?

                        <Link to="/register">

                            Create Account

                        </Link>

                    </p>

                </div>

            </div>

            {/* RIGHT */}

            <div className="login-right">

                <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    alt="shopping"
                />

                <div className="overlay-content">

                    <h2>
                        Smart Luxury Shopping
                    </h2>

                    <p>

                        Explore futuristic ecommerce
                        experiences with premium collections.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;