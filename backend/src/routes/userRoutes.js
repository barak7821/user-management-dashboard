import Express from "express"
import { deleteUser, getUser, updateUser } from "../controllers/UserController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Express.Router()

router.get("/", authMiddleware, getUser)
router.patch("/update", authMiddleware, updateUser)
router.delete("/delete", authMiddleware, deleteUser)

export default router