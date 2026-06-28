import mongoose from 'mongoose'

export const connectToDb = async ()=>{
    try {
       await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Connected to Database")
    } catch (error) {
        console.log("Error connecting to db : ",error)
    }
}