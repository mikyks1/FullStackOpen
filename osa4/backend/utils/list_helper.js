/* eslint-disable no-unused-vars */

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

module.exports = { dummy, totalLikes, favouriteBlog }