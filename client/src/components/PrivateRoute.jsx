import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {

    const {currentUser} = useSelector((state)=>state.user)
  return (
    currentUser && currentUser.isAdmin?<Outlet></Outlet>:<Navigate to='/'></Navigate>
  )
}

export default PrivateRoute