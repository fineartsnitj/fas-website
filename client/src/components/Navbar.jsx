import React, { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './styles/contact-modal.css';


const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "autumn";
};

const Navbar = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage());
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for mobile dropdown
  const location = useLocation();

  const handleTheme = () => {
    const newTheme = theme === "autumn" ? "sunset" : "autumn";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [isModalActive, setModalActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate= useNavigate();
  

  const navigateTo = (page) => {
    // Smooth button animation
    const button = document.activeElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
      window.location.href = `${page}.html`;
    }, 200);
  };

  useEffect(() => {

    const handleOutsideClick = (e) => {
      if (e.target.className.includes('contact-modal') && !isClosing) {
        closeModal();
      }
    };

    const closeModal = () => {
      setIsClosing(true);
      setTimeout(() => {
        setModalActive(false);
        setIsClosing(false);
      }, 600); // Matches animation duration
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isClosing]);

  useEffect(() => {
    if (location.pathname !== "/") {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 100);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location]);

  const isHomePage = location.pathname === "/";

  return (
    <>
    <nav
      className={`fixed bottom-[6%] left-[calc(50%-315px)] flex items-center bg-[#919191]/30 backdrop-blur-[10px] border-[#919191]/30 border-[1px] border-solid h-[75px] py-3 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 ${
        !isHomePage && !isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      } animate-fadeInUp animate-navBarGlow z-50`}
    >
      <div className="navbar align-elements w-full">
        {/* Left Side: Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn btn-ghost lg:hidden"
            >
              <FaBarsStaggered className="h-6 w-6" />
            </button>
            {isDropdownOpen && (
              <ul
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-200 rounded-box absolute left-0 top-full"
                onClick={() => setIsDropdownOpen(false)}
              >
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/gallery">Gallery</NavLink>
                </li>
                <li>
                  <NavLink to="/fasgallery">FAS Gallery</NavLink>
                </li>
                <li>
                  <NavLink to="/members">Members</NavLink>
                </li>
                <li>
                <button id="contactBtn" onClick={() => setModalActive(true)}>Contact</button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal flex-row gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/fasgallery">FAS Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/members">Members</NavLink>
            </li>
            <li>
            <button id="contactBtn" onClick={() => setModalActive(true)}>Contact</button>
            </li>
          </ul>
        </div>

        {/* Right Side: Theme Toggle */}
        <div className="navbar-end">
          <label className="swap swap-rotate cursor-pointer">
            <input type="checkbox" onChange={handleTheme} checked={theme === "sunset"} />
            <BsSunFill className="swap-on h-5 w-5 text-[#c7c7c7]" />
            <BsMoonFill className="swap-off h-5 w-5 text-[#878787]" />
          </label>
        </div>
      </div>
    </nav>

{isModalActive && (
    <div className={`contact-modal ${isClosing ? 'closing' : ''} active`}>
      <div className="contact-content">
        <button className="close-modal" onClick={() => setModalActive(false)}>x</button>
        <h2 className="contact-title">Something to ask?</h2>
        <div className="contact-buttons">
          <a href="mailto:contact@fineartssociety.com" className="contact-button email-btn">Email Us</a>
          <a href="https://linkedin.com/company/nitj-fineartssociety" target="_blank" className="contact-button linkedin-btn">LinkedIn</a>
          <a href="https://instagram.com/fineartssociety" target="_blank" className="contact-button instagram-btn">Instagram</a>
        </div>
      </div>
    </div>
  )}

</>
  );
};

export default Navbar;
