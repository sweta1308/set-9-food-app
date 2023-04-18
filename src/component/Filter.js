import { useFoodData } from "../context/FoodContext"

export const FilterNav = () => {
    const {handleSearchChange, handleCheck, handleRadioChange} = useFoodData();
    return (
        <nav className="filter-nav">
            <h4>Filters</h4>
            <input onChange={handleSearchChange} className="search" placeholder="Search Food Here" />
            <label>
                <input onChange={handleCheck} type='checkbox' value='is_vegetarian' />Veg
            </label>
            <label>
                <input onChange={handleCheck} type='checkbox' value='is_spicy' />Spicy
            </label>
            <label>
                <input onChange={handleRadioChange} value='low-to-high' type="radio" name="priceSort" />Sort (price) Low to High
            </label>
            <label>
                <input onChange={handleRadioChange} value='high-to-low' type="radio" name="priceSort" />Sort (price) High to Low
            </label>
        </nav>
    )
}