import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    subtitle1: { type: String, required: true },
    content1: { type: String, required: true },
    subtitle2: { type: String, required: true },
    content2: { type: String, required: true },
    subtitle3: { type: String, required: true },
    content3: { type: String, required: true },
});

export default mongoose.model("guides", guideSchema);
