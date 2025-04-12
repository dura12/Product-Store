import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URL); 
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection error:", error.message);
        process.exit(1);
    }

};
