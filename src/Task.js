import './task.css'
import { useState } from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { db } from './firebase'
import { deleteDoc, updateDoc, doc } from 'firebase/firestore'

function Task({ id, title, description, completed }) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({ edit: false, view: false })

  const handleClose = () => {
    setOpen({ edit: false, view: false })
  }

  /* function to update document in firestore */
  const postCheck = async (e) => {
    setChecked(!checked)
    const status = checked ? false : true
    setChecked(status)
    e.preventDefault()
    const taskDocRef = doc(db, 'tasks', id)
    try {
      await updateDoc(taskDocRef, {
        completed: status
      })
    }
    catch (e) {
      console.log(e);
    }

  }

  const deleteTask = async () => {
    const taskDocRef = doc(db, 'tasks', id)
    try {
      await deleteDoc(taskDocRef)
    }
    catch (e) {
      console.log(e);
    }
  }

  /* function to delete a document from firstore */

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className='checkbox-custom'
          name="checkbox"
          checked={checked}
          type="checkbox" />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={(e) => postCheck(e)} ></label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button
              className='task__editButton'
              onClick={() => setOpen({ ...open, edit: true })}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={() => deleteTask()}>Delete</button>
          </div>
          <button
            onClick={() => setOpen({ ...open, view: true })}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view} />
      }

      {open.edit &&
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task