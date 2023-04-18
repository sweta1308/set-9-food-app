export const CartHeader = ({totalDeliveryTime, couponApplied, discountPrice, totalPrice, setCouponApplied}) => {
    return (
        <>
            <h1>Cart</h1>
            <h3>Total delivery time: {totalDeliveryTime} minutes</h3>
            <h3>Total Price: ${couponApplied ? discountPrice : totalPrice} </h3>
            <button className="home-btn" onClick={() => setCouponApplied(!couponApplied)}>{couponApplied ? 'Remove Coupon' : 'Apply Coupon'}</button>
        </>
    )
}