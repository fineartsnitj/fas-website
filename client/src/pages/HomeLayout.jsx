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
import MemberProfile from './Members/MemberProfile'
import Admin from './Admin/Admin';

const HomeLayout = () => {
  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(images/image1.jpg)` }}
    >
        <Header></Header>
        <Navbar></Navbar>
        <section className='align-elements py-20'>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='about' element={<About></About>}></Route>
                <Route path='gallery' element={<Gallery></Gallery>}></Route>
                <Route path='fasgallery' element={<FasGallery></FasGallery>}></Route>
                <Route path='members' element={<Members></Members>}></Route>
                <Route path='members/:username' element={<MemberProfile></MemberProfile>}></Route>
                <Route path='fasadmin' element={<Admin></Admin>}></Route>
                <Route element={<PrivateRoute></PrivateRoute>}>

    
                    {/* <Route path='profile' element={<Profile></Profile>}></Route> */}
                </Route>
                
            </Routes>
        </section>
        </div>
    </>
  )
}

export default HomeLayout