import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import './styles.css'
import BookModal from '../BookModal'
import { Trash3, PencilSquare } from 'react-bootstrap-icons'
import PropTypes from 'prop-types'

const BookCard = ({ bookData, onDelete, onUpdate }) => {

  const MODAL_TYPES = { ADD: 'add', EDIT: 'edit', VIEW: 'view' }
  const [show, setShow] = useState(false)
  const [modalType, setModalType] = useState(MODAL_TYPES)

  const onToggleModal = () => setShow(!show)

  const onShowViewModal = () => {
    setModalType(MODAL_TYPES.VIEW)
    onToggleModal()
  }

  const onShowEditModal = () => {
    setModalType(MODAL_TYPES.EDIT)
    onToggleModal()
  }

  const handleUpdate = () => {
    onUpdate()
  }

  const deleteBook = async (book) => {
    if (window.confirm(`¿Estás seguro de eliminar el libro: ${book.title}?`)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/books/${book.id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          alert('Libro eliminado con éxito')
          onDelete()
        } else {
          throw new Error('Error al eliminar el libro')
        }
      } catch (error) {
        alert('Hubo un error al eliminar el libro')
        console.error('Error:', error)
      }
    }
  }

  return (
    <>
      <Card className="h-100" border='light'>
        <Card.Body>

          <Card.Title className='fs-3 text-primary-emphasis mb-3'>{bookData?.title}</Card.Title>
          <Card.Text>
            {bookData?.description}
          </Card.Text>

          <Card.Text className='mt-5 d-flex justify-content-between align-items-center'>
            <Button variant="primary" className='text-light' onClick={() => onShowViewModal()}>Leer Más</Button>
            <div className='d-flex' style={{ gap: '12px' }}>
              <PencilSquare color='green' size={24} role='button' onClick={() => onShowEditModal(bookData)} />
              <Trash3 color='red' size={24} role='button' onClick={() => deleteBook(bookData)} />
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <BookModal show={show} setShow={setShow} modalType={modalType} onUpdate={handleUpdate} {...bookData} />
    </>
  )
}

export default BookCard

BookCard.propTypes = {
  bookData: PropTypes.object,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func
}
