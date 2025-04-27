import { useEffect, useState } from 'react';
import { Badge, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router';
import { get } from '../services/api';

export default function CharacterDetail() {
  const { id } = useParams();
  const [char, setChar] = useState(null);

  useEffect(() => {
    get(`/character/${id}`).then(setChar);
  }, [id]);

  if (!char) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Link to="/characters">← Voltar</Link>
      <Row className="mt-3">
        <Col md={4}>
          <img src={char.image} alt={char.name} className="img-fluid rounded" />
        </Col>
        <Col md={8}>
          <h2>{char.name}</h2>
          <p>
            Status:{' '}
            <Badge bg={char.status === 'Alive' ? 'success' : 'secondary'}>
              {char.status}
            </Badge>
          </p>
          <p>Espécie: {char.species}</p>
          <p>Origem: {char.origin.name}</p>
          <p>Local atual: {char.location.name}</p>
          <p>Episódios: {char.episode.length}</p>
        </Col>
      </Row>
    </Container>
  );
}
