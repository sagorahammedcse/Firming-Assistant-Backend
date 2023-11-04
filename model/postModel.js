const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Post title Required"],
        trim: true,
    },
    metaDescription: {
        type: String,
        required: [true, "Meta Description required"],

    },
    description: {
        type: String,
        required: [true, "Description required"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },

        }
    ],
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },


});


module.exports = mongoose.model("Post", postSchema);