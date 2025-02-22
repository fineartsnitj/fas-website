import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logoutSuccess } from '../redux/userSlice';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  async function handleLogout() {
    try {
      await axios.get(`${BASE_URL}/v1/auth/logout`);
      dispatch(logoutSuccess());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <style>
        {
            `.animate-fadeInFirst { animation: fadeInDown 1s ease-out 0.5s backwards; }
            `
        }
    </style>
    <header className=" w-full flex items-center justify-between px-6 animate-fadeInFirst">
      {/* Logo */}
      <Link to="/">
        <img src="/images/faslogo.png" alt="FAS Logo" className="h-[110px]" />
      </Link>
  
      {/* Navigation & Buttons */}
      <div className="flex fixed top-6 right-6 gap-x-6 justify-center items-center z-10">
        {currentUser ? (
          <p>
            Welcome{' '}
            <Link
              to="/profile"
              className="link link-hover text-xs sm:text-sm font-bold hover:text-accent transition-colors duration-200"
            >
              {currentUser?.username?.toUpperCase()}
            </Link>
          </p>
        ) : (
          <Link
            to="/register"
            className="btn btn-sm btn-accent hover:btn-secondary transition-colors duration-200"
          >
            Register
          </Link>
        )}
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-error hover:btn-warning transition-colors duration-200"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm btn-accent hover:btn-secondary transition-colors duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;