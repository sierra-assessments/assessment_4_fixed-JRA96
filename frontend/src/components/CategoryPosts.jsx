import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import {Link, useLocation} from 'react-router-dom'

export default function CategoryPosts() {

    const [posts, setPosts] = useState([])
    const [content, setContent] = useState('')
    const location = useLocation();
    const data = location.state;
    console.log(data.data.category)
    let basePath = 'http://localhost:8000'

    async function getAllCategoriesPosts() {
        let response = await axios.get(`${basePath}/api/categories/${data.data.category.id}/posts/`)
        console.log(response.data.data)
        setPosts(response.data.data)


    }

    function addCategoryPost( ){
        let response = axios.post(`${basePath}/api/categories/${data.data.category.id}/posts/` , {'content': content})
        .then( response => {
          console.log(response.data)
        }).then(
          getAllCategoriesPosts()
        )
    
    }

    useEffect(() => {
        getAllCategoriesPosts()
    }, [])

  return (
    <div>
        <h1>{data.data.category.title}</h1>
        <div>
            <input type='text' palceholder='content' size='100' value={content} onChange= {(e) => {setContent(e.target.value)}}/>
            <button onClick={addCategoryPost}>Add Post</button>
        </div>
        <ul>
            {posts.map((post) => (
                
                <ul>
                    <Link
                      to={`/categories/${data.data.category.id}/posts/${post.id}`}
                      state={{post}}>
                      {post.content}
                  </Link>
                </ul>
                ))}
        </ul>
        </div>
  )
}
