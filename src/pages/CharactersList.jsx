import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router';
import { useError } from '../context/ErrorContext';
import { get } from '../services/api';

export default function CharactersList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { showError } = useError();

  const page = Number(searchParams.get('page') || '1');

  useEffect(() => {
    setLoading(true);
    get(`/character?page=${page}`)
      .then(setData)
      .catch((err) => showError(err.message))
      .finally(() => setLoading(false));
  }, [page, showError]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Personagens</h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {data.results.map((char) => (
          <Col key={char.id}>
            <Card>
              <Card.Img variant="top" src={char.image} />
              <Card.Body>
                <Card.Title>{char.name}</Card.Title>
                <Link
                  to={`/characters/${char.id}`}
                  className="stretched-link"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between my-4">
        <Button
          disabled={!data.info.prev}
          onClick={() => setSearchParams({ page: page - 1 })}
        >
          ← Anterior
        </Button>
        <span>Página {page}</span>
        <Button
          disabled={!data.info.next}
          onClick={() => setSearchParams({ page: page + 1 })}
        >
          Próxima →
        </Button>
      </div>
    </Container>
  );
}
