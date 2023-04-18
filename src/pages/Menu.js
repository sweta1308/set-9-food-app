import { useCart } from "../context/CartContext";
import { useFoodData } from "../context/FoodContext";
import { FilterNav } from "../component/Filter";

export const Menu = () => {
    const {filteredMenu} = useFoodData();
    const {handleAddCart} = useCart();
    return (
        <>
            <FilterNav />
            <h1>Menu</h1>
            
            <ul>
                {filteredMenu.map(item => {
                    const {id, name, description, price, image, delivery_time} = item
                    return (
                        <li key={id} className="main-list">
                            <img src={image} alt={name} />
                            <div className="main-content">
                                <p><strong>{name}</strong></p>
                                <p>{description}</p>
                                <p>Price: ${price}</p>
                                <p>Delivery Time: {delivery_time} minutes</p>
                                <button className="home-btn" onClick={() => handleAddCart({id, name, description, price, image, delivery_time})}>Add to Cart</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}