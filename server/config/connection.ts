import mongoose from "mongoose";

function setupDBConnection() {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        console.error("MongoDB connection string is not set");
        process.exit(1);
    }

    mongoose
        .connect(connectionString, { connectTimeoutMS: 2000 })
        .then(() => console.log("Database connected"))
        .catch((error) => console.error(error));
}

export default setupDBConnection;
