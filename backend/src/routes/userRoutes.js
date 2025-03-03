import Express from "express"
import { login, register, logout } from "../controllers/userControllers.js"

const userRouter = Express.Router()

userRouter.post("/login", login)
userRouter.post("/register", register)
userRouter.post("/register", logout)

export default userRouter