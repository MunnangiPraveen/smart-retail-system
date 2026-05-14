import React, {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api";

import "../styles/register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({

            fullName: "",

            email: "",

            password: ""

        });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handleRegister = async () => {

        try {

            const response =
                await API.post(

                    "/auth/register",

                    formData

                );

            alert(

                response.data.message

            );

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>
                    Create Account
                </h1>

                <p className="register-subtitle">

                    Join Smart Retail
                    and explore premium shopping.

                </p>

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

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button
                    onClick={handleRegister}
                >

                    Create Account

                </button>

            </div>

        </div>

    );

}

export default Register;