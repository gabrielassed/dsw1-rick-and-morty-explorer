const BASE = 'https://rickandmortyapi.com/api';

export async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    if (res.headers.get('content-type').includes('application/json')) {
      const error = await res.json();
      throw new Error(`Erro ${res.status}: ${error.error}`);
    }
    throw new Error(`Erro ${res.status}`);
  }
  return res.json();
}
