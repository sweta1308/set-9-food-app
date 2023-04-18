import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartData, setCartData] = useState([]);

    const handleAddCart = ({id, name, description, price, image, delivery_time}) => {
        const isItemPresent = cartData.findIndex((item) => item.id === id);
    
        if (isItemPresent === -1) {
            setCartData([...cartData, {id, name, description, price, image, delivery_time, quantity: 1}])
        } else {
            setCartData(cartData.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        }
    }

    const handleRemoveCart = (id) => setCartData(cart => cart.filter(item => item.id !== id))

    const totalDeliveryTime = cartData.reduce((acc, curr) => acc += curr.delivery_time, 0)

    const totalPrice = cartData.reduce((acc, curr) => acc + curr.quantity*curr.price, 0)

    const discountPrice = totalPrice - 5;


    return (
        <CartContext.Provider value={{handleAddCart, cartData, handleRemoveCart, totalDeliveryTime, totalPrice, discountPrice}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)