const Comments = ({ comments }) => {
  if (comments.length === 0)
    return (
      <>
        <h3>Comments</h3>
        <p>No comment found</p>
      </>
    )

  return (
    <>
      <h3>Comments</h3>
      <ul>
        {comments.map((c) => (
          <li key={Math.random()}>{c}</li>
        ))}
      </ul>
    </>
  )
}

export default Comments
