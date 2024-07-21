import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
    author: { type: String, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
