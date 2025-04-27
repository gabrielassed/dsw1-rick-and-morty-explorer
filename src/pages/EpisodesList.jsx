import { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router';
import { useError } from '../context/ErrorContext';
import { get } from '../services/api';

export default function EpisodesList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { showError } = useError();

  const page = Number(searchParams.get('page') || '1');

  useEffect(() => {
    setLoading(true);
    get(`/episode?page=${page}`)
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
      <h2>Episódios</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data de exibição</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((ep) => (
            <tr key={ep.id}>
              <td>{ep.id}</td>
              <td>
                <Link to={`/episodes/${ep.id}`}>{ep.name}</Link>
              </td>
              <td>{ep.air_date}</td>
              <td>{ep.episode}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between my-3">
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
