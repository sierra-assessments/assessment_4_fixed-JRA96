import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import {Link, useLocation} from 'react-router-dom'

function CategoryPage(props) {

    const [titleInput, setTitleInput] = useState('')

    const location = useLocation();
    const data = location.state;
    console.log(data.category.title);
    let basePath = 'http://localhost:8000'

    async function updateCategory() {
        let response = await axios.put(`${basePath}/api/categories/${data.category.id}/`, {'id': data.category.id, 'title': titleInput})
        console.log(response.data)

    }

    async function deleteCategory() {
        let response = await axios.delete(`${basePath}/api/categories/${data.category.id}/`, {'id': data.category.id})
        console.log(response.data)

    }

    // async function viewCategoryPosts() {
    //     let response = await axios.delete(`${basePath}/api/categories/${data.category.id}/`, {'id': data.category.id})
    //     console.log(response.data)

    // }
    
    return (
        <div>
            <input type='text' palceholder='title' value={titleInput} onChange= {(e) => {setTitleInput(e.target.value)}}/>
            <button onClick={updateCategory}>Update Title</button>
            <h1>{data.category.title}</h1>
            <div className='col'>
                <button onClick={deleteCategory}>Delete Category</button>
                <Link
                    to={`/categories/${data.category.id}/posts`}
                    state={{data}}>
                    View Posts
                </Link>
            </div>
            
        </div>
    )
}

export default CategoryPage