import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRef } from "react"

export default function CategoriesPage() {

    const [categories, setCategories] = useState([])
    const titleInput = useRef('')

    async function getAllCategories() {
        let response = await axios.get('api/categories')
        console.log(response.data)
        setCategories(response.data.data)

    }

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <div>
            <h1>CategoriesPage</h1>
            {categories.map((category) => (
                    <h4>{category.title}</h4>
                ))}
            
            <input type='text' value={titleInput.current.value} onChange= {() => {}}/>
        </div>

 
    )
}