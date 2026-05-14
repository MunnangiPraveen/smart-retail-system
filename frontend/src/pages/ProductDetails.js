import React, {
    useEffect,
    useState,
    useContext
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import API from "../services/api";

import {
    CartContext
} from "../context/CartContext";

import "../styles/productDetails.css";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] =
        useState(null);

    const [relatedProducts, setRelatedProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const {
        addToCart
    } = useContext(CartContext);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                // PRODUCT DETAILS

                const response =
                    await API.get(`/products/${id}`)

                setProduct(
                    response.data[0]
                );

                // ALL PRODUCTS

                const allProducts =
                    await API.get("/products")

                // FILTER RELATED

                const filtered =
                    allProducts.data.filter(

                        (item) =>

                            item.product_id !==
                            response.data[0].product_id

                    );

                setRelatedProducts(

                    filtered.slice(0, 3)

                );

                setLoading(false);

            } catch (error) {

                console.log(error);

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);

    // LOADING

    if (loading) {

        return (

            <div className="details-loading">

                Loading Product...

            </div>

        );

    }

    // NOT FOUND

    if (!product) {

        return (

            <div className="details-loading">

                Product Not Found

            </div>

        );

    }

    return (

        <div className="details-page-container">

            {/* MAIN DETAILS */}

            <div className="details-page">

                {/* IMAGE */}

                <div className="details-image">

                    <img
                        src={product.image_url}
                        alt={product.product_name}
                    />

                </div>

                {/* INFO */}

                <div className="details-info">

                    <p className="details-category">
                        Premium Collection
                    </p>

                    <h1>
                        {product.product_name}
                    </h1>

                    <div className="details-rating">

                        ⭐⭐⭐⭐⭐

                        <span>
                            (4.9 Reviews)
                        </span>

                    </div>

                    <h2>
                        ₹{product.price}
                    </h2>

                    <p className="details-description">

                        {product.description}

                    </p>

                    <div className="details-features">

                        <div>
                            ✔ Premium Quality
                        </div>

                        <div>
                            ✔ Fast Delivery
                        </div>

                        <div>
                            ✔ Secure Payments
                        </div>

                        <div>
                            ✔ Luxury Packaging
                        </div>

                    </div>

                    <button

                        className="details-cart-btn"

                        onClick={() =>
                            addToCart(product)
                        }

                    >

                        Add To Cart

                    </button>

                </div>

            </div>

            {/* RELATED PRODUCTS */}

            <div className="related-section">

                <h2>
                    Related Products
                </h2>

                <div className="related-grid">

                    {
                        relatedProducts.map((item) => (

                            <Link

                                to={`/products/${item.product_id}`}

                                className="related-link"

                                key={item.product_id}

                            >

                                <div className="related-card">

                                    <img
                                        src={item.image_url}
                                        alt={item.product_name}
                                    />

                                    <div className="related-info">

                                        <h3>
                                            {item.product_name}
                                        </h3>

                                        <p>
                                            ₹{item.price}
                                        </p>

                                    </div>

                                </div>

                            </Link>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default ProductDetails;