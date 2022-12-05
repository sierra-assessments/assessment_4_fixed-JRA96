import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'

function PostsPage() {

  const [posts, setPosts] = useState([])
 

  async function getAllPosts() {
      let response = await axios.get('api/posts/')
      console.log(response.data)
      setPosts(response.data.data)

  }

  useEffect(() => {
      getAllPosts()
  }, [])

  return (
    <div>
      <h1>PostsPage</h1>
      <div>
            {posts.map((post) => (
                <ul>
                  <Link
                      to={`/posts/${post.id}`}
                      state={{post}}>
                      {post.content}
                  </Link>
                  {/* {post.content} */}
                </ul>
                ))}
        </div>
      </div>
     )
}

export default PostsPage