import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap"
import './styles.css'
import BookCard from '../../components/Card'
import BookModal from '../../components/BookModal'
import LoadingSpinner from '../../components/Spinner'

const BookList = () => {
  const [booksList, setBooksList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentBook] = useState(null);

  const baseUrl = import.meta.env.VITE_API_KEY;

  const getBooks = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${baseUrl}/Books`)
      if (response.ok) {
        const data = await response.json()
        setBooksList(data)
      } else {
        alert('Error al obtener los libros')
      }
    } catch (error) {
      alert('Error al cargar los libros')
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdateBooks = () => {
    getBooks()
  }

  const handleDeleteBook = () => {
    getBooks()
  }

  const toggleShowAddModal = () => setShowAddModal(!showAddModal)

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <Container className="py-5">
      <h1 className="mb-5 text-center text-light-emphasis">Listado de Libros</h1>
      <div className='w-100'>
        <Button type='button' variant='light' className='my-2 mx-auto d-block' onClick={() => toggleShowAddModal()}>Agregar un libro</Button>
      </div>
      {!isLoading && booksList.length <= 0 && <p className="font-monospace py-5 text-center">No hay libros para mostrar</p>}
      {isLoading ?
        <div className='text-center'>
          <LoadingSpinner />
        </div> :
        <Row>
          {booksList.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <BookCard bookData={book} onDelete={handleDeleteBook} onUpdate={handleUpdateBooks} />
            </Col>
          ))}
        </Row>
      }
      <BookModal
        show={showAddModal}
        setShow={setShowAddModal}
        onUpdate={handleUpdateBooks}
        modalType={currentBook ? 'edit' : 'add'}
        title="Agregar un Libro"
      />
    </Container>
  )
}

export default BookList