import React, { useState } from 'react';

const App = () => {
  const [form, setForm] = useState(
    {
      title: "",
      date: "",
    }
  )
  const [tasks, setTask] = useState([]);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) return alert("Please fill title and date")

    if (editId) {
      setTask(
        tasks.map((task) => (
          task.id === editId ? { ...task, ...form } : task
        ))
      )
      setEditId(null);
    } else {
      setTask([...tasks, { id: Date.now(), ...form }])
    }
    setForm({
      title: "",
      date: ""
    })

  }

  const handleEdit = (task) =>{
    setForm({
      title: task.title,
      date: task.date,
      
    })
    setEditId(task.id)
  }

  const handleDelete = (id) =>{
    setTask(tasks.filter(task => task.id != id))
  }
  
  const handleToggle = () =>{
    setStatus(prev => !prev)
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "Auto" }}>
      <h1>Task Manager</h1>
      <form onSubmit={submitForm} >
        <input type="text" name='title' value={form.title} onChange={handleChange} />
        <input type="date" name="date" value={form.date} onChange={handleChange} id="" />
        <button type='submit'>Add Task</button>
      </form>

      {/* Task List  */}
      <ul>
        {
          tasks.map((task) => (
            <li key={task.id}>
              {task?.title} {task.date}

              <button onClick={()=>handleEdit(task)}>Edit Task</button>
              <button onClick={()=> handleDelete(task.id)}>Delete Task</button>
              <button onClick={() => handleToggle() }>{status ? "Done" : "Progressing"}</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;