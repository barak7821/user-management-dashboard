import User from "../models/userModel.js"
import { hashPassword, checkPassword } from "../utils/passwordUtils.js"

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(401).json({ error: "Email and password are required." })

        const userData = await User.findOne({ email: email.toLowerCase() })
        if (!userData) return res.status(401).json({ message: "Invalid email or password. Please try again." })

        const isPasswordCorrect = await checkPassword(password, userData.password)
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password. Please try again." })

        console.log("Login successful.")
        res.status(200).json({ message: "Login successful." })
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const register = async (req, res) => {
    const { userName, name, email, password } = req.body
    try {
        if (!userName || !name || !email || !password) return res.status(400).json({ message: "All fields are required" })
        if (password.length < 8 || password.length > 20) return res.status(400).json({ message: "Password should be between 8 and 20 characters" })

        const userData = await User.findOne({ email: email.toLowerCase() })
        if (userData) return res.status(409).json({ message: "Email already exists" })

        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            userName,
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        })

        await newUser.save()
        console.log(`${userName} added successfully`)
        res.status(200).send(`${userName} added successfully`)
    } catch (error) {
        console.log("Error in register controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {

}