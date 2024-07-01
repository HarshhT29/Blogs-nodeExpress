const { Schema, model} = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    coverImage: {
        type: String,
        default: "/images/cover-images/defaultCoverImage.png"
    }
}, { timestamps: true });

const BLOG = model("blogs", blogSchema);

module.exports = BLOG;