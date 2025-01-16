const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// INDEX: Show all posts
router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", { posts });
});

// NEW: Show form to create new post
router.get("/new", (req, res) => {
  res.render("new");
});
//comment for dev branch 

// CREATE: Add new post to database
router.post("/", async (req, res) => {
  await Post.create(req.body.post);
  res.redirect("/posts");
});

// SHOW: Show details of one post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("show", { post });
});

// EDIT: Show edit form for one post
router.get("/:id/edit", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post });
});

// UPDATE: Update a particular post
router.put("/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body.post);
  res.redirect(`/posts/${req.params.id}`);
});


// DELETE: Delete a particular post
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
});


module.exports = router;
