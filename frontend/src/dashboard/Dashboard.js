import React, {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import {
    FaBoxOpen,
    FaShoppingCart,
    FaRupeeSign,
    FaUsers
} from "react-icons/fa";

import "../styles/dashboard.css";

function Dashboard() {

    const [products, setProducts] =
        useState([]);

    const [orders, setOrders] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({

            product_name: "",

            description: "",

            price: "",

            image_url: ""

        });

    // FETCH DATA

    const fetchData = async () => {

        try {

            // PRODUCTS

            const productsResponse =
                await API.get("/products");

            setProducts(
                productsResponse.data
            );

            // ORDERS

            const user =
                JSON.parse(

                    localStorage.getItem("user")

                );

            if (user) {

                const ordersResponse =
                    await API.get(

                        `/orders/${user.email}`

                    );

                setOrders(
                    ordersResponse.data
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    // HANDLE INPUTS

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    // EDIT PRODUCT

    const editProduct = (product) => {

        setEditingId(
            product.product_id
        );

        setFormData({

            product_name:
                product.product_name,

            description:
                product.description,

            price:
                product.price,

            image_url:
                product.image_url

        });

    };

    // ADD OR UPDATE PRODUCT

    const addProduct = async () => {

        try {

            // UPDATE

            if (editingId) {

                const response =
                    await API.put(

                        `/products/${editingId}`,

                        formData

                    );

                alert(
                    response.data.message
                );

                setEditingId(null);

            }

            // ADD

            else {

                const response =
                    await API.post(

                        "/products",

                        formData

                    );

                alert(
                    response.data.message
                );

            }

            // CLEAR FORM

            setFormData({

                product_name: "",

                description: "",

                price: "",

                image_url: ""

            });

            // REFRESH

            fetchData();

        } catch (error) {

            console.log(error);

            alert(
                "Operation Failed"
            );

        }

    };

    // DELETE PRODUCT

    const deleteProduct = async (id) => {

        try {

            const response =
                await API.delete(

                    `/products/${id}`

                );

            alert(
                response.data.message
            );

            fetchData();

        } catch (error) {

            console.log(error);

            alert(
                "Delete Failed"
            );

        }

    };

    // TOTAL REVENUE

    const totalRevenue =
        orders.reduce(

            (total, order) =>

                total +
                Number(order.total_price),

            0

        );

    return (

        <div className="dashboard-page">

            {/* HEADER */}

            <div className="dashboard-header">

                <h1>
                    Admin Dashboard
                </h1>

                <p>

                    Monitor products,
                    revenue,
                    and ecommerce analytics.

                </p>

            </div>

            {/* ANALYTICS */}

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <FaBoxOpen />

                    <h2>
                        {products.length}
                    </h2>

                    <p>
                        Products
                    </p>

                </div>

                <div className="dashboard-card">

                    <FaShoppingCart />

                    <h2>
                        {orders.length}
                    </h2>

                    <p>
                        Orders
                    </p>

                </div>

                <div className="dashboard-card">

                    <FaRupeeSign />

                    <h2>
                        ₹{totalRevenue}
                    </h2>

                    <p>
                        Revenue
                    </p>

                </div>

                <div className="dashboard-card">

                    <FaUsers />

                    <h2>
                        1
                    </h2>

                    <p>
                        Active Users
                    </p>

                </div>

            </div>

            {/* ADD PRODUCT */}

            <div className="add-product-box">

                <h2>

                    {
                        editingId
                            ? "Edit Product"
                            : "Add Product"
                    }

                </h2>

                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image_url"
                    placeholder="Image URL"
                    value={formData.image_url}
                    onChange={handleChange}
                />

                <button
                    onClick={addProduct}
                >

                    {
                        editingId
                            ? "Update Product"
                            : "Add Product"
                    }

                </button>

            </div>

            {/* PRODUCT MANAGEMENT */}

            <div className="dashboard-section">

                <h2>
                    Product Management
                </h2>

                <div className="dashboard-products">

                    {
                        products.map((product) => (

                            <div
                                className="dashboard-product-card"
                                key={product.product_id}
                            >

                                <img
                                    src={product.image_url}
                                    alt="product"
                                />

                                <h3>
                                    {product.product_name}
                                </h3>

                                <p>
                                    ₹{product.price}
                                </p>

                                <div className="dashboard-actions">

                                    <button
                                        onClick={() =>
                                            editProduct(product)
                                        }
                                    >

                                        Edit

                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteProduct(
                                                product.product_id
                                            )
                                        }
                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default Dashboard;