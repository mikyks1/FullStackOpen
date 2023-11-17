const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body
  const error = new Error()
  error.name = "ValidationError"
  error.message = "User validation failed: "

  if (!password) {
    error.message += "Password is required"
    throw error
  } else if (password.length < 3) {
    error.message += "Password is shorter than the minimum allowed length (3)"
    throw error
  }

  const usernameInDB = await User.find({ username: username })
  if (usernameInDB.length) {
    error.message += "Username must be unique"
    throw error
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter