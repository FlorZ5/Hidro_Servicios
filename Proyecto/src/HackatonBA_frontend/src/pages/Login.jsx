import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as registerIdlFactory } from 'declarations/register';

const MySwal = withReactContent(Swal);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
      } else {
        try {
          await authClient.login({
            identityProvider: 'http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943',
            onSuccess: () => {
              handleAuthenticated(authClient);
            },
          });
        } catch (error) {
          setError('Error al iniciar sesión');
        }
      }
    };

    initAuth();
  }, []);

  const handleAuthenticated = async (authClient) => {
    const identity = await authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const actor = Actor.createActor(registerIdlFactory, {
      agent,
      canisterId: process.env.CANISTER_ID_REGISTER,
    });
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
    navigate('/'); // Redireccionar a la página principal después del logout
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: 'http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943',
        onSuccess: () => {
          handleAuthenticated(authClient);
        },
      });
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Inicio de Sesión</h1>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usuario o Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
    <center>
        <Button variant="success" type="submit">
          Iniciar Sesión
        </Button>
        </center>
      </Form>
    </Container>
  );
}

export default Login;

