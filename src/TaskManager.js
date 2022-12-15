import './taskManager.css'
import Task from './Task'
import AddTask from './AddTask'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from './firebase'

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [data, setData] = useState([])

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      const response = (querySnapshot.docs.map(item => ({
        id: item.id,
        data: item.data()
      })))
      setData(response)
    })
  }, [])

  return (
    <div className='taskManager'>
      <header>Task Manager</header>
      <div className='taskManager__container'>
        <button
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
        <div className='taskManager__tasks'>
          {data?.map((item, i) => {
            return <Task
              id={item.id}
              key={item.id}
              title={item.data.title}
              description={item.data.description}
              completed={item.data.completed}
            />
          }
          )}
        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      }

    </div>
  )
}

export default TaskManager
