import { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const [sort, setSort] = useState('none')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const sortBlogs = () => {
    switch (sort) {
      case 'likes':
        return [...blogs].sort((a, b) => b.likes - a.likes)
      default:
        return blogs
    }
  }

  const sortedBlogs = sortBlogs()

  const handleSortChange = (event) => {
    setSort(event.target.value)
  }

  return (
    <>
      <div>
        <label htmlFor="sort-blogs">sort by:</label>
        <select name="sort-blogs" onChange={handleSortChange}>
          <option value="default">default</option>
          <option value="likes">likes</option>
        </select>
      </div>
      {sortedBlogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </>
  )
}

export default BlogList
