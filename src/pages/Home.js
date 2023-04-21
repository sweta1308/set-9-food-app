import { NavLink } from "react-router-dom"

export const Home = () => {
    const activeState = () => ({
        backgroundColor: 'brown',
        padding: '30px 50px',
        fontSize: '20px',
        borderRadius: '10px',
        color: 'rgb(240, 241, 187)',
        textDecoration: 'none',
    })
    return (
        <>
            <div className="home-image">
                <h1 className="home-header">Welcome to neoG Food Ordering App!</h1>
                <NavLink className='menu-navlink' style={activeState} to='/menu'>Go to Menu</NavLink>
            </div>
        </>
    )
}