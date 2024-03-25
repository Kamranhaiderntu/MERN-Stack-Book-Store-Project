import mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    }
);

export const Book = mongoose.model('Cat', bookSchema);