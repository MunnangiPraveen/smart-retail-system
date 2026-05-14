import React, {
    useEffect,
    useState,
    useContext
} from "react";

import API from "../services/api";

import {
    Link
} from "react-router-dom";

import {
    CartContext
} from "../context/CartContext";

import "../styles/products.css";

function Products() {

    const [products, setProducts] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [sortOrder, setSortOrder] =
        useState("");

    const [categoryFilter, setCategoryFilter] =
        useState("All");

    const {
        addToCart
    } = useContext(CartContext);

    // FETCH PRODUCTS

    const fetchProducts = async () => {

        try {

            const response =
                await API.get("/products");

            console.log(response.data);

            setProducts(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, []);

    // FILTER PRODUCTS

    let filteredProducts =
        products.filter((product) =>

            product.product_name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

    // CATEGORY FILTER

    if (categoryFilter !== "All") {

        filteredProducts =
            filteredProducts.filter(

                (product) =>

                    Number(product.category_id) ===

                    Number(categoryFilter)

            );

    }

    // SORT LOW TO HIGH

    if (sortOrder === "lowToHigh") {

        filteredProducts.sort(

            (a, b) =>

                a.price - b.price

        );

    }

    // SORT HIGH TO LOW

    if (sortOrder === "highToLow") {

        filteredProducts.sort(

            (a, b) =>

                b.price - a.price

        );

    }

    return (

        <div className="products-page">

            <div className="products-header">

                <h1>
                    Explore Products
                </h1>

                <p>

                    Premium gadgets and
                    accessories curated for you.

                </p>

            </div>

            {/* SEARCH */}

            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            {/* FILTERS */}

            <div className="filter-row">

                {/* CATEGORY */}

                <select

                    value={categoryFilter}

                    onChange={(e) =>

                        setCategoryFilter(

                            e.target.value

                        )

                    }

                >

                    <option value="All">

                        All Categories

                    </option>

                    <option value="1">

                        Electronics

                    </option>

                    <option value="2">

                        Fashion

                    </option>

                </select>

                {/* SORT */}

                <select

                    value={sortOrder}

                    onChange={(e) =>

                        setSortOrder(

                            e.target.value

                        )

                    }

                >

                    <option value="">

                        Sort By

                    </option>

                    <option value="lowToHigh">

                        Price: Low To High

                    </option>

                    <option value="highToLow">

                        Price: High To Low

                    </option>

                </select>

            </div>

            {/* PRODUCTS */}

            <div className="products-grid">

                {

                    filteredProducts.map((product) => (

                        <div
                            className="product-card"
                            key={product.product_id}
                        >

                            <img
                                src={product.image_url}
                                alt="product"
                            />

                            <h2>
                                {product.product_name}
                            </h2>

                            <p>
                                {product.description}
                            </p>

                            <h3>
                                ₹{product.price}
                            </h3>

                            <div className="product-buttons">

                                <button
                                    onClick={() =>
                                        addToCart(product)
                                    }
                                >

                                    Add To Cart

                                </button>

                                <Link
                                    to={`/products/${product.product_id}`}
                                >

                                    View Details

                                </Link>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Products;