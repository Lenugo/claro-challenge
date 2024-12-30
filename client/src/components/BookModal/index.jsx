import { Button, Modal, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

function BookModal(props) {
  const EMPTY_VALUES = { id: 0, title: '', description: '', excerpt: '', publishDate: '', pageCount: 0 }
  const baseUrl = import.meta.env.VITE_API_KEY;

  const [values, setValues] = useState(EMPTY_VALUES)

  const fetchBookData = async (bookId) => {
    try {
      const response = await fetch(`${baseUrl}/books/${bookId}`);
      if (response.ok) {
        const book = await response.json()
        const formattedPublishDate = book.publishDate?.split('T')[0]
        setValues({ ...book, publishDate: formattedPublishDate })
      } else {
        console.error('Error obteniendo los datos')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    if (props.modalType === 'edit' && props.id) {
      fetchBookData(props.id);
    }
  }, [props.modalType, props.id]);


  const handleClose = () => {
    props.setShow(false)
    setValues(EMPTY_VALUES)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'publishDate') {
      const formattedDate = value ? value : ''
      setValues((prevValues) => ({
        ...prevValues,
        [name]: formattedDate,
      }));
    } else {
      const newValue = name === 'pageCount' ? parseInt(value) : value
      setValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }))
    }
  }

  const formatDateToISO = (dateString) => {
    const date = new Date(dateString)
    const isoString = date.toISOString()

    return isoString
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_KEY}/Books`
    let response;
    const bookData = { ...values, id: props.id ? parseInt(props.id) : 0, publishDate: formatDateToISO(values.publishDate) }

    if (props.modalType === 'add') {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      })

    } else if (props.modalType === 'edit') {
      response = await fetch(`${url}/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      })
    }

    if (response.ok) {
      alert(props.modalType === 'add' ? 'Libro agregado con éxito' : 'Libro actualizado con éxito');
      props.onUpdate()
      handleClose()
    } else {
      alert('Hubo un error al guardar el libro');
    }
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-1'>
          {props.modalType !== 'view' ?
            <Form>
              <Form.Group className="mb-3" controlId="bookModalForm.ControlTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escribe el título"
                  autoFocus
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bookModalForm.ControlRelease">
                <Form.Label>Fecha de lanzamiento</Form.Label>
                <Form.Control type="date" name='publishDate' value={values.publishDate || ''} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bookModalForm.ControlPages">
                <Form.Label>Total de páginas</Form.Label>
                <Form.Control type="number" name='pageCount' value={values.pageCount || 0} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bookModalForm.ControlDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={2} name='description' value={values.description} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bookModalForm.ControlExtract">
                <Form.Label>Extracto</Form.Label>
                <Form.Control as="textarea" rows={2} name='excerpt' value={values.excerpt} onChange={handleChange} />
              </Form.Group>
            </Form> :
            <div>
              <p>{props?.description}</p>
              <p>{props?.excerpt}</p>
              <div className='d-flex justify-content-between fw-lighter'>
                <p>Total de páginas: {props?.pageCount}</p>
                <p className='text-dark-emphasis fst-italic'>Publicado: {new Date(props?.publishDate).toLocaleDateString()}</p>
              </div>
            </div>
          }

        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="secondary" onChange={handleClose} onClick={handleClose}>
            Cerrar
          </Button>
          {props.modalType !== 'view' && <Button type='submit' variant="primary" onClick={handleSubmit}>{props.modalType === 'add' ? 'Agregar' : 'Editar'}</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookModal

BookModal.propTypes = {
  id: PropTypes.number,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  excerpt: PropTypes.string,
  publishDate: PropTypes.string,
  pageCount: PropTypes.number,
  modalType: PropTypes.object || PropTypes.string,
  onUpdate: PropTypes.func
}