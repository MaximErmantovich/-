import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    }
    },
    {
    timestaps: true,
    },
);

export default mongoose.model('User', UserSchema);