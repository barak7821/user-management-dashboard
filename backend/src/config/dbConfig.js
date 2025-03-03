import mongoose from "mongoose"

const setConnectionDB = async () => {
    try {
        const MongoDBConnection = await mongoose.connect(process.env.MongoDB_URL)
        console.log(`MongoDB connected: ${MongoDBConnection.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error:", error)
    }
}

export default setConnectionDB