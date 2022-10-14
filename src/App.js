import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function App() {
  { document.body.style.backgroundColor = "#333" }
  { document.body.style.color = "white" }

  // Tasks(todolist)
  const [todo, settodo] = useState(
    //   [
    //   { id: 1, title: "Task One", status: false },
    //   { id: 2, title: "Task Two", status: false }
    // ]
    [])
  const [newtask, setnewtask] = useState('')
  const [updatedata, setupdatedata] = useState('')

  // Add Task
  const addTask = () => {

    if (newtask) {
      let num = todo.length + 1;
      let newEntry = { id: num, title: newtask, status: false }
      settodo([...todo, newEntry])
    }
    setnewtask('')
  }

  //Delete Task 
  const deleteTask = (id) => {

    let newtasks = todo.filter(task => task.id !== id)
    settodo(newtasks);
  }
  //Check Task is completed
  const markdone = (id) => {
    let newtasks = todo.map(task => {

      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    settodo(newtasks);
  }

  //Cancel updating Task
  const cancelupdate = () => {

    setupdatedata('');
  }

  //Update Task

  const changetask = (e) => {
    let newEntry = {
      id: updatedata.id,
      title: (e.target.value),
      status: updatedata.status ? true : false
    }
    setupdatedata(newEntry);
  }

  const updatetask = () => {
    let filterRecords = [...todo].filter(task => task.id !== updatedata.id)
    let updatedobj = [...filterRecords, updatedata]
    settodo(updatedobj)
    setupdatedata('')
  }
  return (
    <div className='container App' >

      <br /> <br />
      <h2> ToDo List App</h2>
      <br /> <br />


      {updatedata && updatedata ? (
        <>
          {/* Update Tasks */}
          <div className='row'>
            <div className='col'>
              <input type="text"
                className='form-control form-control-lg'
                value={updatedata && updatedata.title}
                onChange={(e) => changetask(e)}
              />
            </div>
            <div className='col-auto'>
              <button onClick={updatetask}
                className='btn btn-lg btn-success mr-20'>Update
              </button>
              <button className='btn btn-lg btn-warning' onClick={cancelupdate}> Cancel</button>
            </div>
          </div>
          <br />

        </>
      ) : (

        // Add Tasks
        <>
          <div className='row'>
            <div className='col'>
              <input value={newtask}
                onChange={(e) => setnewtask(e.target.value)}
                type="text"
                placeholder='Enter Your Task'
                className='form-control form-control-lg'
              />
            </div>
            <div className='col-auto'>
              <button className='btn btn-success' onClick={addTask}>Add Task</button>
            </div>

          </div>
          <br />

        </>
      )
      }
      {/* // Display Tasks */}

      {todo.length ? '' : " No Tasks..."}
      {todo && todo.map

        ((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'> {index + 1}</span>
                  <span className='taskText'> {task.title}</span>
                </div>
                <div className='iconsWrap'>
                  <span title='Completed/Not Completed' onClick={(e) => markdone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {task.status ? null : (
                    <span title='Edit'
                      onClick={() => setupdatedata(
                        {
                          id: task.id,
                          title: task.title,
                          status: task.status ? true : false
                        })}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}
                  <span title='Delete' onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTrashCan} /> </span>

                </div>
              </div>
            </React.Fragment>
          )
        })}
    </div>

  )
}

export default App