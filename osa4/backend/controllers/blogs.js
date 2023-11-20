const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  const user = await User.findById("655777a1d928106a8adda0f3")

  const blog = new Blog(req.body)
  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true, context: "query" }
  )
  res.json(updatedBlog)
})

module.exports = blogsRouter