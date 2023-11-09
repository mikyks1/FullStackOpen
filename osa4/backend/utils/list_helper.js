/* eslint-disable no-unused-vars */

const lodash = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  let favourite = blogs[0]

  for (const blog of blogs.slice(1)) {
    if (blog.likes > favourite.likes) {
      favourite = blog
    }
  }
  return favourite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const groupedByAuthor = lodash.groupBy(blogs, "author")
  const mostBlogs = lodash.orderBy(groupedByAuthor, (group => group.length), ["desc"])[0]

  return {
    "author": mostBlogs[0].author,
    "blogs": mostBlogs.length
  }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs }