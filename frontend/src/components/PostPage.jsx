import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import {Link, useLocation} from 'react-router-dom'

function PostPage() {

    const [content, setContent] = useState('')

    let basePath = 'http://localhost:8000'
    const location = useLocation();
    const data = location.state;
    console.log(data);

    async function updatePost() {
        let response = await axios.put(`${basePath}/api/posts/${data.post.id}/`, {'id': data.post.id, 'content': content})
        console.log(response.data)

    }
 
    return (
        <div>
        <h1>{data.post.content}</h1>
        <input type='text' palceholder='title' size='100' value={content} onChange= {(e) => {setContent(e.target.value)}}/>
        <button onClick={updatePost}>Update Post</button>

        </div>
        )
}

export default PostPage