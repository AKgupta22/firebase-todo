import Modal from "./Modal"
import { useState } from 'react'
import './addTask.css'
import { db } from './firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

function AddTask({ onClose, open }) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  /* function to add new task to firestore */
  const postData = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now()
      })
      onClose()

    }
    catch (e) { console.log(e); }
  }

  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form className='addTask' name='addTask' onSubmit={postData}>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder='Enter title' />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form>
    </Modal>
  )
}

export default AddTask
