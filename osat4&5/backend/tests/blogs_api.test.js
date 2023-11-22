const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "655dd8426ec53d3ed3bd791f"
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "655dd8426ec53d3ed3bd791f"
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "655dd8426ec53d3ed3bd791f"
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "655dd8426ec53d3ed3bd791f"
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "655dd8426ec53d3ed3bd791f"
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: "655dd8426ec53d3ed3bd791f"
  }
]

const initialUser = new User({
  _id: "655dd8426ec53d3ed3bd791f",
  username: "testi",
  name: "testi",
  passwordHash: "$2b$10$S0y3hF6WGeaKiveUFuBO1.AWfoxTB4sHlFF/5BRY0js00YJpvaRMm"
})
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpIiwiaWQiOiI2NTVkZDg0MjZlYzUzZDNlZDNiZDc5MWYiLCJpYXQiOjE3MDA2NDkwNzh9.ae3ng7lWMDBMcgVBmNIipF3JRTDZUqGYNNKEWAVYmdE"

beforeAll(async () => {
  await initialUser.save()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe("Get tests", () => {
  test("Blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("All blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test("Blogs have an id property", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0].id).toBeDefined()
  })
})

describe("Post tests", () => {
  test("Blog is added correctly", async () => {
    const newBlog = {
      title: "Mun blogi",
      author: "Erkki Esimerkki",
      url: "url",
      likes: 0
    }

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: token })
      .expect(201)
      .expect("Content-Type", /application\/json/)

    delete response.body.id
    delete response.body.user
    expect(response.body).toEqual(newBlog)

    const blogs = await Blog.find({})
    expect(blogs).toHaveLength(initialBlogs.length + 1)
  })

  test("If likes property is not given, it defaults to 0", async () => {
    const newBlog = {
      title: "Mun blogi",
      author: "Erkki Esimerkki",
      url: "url"
    }

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: token })
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toEqual(0)
  })

  test("Title and url properties are required", async () => {
    const noTitle = {
      author: "Erkki Esimerkki",
      url: "url",
      likes: 0
    }

    const noUrl = {
      title: "Mun blogi",
      author: "Erkki Esimerkki",
      likes: 0
    }

    const noTitleOrUrl = {
      author: "Erkki Esimerkki",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .send(noTitle)
      .set({ Authorization: token })
      .expect(400)

    await api
      .post("/api/blogs")
      .send(noUrl)
      .set({ Authorization: token })
      .expect(400)

    await api
      .post("/api/blogs")
      .send(noTitleOrUrl)
      .set({ Authorization: token })
      .expect(400)
  })

  test("If blog is added without a token, 401 is returned", async () => {
    const blog = {
      author: "Erkki Esimerkki",
      url: "url",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(401)
  })
})

describe("Delete tests", () => {
  test("A specific blog can be deleted", async () => {
    let blogs = await Blog.find({})

    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set({ Authorization: token })
      .expect(204)

    blogs = await Blog.find({})
    expect(blogs).toHaveLength(initialBlogs.length - 1)
  })
})

describe("Put tests", () => {
  test("amount of likes is updated", async () => {
    const newBlog = {
      title: "Mun blogi",
      author: "Erkki Esimerkki",
      url: "url",
      likes: 0
    }
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: token })

    const updatedBlog = await api
      .put(`/api/blogs/${response.body.id}`)
      .send({ likes: 4 })
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(updatedBlog.body.likes).toEqual(4)
  })

  test("updating nonexistent id returns 404", async () => {
    await api
      .put("/api/blogs/0")
      .send({ likes: 1 })
      .expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})