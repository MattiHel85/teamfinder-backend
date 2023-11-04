import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        text: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = model('Post', PostSchema) 