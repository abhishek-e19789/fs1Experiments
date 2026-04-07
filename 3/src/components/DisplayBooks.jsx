import React from 'react'

function DisplayBooks(books) {
  return (
    <div>
      <h2>Books in Library</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title} by {book.author} <button type="button" onClick={() => books.splice(index, 1)}>Remove</button></li>
        ))}
      </ul>
    </div>
  )
}

export default DisplayBooks