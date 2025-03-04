import User from "../models/userModel.js"

export const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("userName email name createdAt role")
        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUser controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateUser = async (req, res) => {
    const { userName, name, email, role } = req.body
    try {
        const userId = req.user.id
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

        console.log(`${updatedUser.userName} updated successfully`)
        res.status(200).json({ message: `${updatedUser.userName} updated successfully` })

    } catch (error) {
        console.log("Error in updateUser controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id

        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) return res.status(404).json({ message: "User not found" })

        console.log(`User ${deletedUser.userName} deleted successfully`)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.log("Error in deleteUser controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}