import React from 'react'
import ManageMember from './ManageMember'
import ManageArtworks from './ManageArtworks'
import ManageRoles from './ManageRoles'

const Admin = () => {
  return (
    <div className=' text-secondary'>
        Admin Page
        <h1>Hello Admin</h1>
        <ManageMember></ManageMember>
        <ManageArtworks></ManageArtworks>
        <ManageRoles></ManageRoles>
    </div>
  )
}

export default Admin