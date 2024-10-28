const blogForm = ({
  handleSubmit,
  handleNewBlogChange,
  newBlog
}) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => handleNewBlogChange(newBlog,{ type: 'changed_title', value: target.value })}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => handleNewBlogChange(newBlog, { type: 'changed_author', value: target.value })}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => handleNewBlogChange(newBlog, { type: 'changed_url', value: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default blogForm