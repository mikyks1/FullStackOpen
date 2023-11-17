const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

const initialUsers = [
  {
    username: "testi",
    name: "testi",
    password: "salasana"
  },
  {
    username: "testi2",
    name: "testi2",
    password: "salasana"
  },
  {
    username: "Erkki",
    name: "Erkki Esimerkki",
    password: "123456789"
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe("Post tests", () => {
  test("User is created correctly", async () => {
    const newUser = {
      username: "newUser",
      name: "newUser",
      password: "salasana"
    }

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(response.body.username).toEqual(newUser.username)
    expect(response.body.name).toEqual(newUser.name)

    const users = await User.find({})
    expect(users).toHaveLength(initialUsers.length + 1)
  })

  test("Min username length is 3", async () => {
    const newUser = {
      username: "ab",
      name: "newUser",
      password: "abc"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    newUser.username += "c"

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
  })

  test("Min password length is 3", async () => {
    const newUser = {
      username: "abc",
      name: "newUser",
      password: "ab"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    newUser.password += "c"

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
  })

  test("Username and password are required", async () => {
    const noUsername = {
      name: "newUser",
      password: "abc"
    }

    const noPassword = {
      username: "ab",
      name: "newUser"
    }

    await api
      .post("/api/blogs")
      .send(noUsername)
      .expect(400)

    await api
      .post("/api/blogs")
      .send(noPassword)
      .expect(400)

  })

  test("Nonunique username returns 400", async () => {
    await api
      .post("/api/users")
      .send(initialUsers[0])
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})