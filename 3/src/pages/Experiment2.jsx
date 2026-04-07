import React, { useState, useEffect } from 'react';
import './Experiment2.css';
import '../App.css';
import DisplayBooks from '../components/DisplayBooks.jsx';

function Experiment2() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = () => {
    if (!title.trim() || !author.trim()) return;
    const newBook = { title, author };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
  };

  return (
    <>
      <h1 className="project-title">Library Management System</h1>
      <div className="card">
        <form className="functions" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search field"
            placeholder="Search for books..."
          />
          <input
            type="text"
            placeholder="Book Title"
            className="field book-add"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            className="field book-add"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input type="button" value="Add Book" onClick={addBook} />
        </form>

        <ul>
            {books.map((book, index) => (
            <li key={index}>
                {book.title} by {book.author}
                <button type="button" onClick={() => {delete books[index];}}>
                    Remove
                </button>
            </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Experiment2;