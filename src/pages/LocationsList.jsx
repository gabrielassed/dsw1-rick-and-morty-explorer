import { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router';
import { get } from '../services/api';

export default function LocationsList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');

  useEffect(() => {
    setLoading(true);
    get(`/location?page=${page}`)
      .then(setData)
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Locais</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Dimensão</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((loc) => (
            <tr key={loc.id}>
              <td>{loc.id}</td>
              <td>
                <Link to={`/locations/${loc.id}`}>{loc.name}</Link>
              </td>
              <td>{loc.type}</td>
              <td>{loc.dimension}</td>
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
