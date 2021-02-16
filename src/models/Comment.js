import mongoose, { Schema } from 'mongoose';

const {Scehma} = mongoose;

const CommentSchema = new Schema({
    text:{
        type: String,
        required: 'Text is required'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    video:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Comment", CommentSchema);

export default model;