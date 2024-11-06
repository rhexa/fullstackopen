import { useRef } from 'react'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import BlogList from '../components/BlogList'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <BlogList blogs={blogs} />
    </div>
  )
}

export default Blogs
