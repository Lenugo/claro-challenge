import { Spinner } from 'react-bootstrap';
import './styles.css'

function LoadingSpinner() {
  return (
    <Spinner animation="grow" role="status" variant='dark'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingSpinner;