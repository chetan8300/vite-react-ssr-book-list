import { useState, useEffect } from 'react'
import { fetchBooks, deleteBook } from './store/bookSlice'
import { useRootDispatch, useRootSelector } from './store/hooks'
import CreateModal from './CreateModal';

import './App.css'

function App() {
  const dispatch = useRootDispatch()
  const books = useRootSelector((state) => state.book)
  const [create, setCreate] = useState(false)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  return (
    <div className="App">
      {books.status === 'loading' && <div>Loading...</div>}

      <div className="bookHeader">
        <h2 className="bookTitle">Books</h2>
        <button onClick={() => setCreate(true)}>Create</button>
      </div>
      <div className="bookListBox">
        {books.books.map((book) => (
          <div className="bookItemCard" key={book.id}>
            <h3>Name: {book.name}</h3>
            <p>Price: {book.price}</p>
            <p>Category: {book.category}</p>
            <p>Description: {book.description}</p>
            <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
          </div>
        ))}
      </div>

      <CreateModal
        isOpen={create}
        onClose={() => setCreate(false)}
        nextId={books.books.length + 1}
      />
    </div>
  )
}

export default App
