import { useRef, useState } from 'react';
import axios from "axios";
import './App.css';
import './backend.js';


function App() {
  const [userId,setUserId]=useState(null)
  const [formData,setformData]=useState({
    username:'',
    password:''
  });
  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setformData({
      ...formData,[name]:value,
    });
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const {data}=await axios.post('http://localhost:3030/login',formData)
        console.log(data);
        setUserId(data.Id)


      }
      catch (error){
        console.log(error);
      }
    }
  } 
  const [todolist,settodolist]=useState([]);
  const iref=useRef();
  const addtool =() =>{
    const text=iref.current.value;
    const Items={completed: false,text};
   settodolist([...todolist,Items])
   iref.current.value="";
  }
  const completedItem =(index) =>{
    const newTodos=[...todolist];
    newTodos[index].completed=!newTodos[index].completed;
    settodolist(newTodos);
  }
  const deletItems=(index) =>{
    const newTodos=[...todolist];
    newTodos.splice(index,1)
  
    settodolist(newTodos)
  }
  return (
    !userId && <form onSubmit={handleSubmit}>
      <input type='text' name='username' value={formData.username} onChange={handleInputChange}/>
<input type='password' name='password' value={formData.password} onChange={handleInputChange}/>
<button type='submit'>login</button>
    </form>
    <div className="App">
      <h2>your task</h2>
      <div className='container'>
       <ul>
    {todolist.map(({text,completed} , index) => {
      return(
      <div className='item'>
      <li className={completed ? "done" : ""}
       key={index}
        onClick={() => completedItem(index)}>{text}</li>
        <span onClick={()=> deletItems(index) }>❎</span>
       </div> )
    })}
       </ul>
       <div className='Enter'>
       <input ref={iref} placeholder='Add a task' />
       </div>
       <button onClick={addtool}><span >Add</span></button>
       </div>
    </div>
  );
}

export default App;