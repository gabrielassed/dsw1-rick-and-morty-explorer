import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router';
import CharacterDetail from './pages/CharacterDetail.jsx';
import CharactersList from './pages/CharactersList.jsx';
import Home from './pages/Home.jsx';

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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'characters', element: <CharactersList /> },
      { path: 'characters/:id', element: <CharacterDetail /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
