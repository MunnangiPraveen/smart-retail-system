import React from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Products from "./pages/Products";

import Cart from "./pages/Cart";

import ProductDetails from "./pages/ProductDetails";

import Checkout from "./pages/Checkout";

import Orders from "./pages/Orders";

import Dashboard from "./pages/Dashboard";

import Payments from "./pages/Payments";

import Success from "./pages/Success";

import Profile from "./pages/Profile";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* PUBLIC ROUTES */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/success"
                    element={<Success />}
                />

                {/* PROTECTED ROUTES */}

                <Route
                    path="/cart"
                    element={

                        <ProtectedRoute>

                            <Cart />

                        </ProtectedRoute>

                    }
                />

                <Route
                    path="/checkout"
                    element={

                        <ProtectedRoute>

                            <Checkout />

                        </ProtectedRoute>

                    }
                />

                <Route
                    path="/orders"
                    element={

                        <ProtectedRoute>

                            <Orders />

                        </ProtectedRoute>

                    }
                />

                <Route
                    path="/dashboard"
                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }
                />

                <Route
                    path="/payments"
                    element={

                        <ProtectedRoute>

                            <Payments />

                        </ProtectedRoute>

                    }
                />

                <Route
                    path="/profile"
                    element={

                        <ProtectedRoute>

                            <Profile />

                        </ProtectedRoute>

                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;