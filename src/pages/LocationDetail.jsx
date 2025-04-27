import { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router';
import { get } from '../services/api';

export default function LocationDetail() {
  const { id } = useParams();
  const [loc, setLoc] = useState(null);

  useEffect(() => {
    get(`/location/${id}`).then(setLoc);
  }, [id]);

  if (!loc) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Link to="/locations">← Voltar</Link>
      <h2 className="mt-3">{loc.name}</h2>
      <p>
        <strong>Tipo:</strong> {loc.type || '—'}
      </p>
      <p>
        <strong>Dimensão:</strong> {loc.dimension || '—'}
      </p>

      <h5 className="mt-4">Residentes ({loc.residents.length})</h5>
      <ListGroup>
        {loc.residents.map((url) => {
          const charId = url.split('/').pop();
          return (
            <ListGroup.Item key={charId} as={Link} to={`/characters/${charId}`}>
              Personagem #{charId}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}
