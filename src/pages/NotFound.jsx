import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <Container className="text-center mt-5">
      <h2>404 - Página não encontrada</h2>
      <p>Ops! Esse endereço não existe.</p>
      <Link to="/">
        <Button>Voltar para a Home</Button>
      </Link>
    </Container>
  );
}
