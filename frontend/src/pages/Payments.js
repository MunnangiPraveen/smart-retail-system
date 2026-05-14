import React, {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import "../styles/payments.css";

function Payments() {

    const [payments, setPayments] =
        useState([]);

    // FETCH PAYMENTS

    const fetchPayments = async () => {

        try {

            const response =
                await API.get("/payments");

            setPayments(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchPayments();

    }, []);

    return (

        <div className="payments-page">

            <div className="payments-header">

                <h1>
                    Payment History
                </h1>

                <p>

                    Track all your transactions.

                </p>

            </div>

            <div className="payments-container">

                {

                    payments.map((payment) => (

                        <div
                            className="payment-card"
                            key={payment.payment_id}
                        >

                            <h2>

                                {
                                    payment.transaction_id
                                }

                            </h2>

                            <p>

                                <strong>
                                    Order ID:
                                </strong>

                                {" "}

                                #
                                {payment.order_id}

                            </p>

                            <p>

                                <strong>
                                    Amount:
                                </strong>

                                {" "}

                                ₹
                                {payment.amount}

                            </p>

                            <p>

                                <strong>
                                    Method:
                                </strong>

                                {" "}

                                {
                                    payment.payment_method
                                }

                            </p>

                            <span
                                className={`payment-status ${payment.payment_status}`}
                            >

                                {
                                    payment.payment_status
                                }

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Payments;