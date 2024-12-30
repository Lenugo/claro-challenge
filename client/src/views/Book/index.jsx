import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookCard from '../../components/Card'
import LoadingSpinner from '../../components/Spinner'

const Book = () => {
  const params = useParams()

  const [book, setBook] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const url = import.meta.env.VITE_API_KEY;

  const getBook = async () => {
    setIsLoading(true)
    const response = await fetch(`${url}/${params.id}`)

    if (response.ok) {
      const data = await response.json()
      setBook(data)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBook()
  }, [])

  return (
    <div>
      {isLoading ? <LoadingSpinner /> :
        <BookCard bookData={book} />
      }
    </div>
  )
}

export default Book