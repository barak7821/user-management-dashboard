import Express from "express"
import { getUsers } from "../controllers/adminController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Express.Router()

router.get("/", authMiddleware, getUsers)

export default router