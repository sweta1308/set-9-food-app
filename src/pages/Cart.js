import { useState } from "react";
import { useCart } from "../context/CartContext"
import { CartHeader } from "../component/CartHeader";

export const Cart = () => {
    const {cartData, handleRemoveCart, totalDeliveryTime, totalPrice, discountPrice} = useCart();
    const [couponApplied, setCouponApplied] = useState(false);
    return (
        <>
            <CartHeader totalDeliveryTime={totalDeliveryTime} couponApplied={couponApplied} discountPrice={discountPrice}  totalPrice={totalPrice} setCouponApplied={setCouponApplied} />
            <ol>
                {cartData.map(item => {
                    const {id, name, description, price, image, delivery_time, quantity} = item
                    return (
                        <li key={id} className="main-list-cart">
                            <img src={image} alt={name} />
                            <div className="main-content">
                                <div className="desc-div">
                                    <p><strong>{name}</strong></p>
                                    <p className="cart-desc">{description}</p>
                                    <p>Price: ${price}</p>
                                </div>
                                
                                    
                                <div className="delivery-cart">
                                    <p>Delivery Time: {delivery_time} minutes</p>
                                    <p className="quantity">Quantity: {quantity}</p>
                                    
                                </div>
                                <button className="button-remove" onClick={() => handleRemoveCart(id)}>Remove from Cart</button>
                            </div>
                        </li>
                    )
                })}
            </ol>
        </>
    )
}