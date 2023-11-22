/* eslint-disable no-unused-vars */

const _ = require("lodash")

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

  const groupedByAuthor = _.groupBy(blogs, "author")
  const mostBlogs = _.orderBy(groupedByAuthor, (group => group.length), ["desc"])[0]

  return {
    "author": mostBlogs[0].author,
    "blogs": mostBlogs.length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const reducer = (group) => _.reduce(group, (sum, blog) => sum + blog.likes, 0)

  const groupedByAuthor = _.groupBy(blogs, "author")
  const summedLikes = _.mapValues(groupedByAuthor, reducer)
  const mostLikes = _.orderBy(_.toPairs(summedLikes), 1, ["desc"])[0]

  return {
    "author": mostLikes[0],
    "likes": mostLikes[1]
  }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }