import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Unauthorized" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        const user = await User.findById(decoded.id)
        if (!user) return res.status(404).json({ message: "User not found" })

        req.user.role = user.role
        
        next()
    } catch (error) {
        console.log("Token verification error:", error.message)
        res.status(403).json({ message: "Unauthorized" })
    }
}

export default authMiddleware