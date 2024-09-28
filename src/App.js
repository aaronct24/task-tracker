import React, {useState,useEffect } from 'react';
import './App.css';

function App() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //Funcion que agrega las tareas
  const addTask = () => {
    if(newTask.trim()){
      setTasks([...tasks, {text: newTask, completed: false}]);
      setNewTask('');
    }
  };

  //Funcion que elimina las tareas
  const deleteTasks = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  //Funcion para marcar tareas como completadas
  const toggleComplete = (index) =>{
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return(
    <div className="app">
      <h1>Task Tracker</h1>
      
      <div className="task-input">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Añadir nueva tarea" 
        />
        <button onClick={addTask}>Añadir</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(index)}>{task.text}</span>
            <button onClick={() => deleteTasks(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;
