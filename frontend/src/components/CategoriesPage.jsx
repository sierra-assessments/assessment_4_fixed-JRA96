import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import CategoryPage from "./CategoryPage"

export default function CategoriesPage() {

    const [categories, setCategories] = useState([])
    const [titleInput, setTitleInput] = useState('')

    async function getAllCategories() {
        let response = await axios.get('api/categories/')
        console.log(response.data.data)
        setCategories(response.data.data)

    }

    function addCategory( ){
        let response = axios.post('api/categories/' , {'title': titleInput})
        .then( response => {
          console.log(response.data)
        }).then(
          getAllCategories()
        )
    
    }

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <div>
            <input type='text' palceholder='title' value={titleInput} onChange= {(e) => {setTitleInput(e.target.value)}}/>
            <button onClick={addCategory}>Add Category</button>
            {categories.map((category) => (
                
                <ul>
                    <Link
                        to={`/categories/${category.id}`}
                        state={{category}}>
                        {category.title}
                    </Link>
                </ul>
                ))}
        
        </div>


 
    )
}
