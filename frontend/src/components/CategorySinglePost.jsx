import React from 'react'
import axios from "axios"
import {Link, useLocation} from 'react-router-dom'

export default function CategorySinglePost() {

    const location = useLocation();
    const data = location.state;
    console.log(data)

  return (
    <div>
        <h1>{data.post.content}</h1>
    </div>
  )
}
