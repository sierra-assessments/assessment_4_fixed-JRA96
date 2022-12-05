import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


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
  axios.get('categories/').then(response =>{
    let data = response.data.data
    setCategories(data)
  } )
    
  }
  function createCategory( ){
    axios.post('categories/' , {'title': titleInput})
    .then( response => {
      console.log(response.data)
    }).then(
      getAllCategories()
    )
    
  }
  function updateCategory( id ){
    axios.put('categories/'+id+'/' , {'title': titleInput})
    .then( response => {
      console.log(response.data)
    }).then(
      getAllCategories()
    )
    
  }
  function deleteCategory( id){
    axios.delete('categories/'+id+'/' )
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
      <div style={{border: '3px solid black'}}>
        <h2>All Categories</h2>
        <hr/>
        {categories && categories.map(category => {
                    return <h3 onClick={()=>{}}>{category.title}</h3>
                  })
                }
      </div>
      
      <div style={{border: '3px solid black'}}>

            <h3>Add a category</h3>
            
            <div>  
              <label> 
                Title
                  <input 
                      type='text'
                      placeholder='title'
                      value={titleInput} 
                      onChange={(event)=>{setTitleInput(event.target.value)}}
                      />
                          
              </label>
              <button onClick={()=>{createCategory()}}> add new category</button>
            </div>
        </div>
        <hr/>
        <div style={{border: '3px solid black'}}>
        <h2>update category</h2>
        <hr/>
        {categories && categories.map(category => {
                    return <div>
                    <input type='text'
                      placeholder={category.title}
                      value={titleInput} 
                      onChange={(event)=>{setTitleInput(event.target.value)}}/>
                    <button onClick={() => updateCategory(category.id)}>update</button>
                    <button onClick={() => deleteCategory(category.id)}>delete</button>
                    </div>
                  })
                }
      </div>

    </div>

  )

}

export default App
