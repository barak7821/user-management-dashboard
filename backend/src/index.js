import Express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import setConnectionDB from "./config/dbConfig.js"

dotenv.config()

const app = Express()
app.use(Express.json())
app.use(cors({
    origin: "*"
}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`listening of ${PORT}...`)
    setConnectionDB()
})