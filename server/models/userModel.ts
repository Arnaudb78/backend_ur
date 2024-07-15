import mongoose from "mongoose";

// Définir l'énumération Role en TypeScript
const Role = {
    ADMIN: "admin",
    USER: "user",
};

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rules: { type: Boolean, default: false },
    isNewsletter: { type: Boolean, default: false },
    role: {
        type: String,
        enum: [Role.ADMIN, Role.USER], 
        default: Role.USER,
    },
});

export default mongoose.model("users", userSchema);
