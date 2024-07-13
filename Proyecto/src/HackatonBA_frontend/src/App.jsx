import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Comments from './pages/Comments';
import History from './pages/History';
import logo from '../src/img/logoP.png';

// Importa las imágenes de los íconos de redes sociales
import facebookIcon from '../src/img/facebook.png';
import twitterIcon from '../src/img/twitter.png';
import instagramIcon from '../src/img/instagram.png';

function App() {
  return (
    <Router>
      <div>
        <Navbar variant="dark" expand="lg" style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#e3f2fd' }}>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="Logo"
              style={{ marginLeft: '10px', color:"dark"}}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/" className="text-dark" activeClassName="bg-dark">Home</Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-dark" activeClassName="bg-dark">Login</Nav.Link>
              <Nav.Link as={Link} to="/services" className="text-dark" activeClassName="bg-dark">Servicios</Nav.Link>
              <Nav.Link as={Link} to="/comments" className="text-dark" activeClassName="bg-dark">Comentarios</Nav.Link>
              <Nav.Link as={Link} to="/history" className="text-dark" activeClassName="bg-dark">Historial</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
        <br></br><br></br>
        <footer className="footer mt-auto py-3  text-dark" style={{backgroundColor: '#e3f2fd'}}>
          <div className="container text-center">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h5>Números de Contacto</h5>
                <p>Teléfono: +52 8342566492</p>
                <p>Email: contacto@hidroservicios.com</p>
              </div>
              <div className="col-sm-12 col-md-6">
                <h5>Redes Sociales</h5>
                <div>
                  <a href="https://facebook.com">
                    <img src={facebookIcon} alt="Facebook" style={{ width: '30px', marginRight: '10px' }} />
                  </a>
                  <a href="https://twitter.com">
                    <img src={twitterIcon} alt="Twitter" style={{ width: '30px', marginRight: '10px' }} />
                  </a>
                  <a href="https://instagram.com">
                    <img src={instagramIcon} alt="Instagram" style={{ width: '30px', marginRight: '10px' }} />
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <p>© 2024 Hidro Servicios. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
