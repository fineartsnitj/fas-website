import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import PrivateRoute from '../components/PrivateRoute'
import Home from './Home'
import Gallery from './Gallery/Gallery'
import FasGallery from './Gallery/FasGallery'
import Members from './Members/Members'

const HomeLayout = () => {
  return (
    <>
        <Header></Header>
        <Navbar></Navbar>
        <section className='align-elements py-20'>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='about' element={<About></About>}></Route>
                <Route path='gallery' element={<Gallery></Gallery>}></Route>
                <Route path='fasgallery' element={<FasGallery></FasGallery>}></Route>
                <Route path='members' element={<Members></Members>}></Route>
                <Route element={<PrivateRoute></PrivateRoute>}>
    
                    {/* <Route path='profile' element={<Profile></Profile>}></Route> */}
                </Route>
                
            </Routes>
        </section>
    </>
  )
}

export default HomeLayout