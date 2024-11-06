const User = ({ userBlogs }) => {
  if (!userBlogs) return null
  const { name, blogs } = userBlogs

  return (
    <>
      <h2>{name}</h2>

      <h3>added blogs</h3>

      <ul>
        {blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
