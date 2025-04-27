import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router';

export default function Home() {
  return (
    <Container className="text-center mt-5">
      <h1>Rick and Morty Explorer</h1>
      <p className="lead">
        Descubra personagens, episódios e muito mais.
        <br />
        Baseado na <a href="https://rickandmortyapi.com/">Rick and Morty API</a>
      </p>
      <Link to="/characters">
        <Button size="lg">Começar</Button>
      </Link>
    </Container>
  );
}
