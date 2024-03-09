import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export type BookItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export type BookList = BookItem[]

export type BookState = {
  books: BookList;
  status: 'idle' | 'loading';
  error: string | null | undefined;
}

export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async () => {
    const res = await fetch('/api/books')
    const data = await res.json()
    return data
  }
)

export const createBook = createAsyncThunk(
  'book/createBook',
  async (book: BookItem) => {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    const data = await res.json()
    return data
  }
)

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (id: number) => {
    await fetch(`/api/books/${id}`, {
      method: 'DELETE'
    })
    return id
  }
)

export const initialState: BookState = {
  books: [],
  status: 'idle',
  error: null
}

const bookSlice = createSlice({
  name: 'bookList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch books reducers
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = 'idle';
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    });

    // Create book reducer
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.books = action.payload;
    });

    // Delete book reducer
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    });
  }
})

export const {} = bookSlice.actions

export default bookSlice.reducer