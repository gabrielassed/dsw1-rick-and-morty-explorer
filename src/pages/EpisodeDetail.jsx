import { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router';
import { useError } from '../context/ErrorContext';
import { get } from '../services/api';

export default function EpisodeDetail() {
  const { id } = useParams();
  const [ep, setEp] = useState(null);
  const { showError } = useError();

  useEffect(() => {
    get(`/episode/${id}`)
      .catch((err) => showError(err.message))
      .then(setEp);
  }, [id, showError]);

  if (!ep) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Link to="/episodes">← Voltar</Link>
      <h2 className="mt-3">{ep.name}</h2>
      <p>
        <strong>Código:</strong> {ep.episode}
      </p>
      <p>
        <strong>Data de exibição:</strong> {ep.air_date}
      </p>

      <h5 className="mt-4">
        Personagens neste episódio ({ep.characters.length})
      </h5>
      <ListGroup>
        {ep.characters.map((url) => {
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
