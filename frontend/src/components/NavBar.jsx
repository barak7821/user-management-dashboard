import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosMenu, IoIosClose } from "react-icons/io";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <nav className='bg-[#1D3557] text-white sticky w-full top-0 left-0 z-50 shadow-xl'>
        <ul className='flex items-center text-center justify-between py-3 gap-4'>
          {/* large screens */}
          <li className='ml-5 cursor-pointer font-semibold hover:scale-105 active:scale-95 duration-300 sm:block hidden'>
            <Link to="/">Home</Link>
          </li>
          <li className='mr-5 cursor-pointer font-semibold hover:scale-95 active:scale-90 duration-300 sm:block hidden'>
            <Link to="/login">Login</Link>
          </li>
          {/* small screens */}
          <li className='ml-5 pt-1 scale-300 sm:hidden'>
            <button onClick={toggleMenu} className='active:scale-90 duration-300'>
              {isOpen ? <IoIosClose /> : <IoIosMenu />}
            </button>
          </li>
        </ul>
      </nav>

      {/* open menu when clicked */}
      {isOpen && (
        <div className="sm:hidden fixed top-12 left-0 bg-[#1D3557]/90 w-full min-h-screen py-10
         text-white z-100 flex justify-center items-center text-4xl">
          <ul>
            <li className='mb-10 hover:scale-105 cursor-pointer active:scale-95 duration-150'>
              <Link to="/">Home</Link>
            </li>
            <li className='mb-10 hover:scale-105 cursor-pointer active:scale-95 duration-150'>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
