import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{
            serverSelectionTimeoutMS: 5000,
            useUnifiedTopology: true
        })
        console.log("Database connected")
        console.log(connectionInstance.connection.db.databaseName)
        console.log(connectionInstance.connection.host)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB