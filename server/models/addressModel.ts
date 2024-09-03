import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    complementary: { type: String, required: false },
    postCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
});

export default mongoose.model("addresses", addressSchema);