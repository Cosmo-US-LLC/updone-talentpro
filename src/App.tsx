import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Auth from './pages/Auth'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      {/* <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<RecentActivity />} />
        <Route path="project/:id" element={<Project />} />
      </Route> */}
    </Routes>
    </>
  )
}

export default App
