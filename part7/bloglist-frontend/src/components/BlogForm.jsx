import useInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Box, Button, TextField } from '@mui/material'

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
      <h2>Add New Blog</h2>
      <form onSubmit={addBlog}>
        <TextField fullWidth variant="outlined" label="title" {...title} />
        <TextField fullWidth variant="outlined" label="author" {...author} />
        <TextField fullWidth variant="outlined" label="url" {...url} />
        <Button type="submit" variant="contained" color="primary">
          create
        </Button>
        <Button onClick={toggleVisibility}>cancel</Button>
      </form>
    </>
  )
}

export default BlogForm
