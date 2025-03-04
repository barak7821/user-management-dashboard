import User from "../models/userModel.js"

export const getUsers = async (req, res) => {
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