import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
    coverUrl: String,
    name:{
        type: String,
        required: true,
    },
    model:{
        type: String,
        required: true,
    },
    year:{
        type: String,
        required: true,
    },
    volume:{
        type: Number,
        required: true,
    },
    cost:{
        type: Number,
        required: true,
    }
    },
    {
    timestaps: true,
    },
);

export default mongoose.model('Car', CarSchema);