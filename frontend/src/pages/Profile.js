import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api";

import "../styles/profile.css";

function Profile() {

    const navigate =
        useNavigate();

    const user = JSON.parse(

        localStorage.getItem("user")

    );

    const [orders, setOrders] =
        useState([]);

    // FETCH ORDERS

    useEffect(() => {

        const fetchOrders =
            async () => {

                try {

                    const response =

                        await API.get(

                            `/orders/${user.email}`

                        );

                    setOrders(response.data);

                } catch (error) {

                    console.log(error);

                }

            };

        fetchOrders();

    }, [user.email]);

    // TOTAL SPENT

    const totalSpent =

        orders.reduce(

            (total, order) =>

                total +

                Number(order.total_price),

            0

        );

    // LOGOUT

    const handleLogout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <div className="profile-page">

            <div className="profile-card">

                {/* PROFILE */}

                <div className="profile-top">

                    <div className="profile-avatar">

                        {

                            user?.name

                                ?.charAt(0)

                                .toUpperCase()

                        }

                    </div>

                    <h1>

                        {user?.name}

                    </h1>

                    <p>

                        {user?.email}

                    </p>

                </div>

                {/* STATS */}

                <div className="profile-stats">

                    <div className="stat-box">

                        <h2>

                            {orders.length}

                        </h2>

                        <p>Total Orders</p>

                    </div>

                    <div className="stat-box">

                        <h2>

                            ₹{totalSpent}

                        </h2>

                        <p>Total Spent</p>

                    </div>

                </div>

                {/* ACTIONS */}

                <div className="profile-actions">

                    <button

                        onClick={() =>

                            navigate("/orders")

                        }

                    >

                        View Orders

                    </button>

                    <button

                        onClick={() =>

                            navigate("/products")

                        }

                    >

                        Continue Shopping

                    </button>

                    <button

                        className="logout-btn"

                        onClick={handleLogout}

                    >

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profile;