const express = require("express");
const {
    createPost,
    getAllPost,
    getPostDetails,
    updatePost,
    deletePost
} = require("../controllers/postController");

const router = express.Router();

// create post by admin
router.route("/admin/post/new").post(createPost);

// get all post 
router.route("/posts").get(getAllPost);
// get post details 
router.route("/post/:id").get(getPostDetails);
// update and delete post by admin 
router.route("/admin/post/:id").put(updatePost).delete(deletePost);

module.exports = router;