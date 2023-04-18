import { NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"

export const Header = () => {
    const {cartData} = useCart()
    const activeState = ({isActive}) => ({
        color: isActive ? 'rgb(152, 228, 228)' : 'rgb(192, 233, 157)',
        padding: '0 50px',
        textDecoration: 'none'
    })
    return (
        <nav>
            <NavLink style={activeState} to='/'>Home</NavLink>
            <NavLink style={activeState} to='/menu'>Menu</NavLink> 
            <NavLink style={activeState} to='/cart'>Cart ({cartData.length})</NavLink>
        </nav>
    )
}