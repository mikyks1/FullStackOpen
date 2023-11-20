const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(req.body)
  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(204).end()
  }
  else if (decodedToken.id !== blog.user.toString()) {
    return res.status(401).json({ error: "Unauthorized access" })
  }

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