import './App.css'
import { TaskList } from './pages/TaskList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TaskDetail } from './pages/TaskDetail'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
