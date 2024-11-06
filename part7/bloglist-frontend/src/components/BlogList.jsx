import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

const BlogList = ({ blogs }) => {
  const [sort, setSort] = useState('none')

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
      <FormControl fullWidth>
        <InputLabel id="sort-blogs-label">sort by</InputLabel>
        <Select
          labelId="sort-blogs-label"
          id="sort-blogs"
          value={sort}
          label="Sort by"
          onChange={handleSortChange}
        >
          <MenuItem value="default">default</MenuItem>
          <MenuItem value="likes">likes</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlogList
