import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully | " + connection.connection.host);
    } catch (error) {
        console.log("Error connecting to database " + error);
        process.exit(1);
    }
}

export default connectToDB;