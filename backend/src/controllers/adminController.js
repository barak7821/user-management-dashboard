import User from "../models/userModel.js"

export const getUsersAdmin = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" })

        const users = await User.find().select().select("userName email name createdAt role")
        if (users.length === 0) return res.status(404).json({ message: "No users found" })

        res.status(200).json(users)
    } catch (error) {
        console.log("Error in getUsers controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteUserAdmin = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admins only." })

        const { userId } = req.body
        if (!userId) return res.status(400).json({ message: "User ID is required" })

        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) return res.status(404).json({ message: "User not found" })

        console.log(`User ${deletedUser.userName} deleted successfully`)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.log("Error in deleteUserAdmin controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateUserById = async (req, res) => {
    const { userName, name, email, role } = req.body
    const { userId } = req.params

    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" })
        }

        const updateFields = {}

        if (userName) updateFields.userName = userName
        if (name) updateFields.name = name
        if (email) updateFields.email = email.toLowerCase()
        if (role) updateFields.role = role

        if (Object.keys(updateFields).length === 0) return res.status(400).json({ message: "No fields to update" })

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            updateFields,
            { new: true }
        )

        if (!updatedUser) return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: `${updatedUser.userName} updated successfully` })

    } catch (error) {
        console.log("Error in updateUserById controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getUserById = async (req, res) => {
    const { userId } = req.params

    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" })
        }

        const user = await User.findById(userId).select("userName email name createdAt role")
        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUserById controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}