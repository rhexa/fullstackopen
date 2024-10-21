import { useRef, useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, handleLike }) => {
  const blogRef = useRef()
  const [detailVisible, setDetailVisible] = useState(false)

  const toggleDetailVisibility = () => {
    setDetailVisible(!detailVisible)
    blogRef.current.toggleVisibility()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => toggleDetailVisibility()}>{detailVisible ? "hide" : "view"}</button>
      </div>
      <Togglable buttonLabel="view" type="2" ref={blogRef}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={(e) => handleLike(e, blog)}>like</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog