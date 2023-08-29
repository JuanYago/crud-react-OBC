import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: PropTypes.node
}

export function StockContextProvider({children}) {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('obc-react-stock')
        if(!storedItems) return []
        const items = JSON.parse(storedItems)
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt)
            item.updateAt = new Date(item.updateAt)

        })
        return items
    })

    const addItem = (item) => {
        setItems(currentState => {
            const updatedItems = [item, ...currentState]
            localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId)
    }

    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId)
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const updateItem = (itemId, newAttribute) => {
        setItems(currentState => {
            const itemIndex = currentState.findIndex(item => item.id === itemId)
            const updatedItem = [...currentState]
            Object.assign(updatedItem[itemIndex], newAttribute, {updateAt: new Date()})
            localStorage.setItem('obc-react-stock', JSON.stringify(updatedItem))
            return updatedItem
        })
    }
    const stock = {
        items,
        addItem,
        deleteItem,
        getItem,
        updateItem
    }

    return(
        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}