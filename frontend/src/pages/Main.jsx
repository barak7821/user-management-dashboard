import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar"
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const nav = useNavigate()
  const notyf = new Notyf({
    position: {
      x: 'center',
      y: 'top'
    }
  })
  const [userData, setUserData] = useState(null)
  const [updateUserName, setUpdateUserName] = useState("")
  const [updateName, setUpdateName] = useState("")
  const [updateEmail, setUpdateEmail] = useState("")

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return nav("/login")

        const { data } = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/api/user`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUserData(data)
      } catch (error) {
        console.log("Failed to fetch user data", error)
      }
    }
    getUser()
  }, [])

  if (!userData) return <p className="flex justify-center items-center">Loading...</p>

  const { userName, name, email, createdAt, role } = userData
  const formattedDate = new Date(createdAt).toLocaleDateString("en-IL")


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await axios.patch(`http://localhost:${import.meta.env.VITE_PORT}/api/user/update`, {
        userName: updateUserName,
        name: updateName,
        email: updateEmail,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response.data)
      notyf.success("Profile updated successfully!")
    } catch (error) {
      console.log("Failed to update user data", error)
      if (error.response.status === 404) return notyf.error("User not found. Please try again.")
      notyf.error("Something went wrong. Please try again later.")
    }
  }

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await axios.delete(`http://localhost:${import.meta.env.VITE_PORT}/api/user/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response.data)
      notyf.success("Your account has been deleted successfully.")
      localStorage.removeItem("token")
      nav("/login")
    } catch (error) {
      console.log("Failed to delete user data", error)
      if (error.response.status === 404) return notyf.error("User not found. Please try again.")
      notyf.error("Something went wrong. Please try again later.")
    }
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <NavBar />
      <div className='m-5 flex items-center justify-center mt-10'>
        <div className='bg-gray-100 flex flex-row rounded-2xl shadow-lg max-w-4xl p-10 items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input onChange={(e) => { setUpdateUserName(e.target.value) }} className='p-2 mt-4 rounded-xl bg-white' placeholder={userName} />
            <input onChange={(e) => { setUpdateName(e.target.value) }} className='p-2 mt-4 rounded-xl bg-white' placeholder={name} />
            <input onChange={(e) => { setUpdateEmail(e.target.value) }} className='p-2 mt-4 rounded-xl bg-white' placeholder={email} />
            <input className='p-2 mt-4 rounded-xl bg-white' placeholder={formattedDate} disabled />
            {role &&
              <input className='p-2 mt-4 rounded-xl bg-white' placeholder={role} disabled />
            }
            <button type="submit">Update</button>
            <button onClick={deleteUser} type="button">Delete User</button>
          </form>
        </div>
      </div>
    </div>
  )
}
