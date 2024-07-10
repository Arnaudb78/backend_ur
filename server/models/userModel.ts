import mongoose, { Document, Schema } from 'mongoose';
import { UserRole } from '../dto/userDto';

interface IUser extends Document {
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    rules: boolean;
    isNewsletter: boolean;
    accessToken: string;
    pic: string;
    role: UserRole;
}

const userSchema: Schema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rules: { type: Boolean, required: true },
    isNewsletter: { type: Boolean, required: true },
    accessToken: { type: String },
    pic: { type: String },
    role: { type: String, enum: Object.values(UserRole), required: true } 
});

export default mongoose.model<IUser>('User', userSchema);
