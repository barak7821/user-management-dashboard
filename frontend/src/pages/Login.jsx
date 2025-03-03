import React, { useState } from 'react'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import image from "../assets/test.png"
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from "axios"
import NavBar from "../components/NavBar"

export default function Login() {
  const nav = useNavigate()
  const notyf = new Notyf({
    position: {
      x: 'center',
      y: 'top'
    }
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) return notyf.error("Please fill out all fields. All fields are required.")
    if (!email.includes("@")) return notyf.error("Please provide a valid email address.")
    if (password.length < 8 || password.length === 20) return notyf.error("Your password should be between 8 and 20 characters.")

    try {
      const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/login`, {
        email,
        password
      })
      console.log(response.data)
      notyf.success("Login successful.")
      nav("/")
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) return notyf.error("Invalid email or password. Please try again.")
    }
  }

  const handleReg = () => {
    nav("/register")
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <NavBar />
      <div className='m-5 flex items-center justify-center mt-10'>
        <div className='bg-gray-100 flex flex-row rounded-2xl shadow-lg max-w-4xl p-5 items-center'>

          {/* inputs & buttons */}
          <div className='md:w-1/2 px-16'>
            <h2 className='text-2xl font-bold text-blue-900'>Login</h2>
            <p className='text-sm mt-4 text-blue-900'>If you are already a member, easily log in</p>

            {/* inputs */}
            <form onSubmit={handleLogin} className='flex flex-col gap-4'>
              <input onChange={(e) => { setEmail(e.target.value) }} className='p-2 mt-4 rounded-xl bg-white' type="email" placeholder='Email' />
              <span className='relative'>
                <input onChange={(e) => { setPassword(e.target.value) }} className='p-2 mt-4 rounded-xl bg-white w-full' type={isPasswordVisible ? "text" : "password"} placeholder='Password' />
                <button onClick={() => { !isPasswordVisible ? setIsPasswordVisible(true) : setIsPasswordVisible(false) }} className='absolute top-1/2 right-3' type="button">
                  {isPasswordVisible ? <LuEyeClosed className='text-gray-300 cursor-pointer active:text-black active:scale-110 duration-150' /> :
                    <LuEye className='text-gray-300 cursor-pointer active:text-black active:scale-110 duration-150' />}
                </button>
              </span>
              <button type='submit' className='bg-blue-900 rounded-xl text-white py-2 w-full mt-5 cursor-pointer hover:scale-105 active:scale-95 duration-300'>Login</button>
            </form>


            {/* Seperator */}
            <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
              <hr className='border-gray-500' />
              <p className='text-center text-sm'>OR</p>
              <hr className='border-gray-500' />
            </div>

            <div className='mt-3 text-sm flex justify-between items-center'>
              <p>Don't have an account...</p>
              <button onClick={handleReg} className='py-2 px-5 bg-white rounded-xl cursor-pointer hover:scale-110 active:scale-95 duration-300'>Register</button>
            </div>
          </div>

          {/* img */}
          <div className='w-1/2 md:block hidden'>
            <img className='rounded-2xl max-w-full' src={image} />
          </div>
        </div>
      </div>
    </div>
  )
}
