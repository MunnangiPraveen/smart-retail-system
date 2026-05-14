import React, {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import "../styles/orders.css";

function Orders() {

    const [orders, setOrders] =
        useState([]);

    // FETCH ORDERS

    const fetchOrders = async () => {

        try {

            const user =
                JSON.parse(

                    localStorage.getItem("user")

                );

            const response =
                await API.get(

                    `/orders/${user.email}`

                );

            setOrders(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className="orders-page">

            <div className="orders-header">

                <h1>
                    My Orders
                </h1>

                <p>

                    Track all your recent purchases.

                </p>

            </div>

            {

                orders.length === 0

                    ? (

                        <h2 className="empty-orders">

                            No Orders Found

                        </h2>

                    )

                    : (

                        <div className="orders-container">

                            {

                                orders.map((order) => (

                                    <div
                                        className="order-card"
                                        key={order.order_id}
                                    >

                                        <div className="order-top">

                                            <h2>

                                                Order #
                                                {order.order_id}

                                            </h2>

                                            <span
                                                className={`status ${order.status}`}
                                            >

                                                {order.status}

                                            </span>

                                        </div>

                                        <p>

                                            <strong>
                                                Payment:
                                            </strong>

                                            {" "}

                                            {order.payment_method}

                                        </p>

                                        <p>

                                            <strong>
                                                Total:
                                            </strong>

                                            {" "}

                                            ₹
                                            {order.total_price}

                                        </p>

                                        <p>

                                            <strong>
                                                Date:
                                            </strong>

                                            {" "}

                                            {

                                                new Date(

                                                    order.created_at

                                                ).toLocaleString()

                                            }

                                        </p>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default Orders;