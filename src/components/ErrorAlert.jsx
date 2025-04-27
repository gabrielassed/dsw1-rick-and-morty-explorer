import { Alert } from 'react-bootstrap';
import { useError } from '../context/ErrorContext';

export default function ErrorAlert() {
  const { message, dismiss } = useError();
  if (!message) return null;

  return (
    <Alert
      variant="danger"
      dismissible
      onClose={dismiss}
      className="m-2 text-center"
    >
      {message}
    </Alert>
  );
}
