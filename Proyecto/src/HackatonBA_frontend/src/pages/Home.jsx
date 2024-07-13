import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const openNav = () => {
    setSidePanelOpen(true);
  };

  const closeNav = () => {
    setSidePanelOpen(false);
  };

  return (
    <div className="App">
    
      <section className="banner_main">
        <Container>
          <Row>
            <Col>
              {/* Contenido del banner aquí */}
              <h1>Bienvenido a nuestra página principal</h1>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Scripts */}
      {/* No es necesario incluir scripts como en un sitio web tradicional. React maneja la carga de scripts de forma diferente */}
    </div>
  );
}

export default Home;

