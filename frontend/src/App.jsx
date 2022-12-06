import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import HomePage from './components/HomePage'
import CategoriesPage from './components/CategoriesPage'
import PostsPage from './components/PostsPage'
import CategoryPage from './components/CategoryPage';
import PostPage from './components/PostPage';
import CategoryPosts from './components/CategoryPosts'
import CategorySinglePost from './components/CategorySinglePost';


function App() {

  const [categories, setCategories] = useState([])
  const [categoryID, setCategoryID] = useState(null)
  const [titleInput, setTitleInput] = useState('')

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken


 function getAllCategories(){
  axios.get('api/categories/').then(response =>{
    let data = response.data.data
    setCategories(data)
  } )
    
  }
  function createCategory( ){
    axios.post('api/categories/' , {'title': titleInput})
    .then( response => {
      console.log(response.data)
    }).then(
      getAllCategories()
    )
    
  }
  function updateCategory( id ){
    axios.put('api/categories/'+id+'/' , {'title': titleInput})
    .then( response => {
      console.log(response.data)
    }).then(
      getAllCategories()
    )
    
  }
  function deleteCategory( id){
    axios.delete('api/categories/'+id+'/' )
    .then( response => {
      console.log(response.data)
    }).then(
      getAllCategories()
    )
    
  }
  
  useEffect(()=>{

    getAllCategories()
 
      }, [])

  return (

    

    <div className='App'>
      
      <Router>

      <NavBar bg='dark' variant='light'>
        <Link to='/'> Home </Link>
        <Link to='/categories'> Categories </Link>
        <Link to='/posts'> Posts </Link>
      </NavBar>
      
      <h1>CodePlatoon Discussion!</h1>

       <Routes>
         <Route path=''  element= {<HomePage/>}/>
         <Route path='categories/'  element= {<CategoriesPage/>}/>
         <Route path='posts/'  element= {<PostsPage/>}/>
         <Route path='categories/:id' element= {<CategoryPage/>}/>
         <Route path='posts/:id' element= {<PostPage/>}/>
         <Route path='categories/:id/posts' element= {<CategoryPosts/>}/>
         <Route path='categories/:id/posts/:id' element= {<CategorySinglePost/>}/>
       </Routes>
     </Router> 
    

    </div>

  )

}

export default App
