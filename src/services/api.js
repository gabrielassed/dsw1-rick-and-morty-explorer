const BASE = 'https://rickandmortyapi.com/api';

export async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }
  return res.json();
}
