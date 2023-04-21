import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetch } from "../api/fakeFetch";

const FoodContext = createContext();

export const FoodProvider = ({children}) => {
    const [foodData, setFoodData] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        category: [],
        sort: ''
    })
    const getData = async () => {
        try {
            const response = await fakeFetch('https://example.com/api/menu')
            if (response.status === 200) {
                setFoodData(response.data.menu);
                // setFilteredMenu(response.data.menu);        
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
        setFilters({...filters, search: userInput})
    }

    const handleCheck = (e) => {
        const data = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setFilters({...filters, category: [...filters.category, data]})
        } else {
            setFilters({...filters, category: filters.category.filter(datas => datas !== data)})
        }
    }

    const applyFilters = () => {
        let filterData = [...foodData];
        if (filters.search.length > 0) {
            filterData = filterData.filter(({name})=> name.toLowerCase().includes(filters.search.toLowerCase()))
        } 
        if (filters.category.length > 0) {
            filters.category.map((item) => {
                filterData = filterData.filter(food => food[item]);
                return filterData;
            })
        }


        if (filters.sort === 'low-to-high') {
            filterData = [...filterData].sort((a,b) => a.price - b.price);
        } else if (filters.sort === 'high-to-low') {
            filterData = [...filterData].sort((a,b) => b.price - a.price);
        }
        return filterData;
    }

    const filteredMenu = applyFilters();
    
    const handleRadioChange = (e) => {
        const valueChosen = e.target.value;
        setFilters({...filters, sort: valueChosen});
    }

    return (
        <FoodContext.Provider value={{foodData, filteredMenu, handleSearchChange, handleCheck, handleRadioChange}}>
            {children}
        </FoodContext.Provider>
    )
}

export const useFoodData = () => useContext(FoodContext)