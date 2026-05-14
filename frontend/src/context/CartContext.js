import React, {
    createContext,
    useState,
    useEffect
} from "react";

export const CartContext =
    createContext();

function CartProvider({ children }) {

    const [cartItems, setCartItems] =
        useState(() => {

            const savedCart =
                localStorage.getItem("cart");

            return savedCart
                ? JSON.parse(savedCart)
                : [];

        });

    // SAVE CART

    useEffect(() => {

        localStorage.setItem(

            "cart",

            JSON.stringify(cartItems)

        );

    }, [cartItems]);

    // ADD TO CART

    const addToCart = (product) => {

        const existingItem =
            cartItems.find(

                (item) =>

                    item.product_id ===
                    product.product_id

            );

        if (existingItem) {

            const updatedCart =
                cartItems.map((item) =>

                    item.product_id ===
                    product.product_id

                        ? {

                            ...item,

                            quantity:
                                item.quantity + 1

                        }

                        : item

                );

            setCartItems(updatedCart);

        } else {

            setCartItems([

                ...cartItems,

                {

                    ...product,

                    quantity: 1

                }

            ]);

        }

    };

    // REMOVE ITEM

    const removeFromCart = (id) => {

        const updatedCart =
            cartItems.filter(

                (item) =>

                    item.product_id !== id

            );

        setCartItems(updatedCart);

    };

    // INCREASE QUANTITY

    const increaseQuantity = (id) => {

        const updatedCart =
            cartItems.map((item) =>

                item.product_id === id

                    ? {

                        ...item,

                        quantity:
                            item.quantity + 1

                    }

                    : item

            );

        setCartItems(updatedCart);

    };

    // DECREASE QUANTITY

    const decreaseQuantity = (id) => {

        const updatedCart =
            cartItems.map((item) =>

                item.product_id === id

                    ? {

                        ...item,

                        quantity:
                            item.quantity - 1

                    }

                    : item

            ).filter(

                (item) =>

                    item.quantity > 0

            );

        setCartItems(updatedCart);

    };

    // CLEAR CART

    const clearCart = () => {

        setCartItems([]);

        localStorage.removeItem("cart");

    };

    return (

        <CartContext.Provider

            value={{

                cartItems,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart

            }}

        >

            {children}

        </CartContext.Provider>

    );

}

export default CartProvider;