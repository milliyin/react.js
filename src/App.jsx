import { useState } from "react"
import "./styles.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function App(){
  const [newItem,setNewItem] = useState("")
  const [todos,setTodos] = useState([])
  const [historys,sethistorys] = useState([])


  function handleSubmit(e){
    e.preventDefault()
    if (newItem.length > 0){
    setTodos(currentTodos => {
    return[
      ...currentTodos,{
        id: crypto.randomUUID(),title: newItem, completed: false
      },
    ]
    }
  )
  setNewItem("")
  }
}
function Toggletodo(id,completed){
  setTodos(currentTodos => {
    return currentTodos.map(todo => {
      if(todo.id == id){
        return {...todo,completed}
      }
      return todo
    })
  })
}
function deleteTodo(id,titlee){
  sethistorys(currenthistory => {
    return[
      ...currenthistory,{
        id: crypto.randomUUID(), title: titlee
      },
    ]
  })
  setTodos(currentTodos => {
    return currentTodos.filter(todo => todo.id !== id)
  })
  
}
function deletealltodos(todos){
  sethistorys(currenthistory => {
    // return[
    //   ...currenthistory, todos.map(todo => ({id: todo.id, title: todo.title,}))
    // ]
    todos.map(todo=> (currenthistory.push({id: todo.id, title: todo.title})))
    return currenthistory
  })
  setTodos([])
}
console.log(historys)
  return (<>
  <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
    
      <label htmlFor="item" className="title">TODO LIST</label>
      <label htmlFor="item" className="title-small">Create your list</label>
      <input value={newItem}
       onChange={ e => setNewItem(e.target.value)} 
       type="text" 
       id="item">
       </input>
    </div>
    <button className="btn">Add</button>
  </form>
  <h1 className="Header">Todo List</h1>
  <ul className="list">
    {todos.length === 0 && "No Todos"}
    {todos.map(todo => {
      return(
    <li key={todo.id}>
    <label>
      <input type="checkbox" checked={todo.completed} onChange={e => Toggletodo(todo.id,e.target.checked)}/>
      {todo.title}
    </label>
    <button onClick={()=> deleteTodo(todo.id,todo.title)} className="btn btn-danger">Delete</button>
  </li>
  )
    })}
  </ul>
  <button onClick={() => deletealltodos(todos)} className="btn-red">Clear All Task</button>
  <Popup trigger={<button className="btn"> History</button>} position="right center">
  <h7 className="Header">Todo History</h7>
  <ul className="list list-h">
  {historys.length === 0 && "No History"}
    {historys.map(history => {
      return(
        <li  key={history.id}>
          <label >
            {history.title}
          </label >
        </li>
      )
    })}
  </ul>

  </Popup>
  </>
  )
}