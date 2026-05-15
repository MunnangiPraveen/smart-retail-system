import { useNavigate } from "react-router-dom";

import React from "react";

import {
    FaArrowRight,
    FaShoppingBag,
    FaTruck,
    FaShieldAlt
} from "react-icons/fa";

import "../styles/home.css";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="home-page">

            {/* HERO SECTION */}

            <section className="hero-section">

                <div className="hero-left">

                    <p className="small-tag">
                        PREMIUM SMART SHOPPING
                    </p>

                    <h1>
                        Elevate Your
                        Shopping Experience
                    </h1>

                    <p className="hero-description">

                        Discover premium collections,
                        futuristic shopping,
                        secure checkout,
                        and luxury ecommerce experiences.

                    </p>

                    <div className="hero-buttons">

                        <button
                            className="shop-btn"
                            onClick={() => navigate("/products")}
                        >

                            Shop Now

                            <FaArrowRight />

                        </button>

                        <button
                            className="explore-btn"
                            onClick={() => navigate("/products")}
                        >

                            Explore Products

                        </button>

                    </div>

                    <div className="hero-features">

                        <div>

                            <FaTruck />

                            Fast Delivery

                        </div>

                        <div>

                            <FaShieldAlt />

                            Secure Payments

                        </div>

                        <div>

                            <FaShoppingBag />

                            Premium Products

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="hero-right">

                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                        alt="product"
                    />

                    <div className="floating-box box1">

                        🔥 Trending Products

                    </div>

                    <div className="floating-box box2">

                        ⭐ Best Deals

                    </div>

                    <div className="floating-box box3">

                        🚀 New Arrivals

                    </div>

                </div>

            </section>

            {/* FEATURED PRODUCTS */}

            <section className="featured-section">

                <div className="section-header">

                    <div>

                        <p className="section-tag">
                            FEATURED COLLECTION
                        </p>

                        <h2>
                            Trending Premium Products
                        </h2>

                    </div>

                    <button
                        className="view-all-btn"
                        onClick={() => navigate("/products")}
                    >

                        View All

                    </button>

                </div>

                <div className="products-grid">

                    {/* CARD 1 */}

                    <div className="product-card">

                        <div className="product-badge">
                            NEW
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="shoe"
                        />

                        <div className="product-info">

                            <p className="product-category">
                                Sneakers
                            </p>

                            <h3>
                                Premium Running Shoes
                            </h3>

                            <div className="price-row">

                                <h4>
                                    ₹4,999
                                </h4>

                                <span>
                                    ₹6,499
                                </span>

                            </div>

                            <button
                                onClick={() => navigate("/products")}
                            >
                                Add To Cart
                            </button>

                        </div>

                    </div>

                    {/* CARD 2 */}

                    <div className="product-card">

                        <div className="product-badge">
                            HOT
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                            alt="watch"
                        />

                        <div className="product-info">

                            <p className="product-category">
                                Watches
                            </p>

                            <h3>
                                Luxury Smart Watch
                            </h3>

                            <div className="price-row">

                                <h4>
                                    ₹8,999
                                </h4>

                                <span>
                                    ₹10,999
                                </span>

                            </div>

                            <button
                                onClick={() => navigate("/products")}
                            >
                                Add To Cart
                            </button>

                        </div>

                    </div>

                    {/* CARD 3 */}

                    <div className="product-card">

                        <div className="product-badge">
                            SALE
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                            alt="headphones"
                        />

                        <div className="product-info">

                            <p className="product-category">
                                Audio
                            </p>

                            <h3>
                                Wireless Headphones
                            </h3>

                            <div className="price-row">

                                <h4>
                                    ₹5,499
                                </h4>

                                <span>
                                    ₹7,499
                                </span>

                            </div>

                            <button
                                onClick={() => navigate("/products")}
                            >
                                Add To Cart
                            </button>

                        </div>

                    </div>

                </div>

            </section>

            {/* CATEGORIES SECTION */}

            <section className="categories-section">

                <div className="section-header">

                    <div>

                        <p className="section-tag">
                            SHOP BY CATEGORY
                        </p>

                        <h2>
                            Explore Collections
                        </h2>

                    </div>

                </div>

                <div className="categories-grid">

                    <div
                        className="category-card large-card"
                        onClick={() => navigate("/products")}
                        style={{ cursor: "pointer" }}
                    >

                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                            alt="fashion"
                        />

                        <div className="category-overlay">

                            <p>Luxury Fashion</p>

                            <h3>
                                Premium Clothing
                            </h3>

                            <button>
                                Explore Collection
                            </button>

                        </div>

                    </div>

                    <div
                        className="category-card"
                        onClick={() => navigate("/products")}
                        style={{ cursor: "pointer" }}
                    >

                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                            alt="watches"
                        />

                        <div className="category-overlay">

                            <p>Luxury Watches</p>

                            <h3>
                                Smart Accessories
                            </h3>

                        </div>

                    </div>

                    <div
                        className="category-card"
                        onClick={() => navigate("/products")}
                        style={{ cursor: "pointer" }}
                    >

                        <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                            alt="audio"
                        />

                        <div className="category-overlay">

                            <p>Premium Audio</p>

                            <h3>
                                Headphones & Sound
                            </h3>

                        </div>

                    </div>

                </div>

            </section>

            {/* STATS SECTION */}

            <section className="stats-section">

                <div className="stats-header">

                    <p className="section-tag">
                        TRUSTED WORLDWIDE
                    </p>

                    <h2>
                        Premium Ecommerce
                        Trusted By Thousands
                    </h2>

                </div>

                <div className="stats-grid">

                    <div className="stat-card">

                        <h1>50K+</h1>

                        <p>
                            Happy Customers
                        </p>

                    </div>

                    <div className="stat-card">

                        <h1>120+</h1>

                        <p>
                            Premium Brands
                        </p>

                    </div>

                    <div className="stat-card">

                        <h1>24/7</h1>

                        <p>
                            Customer Support
                        </p>

                    </div>

                    <div className="stat-card">

                        <h1>99%</h1>

                        <p>
                            Secure Payments
                        </p>

                    </div>

                </div>

            </section>

            {/* TESTIMONIALS SECTION */}

            <section className="testimonials-section">

                <div className="section-header center-header">

                    <div>

                        <p className="section-tag">
                            CUSTOMER STORIES
                        </p>

                        <h2>
                            What Our Customers Say
                        </h2>

                    </div>

                </div>

                <div className="testimonials-grid">

                    <div className="testimonial-card">

                        <div className="stars">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <p className="review-text">

                            “Absolutely premium experience.
                            The interface feels luxurious
                            and shopping has never been smoother.”

                        </p>

                        <div className="review-user">

                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="user"
                            />

                            <div>

                                <h4>
                                    Sophia Carter
                                </h4>

                                <span>
                                    Fashion Enthusiast
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="testimonial-card">

                        <div className="stars">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <p className="review-text">

                            “The delivery was incredibly fast
                            and the products genuinely felt premium.
                            Highly recommended.”

                        </p>

                        <div className="review-user">

                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="user"
                            />

                            <div>

                                <h4>
                                    Daniel Smith
                                </h4>

                                <span>
                                    Tech Reviewer
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="testimonial-card">

                        <div className="stars">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <p className="review-text">

                            “Beautiful product quality,
                            elegant packaging,
                            and one of the best ecommerce
                            experiences I’ve seen.”

                        </p>

                        <div className="review-user">

                            <img
                                src="https://randomuser.me/api/portraits/women/68.jpg"
                                alt="user"
                            />

                            <div>

                                <h4>
                                    Olivia Brown
                                </h4>

                                <span>
                                    Lifestyle Creator
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* NEWSLETTER SECTION */}

            <section className="newsletter-section">

                <div className="newsletter-content">

                    <p className="section-tag">
                        STAY UPDATED
                    </p>

                    <h2>
                        Get Exclusive Deals &
                        Premium Collections
                    </h2>

                    <p className="newsletter-text">

                        Subscribe to receive premium offers,
                        latest product launches,
                        and luxury shopping experiences.

                    </p>

                    <div className="newsletter-box">

                        <input
                            type="email"
                            placeholder="Enter your email address"
                        />

                        <button>
                            Subscribe
                        </button>

                    </div>

                </div>

            </section>

            {/* FOOTER */}

            <footer className="footer">

                <div className="footer-grid">

                    <div className="footer-brand">

                        <h2>
                            SmartRetail
                        </h2>

                        <p>

                            Premium ecommerce platform
                            delivering luxury shopping
                            experiences worldwide.

                        </p>

                    </div>

                    <div className="footer-links">

                        <h3>
                            Company
                        </h3>

                        <a href="/">About</a>
                        <a href="/">Careers</a>
                        <a href="/">Blog</a>
                        <a href="/">Contact</a>

                    </div>

                    <div className="footer-links">

                        <h3>
                            Support
                        </h3>

                        <a href="/">Help Center</a>
                        <a href="/">Privacy Policy</a>
                        <a href="/">Terms & Conditions</a>
                        <a href="/">Shipping</a>

                    </div>

                    <div className="footer-links">

                        <h3>
                            Follow Us
                        </h3>

                        <a href="/">Instagram</a>
                        <a href="/">Twitter</a>
                        <a href="/">LinkedIn</a>
                        <a href="/">YouTube</a>

                    </div>

                </div>

                <div className="footer-bottom">

                    © 2026 SmartRetail.
                    All Rights Reserved.

                </div>

            </footer>

        </div>

    );

}

export default Home;