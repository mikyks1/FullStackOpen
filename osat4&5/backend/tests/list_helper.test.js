const listHelper = require("../utils/list_helper")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("of an empty list is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("of a list with a single blog equals the likes of that blog", () => {
    const blog = blogs.filter(blog => blog.title === "React patterns")
    expect(listHelper.totalLikes(blog)).toBe(7)
  })

  test("of a larger list is calculated correctly", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe("Most liked blog", () => {
  test("of an empty list is undefined", () => {
    expect(listHelper.favouriteBlog([])).toBeUndefined()
  })

  test("of a list with a single blog equals that blog", () => {
    const blog = blogs.filter(blog => blog.title === "TDD harms architecture")
    expect(listHelper.favouriteBlog(blog)).toEqual(blogs[4])
  })

  test("of a larger list is found correctly", () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe("Most blogs", () => {
  test("of an empty list is undefined", () => {
    expect(listHelper.mostBlogs([])).toBeUndefined()
  })

  test("of a list with a single blog/author equals that author", () => {
    expect(listHelper.mostBlogs([blogs[0]]))
      .toEqual({
        "author": "Michael Chan",
        "blogs": 1
      })
  })

  test("of a larger list is found correctly", () => {
    expect(listHelper.mostBlogs(blogs))
      .toEqual({
        "author": "Robert C. Martin",
        "blogs": 3
      })
  })
})

describe("Most liked author", () => {
  test("of an empty list is undefined", () => {
    expect(listHelper.mostLikes([])).toBeUndefined()
  })

  test("of a list with a single blog/author equals that author", () => {
    expect(listHelper.mostLikes([blogs[5]])).toEqual({
      "author": "Robert C. Martin",
      "likes": 2
    })
  })

  test("of a larger list is calculated correctly", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      "author": "Edsger W. Dijkstra",
      "likes": 17
    })
  })
})