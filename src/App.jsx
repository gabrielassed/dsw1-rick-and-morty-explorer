import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router';
import ErrorAlert from './components/ErrorAlert.jsx';
import CharacterDetail from './pages/CharacterDetail.jsx';
import CharactersList from './pages/CharactersList.jsx';
import EpisodeDetail from './pages/EpisodeDetail.jsx';
import EpisodesList from './pages/EpisodesList.jsx';
import Home from './pages/Home.jsx';
import LocationDetail from './pages/LocationDetail.jsx';
import LocationsList from './pages/LocationsList.jsx';
import NotFound from './pages/NotFound.jsx';

function RootLayout() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/">
            R&M Explorer
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/characters">
                Personagens
              </Nav.Link>
              <Nav.Link as={Link} to="/episodes">
                Episódios
              </Nav.Link>
              <Nav.Link as={Link} to="/locations">
                Locais
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ErrorAlert />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },

        { path: 'characters', element: <CharactersList /> },
        { path: 'characters/:id', element: <CharacterDetail /> },

        { path: 'episodes', element: <EpisodesList /> },
        { path: 'episodes/:id', element: <EpisodeDetail /> },

        { path: 'locations', element: <LocationsList /> },
        { path: 'locations/:id', element: <LocationDetail /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
