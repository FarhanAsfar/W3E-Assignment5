import './App.css'
import { TaskList } from './pages/TaskList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TaskDetail } from './pages/TaskDetail'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
