import React, { useState } from 'react'
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const UserTable = ({ users }) => {
    const [userName, setUserName] = useState("")

    return (
        <table className="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
            <thead className='border-b border-gray-300'>
                <tr>
                    <th className='p-3 text-left text-sm text-gray-600"'>
                        <span className='flex'>
                            <p>User Name</p>
                            <button onClick={() => {setUserName()}} className='text-gray-500 hover:text-black active:text-black cursor-pointer'><FaSort /></button>
                        </span>
                    </th>
                    <th className='p-3 text-left text-sm text-gray-600"'>Name</th>
                    <th className='p-3 text-left text-sm text-gray-600"'>Email</th>
                    <th className='p-3 text-left text-sm text-gray-600"'>Access Level</th>
                    <th className='p-3 text-left text-sm text-gray-600"'>Date Added</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user._id} className={`border-gray-300 hover:bg-gray-50 ${index === users.length - 1 ? "" : "border-b"}`}>
                        <td className='p-3 text-sm'>{user.userName}</td>
                        <td className='p-3 text-sm'>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</td>
                        <td className='p-3 text-sm'>{user.email}</td>
                        <td className='p-3 text-sm'>{user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}</td>
                        <td className='p-3 text-sm'>{new Date(user.createdAt).toLocaleDateString("en-IL")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserTable