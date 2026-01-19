import './App.css'
import { TaskList } from './pages/TaskList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TaskDetail } from './pages/TaskDetail'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Navbar } from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
