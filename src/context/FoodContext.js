import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetch } from "../api/fakeFetch";

const FoodContext = createContext();

export const FoodProvider = ({children}) => {
    const [foodData, setFoodData] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [checkboxInput, setCheckboxInput] = useState({
        is_vegetarian: false,
        is_spicy: false
    });
    const getData = async () => {
        try {
            const response = await fakeFetch('https://example.com/api/menu')
            if (response.status === 200) {
                setFoodData(response.data.menu);
                setFilteredMenu(response.data.menu)
            }
        } catch (response) {
            console.error(response.message)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleSearchChange = (e) => {
        const userInput = e.target.value;
        if (userInput) {
            setFilteredMenu(foodData.filter(({name}) => name.toLowerCase().includes(userInput.toLowerCase())))
        } else {
            setFilteredMenu(foodData)
        }
    }

    const handleCheck = (e) => {
        const checkValue = e.target.value;
        const isChecked = e.target.checked;
        
        let resultArr = [];

        if (checkValue === "is_vegetarian") {
            const first = isChecked; 
            const second = checkboxInput.is_spicy; 
            resultArr = [
                ...foodData.filter( 
                    ({ is_vegetarian, is_spicy }) => { 
    
                        return ((is_vegetarian && first) || (is_spicy && second))}
                ),
            ];
        } else {
            const first = isChecked;
            const second = checkboxInput.is_vegetarian;
            resultArr = [
                ...foodData.filter(
                    ({ is_vegetarian, is_spicy }) => (is_vegetarian && second) || (is_spicy && first)
                ),
            ];
        }
        setCheckboxInput({ ...checkboxInput, [checkValue]: isChecked });
        if (!resultArr.length) setFilteredMenu(foodData);
        else setFilteredMenu(resultArr);
    }

    const handleRadioChange = (e) => {
        const valueChosen = e.target.value;

        if (valueChosen === 'low-to-high') {
            setFilteredMenu(menu => [...menu].sort((a, b) => a.price - b.price))
        } else {
            setFilteredMenu(menu => [...menu].sort((a, b) => b.price - a.price))
        }
    }

    return (
        <FoodContext.Provider value={{foodData, filteredMenu, handleSearchChange, handleCheck, handleRadioChange}}>
            {children}
        </FoodContext.Provider>
    )
}

export const useFoodData = () => useContext(FoodContext)