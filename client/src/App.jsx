import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Error from './pages/Error'
import Register from './pages/Register'
import HomeLayout from './pages/HomeLayout'
import Home from './pages/Home'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<HomeLayout></HomeLayout>} errorElement={<Error></Error>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<Error></Error>}></Route>
      </Routes>
    </Router>
  )
}

export default App