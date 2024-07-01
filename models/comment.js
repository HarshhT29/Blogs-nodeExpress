const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blogs"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

const COMMENT = model("comments", commentSchema);

module.exports = COMMENT;