import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { logoutSuccess } from '../redux/userSlice'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  async function handleLogout() {
    try {
      await axios.get(`${BASE_URL}/v1/auth/logout`);
      dispatch(logoutSuccess());
    }
    catch (err) {
      console.log(err)
    }

  }

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className="align-elements flex justify-center sm:justify-end">
        <div className="flex gap-x-6 justify-center items-center">

          {
            currentUser ? <p>Welcome <Link to='/profile' className='link link-hover text-xs sm:text-sm font-bold'>{currentUser?.username?.toUpperCase()}</Link></p> : <Link to='/register' className='link link-accent link-hover text-xs sm:text-sm'>Register</Link>
          }
          {
            currentUser ? <button onClick={handleLogout} className=' btn-accent text-xs sm:text-sm'>Logout</button> : <Link to='/login' className='link link-hover text-xs sm:text-sm link-accent'>Login</Link>
          }
        </div>

      </div>
    </header>
  )
}

export default Header