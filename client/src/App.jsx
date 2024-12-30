import BookList from './views/BookList'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <section className='bg-primary-subtle' style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route index path="*" element={<Navigate to="/books" replace />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
