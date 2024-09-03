import mongoose from "mongoose";

const gardenSchema = new mongoose.Schema({
    name: { type : String, required: true},
    description: { type : String, required: true},
    address: { type: mongoose.Schema.Types.ObjectId, ref : "Address", required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref : "User", required: true},
    Members: [{ type: mongoose.Schema.Types.ObjectId, ref : "User"}],
    capacity: { type : Number, required: true},
})

export default mongoose.model("gardens", gardenSchema);