import { useState } from 'react'
import useInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setSuccessNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggleVisibility }) => {
  const { reset: titleReset, ...title } = useInput('text')
  const { reset: authorReset, ...author } = useInput('text')
  const { reset: urlReset, ...url } = useInput('text')
  const dispatch = useDispatch()

  const reset = () => {
    titleReset()
    authorReset()
    urlReset()
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    }

    dispatch(createBlog(newBlog))
    reset()
    toggleVisibility()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
