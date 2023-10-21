const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((n, {likes}) => n + likes, 0)
}

const favoriteBlog = (blogs) => {
  const {title, author, likes} = blogs.reduce((maxLikesBlog, currentBlog) => {
    return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog
  }, blogs[0])
  return {title, author, likes}
}

const mostBlogs = (blogs) => {
  let authorCounts = _.countBy(blogs, 'author')
  authorCounts = _.map(authorCounts, (blogs, author) => {
    return { author: author, blogs: blogs };
  })
  const authorWithMostBlogs = _.maxBy(authorCounts, author => author.blogs )
  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}