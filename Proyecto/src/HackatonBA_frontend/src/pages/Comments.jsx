import React, { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { register } from 'declarations/register';
import AuthenticatedRoute from './AuthenticatedRoute';

function Comments() {
  const [form, setForm] = useState({
    pregunta1: '1',
    pregunta2: '1',
    pregunta3: '1',
    pregunta4: '1',
    pregunta5: '1',
    pregunta6: '1',
    pregunta7: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error message when input changes
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = 'Este campo es requerido';
      }
    });

    const pregunta7Regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 0-9]{5,200}$/;
    if (!pregunta7Regex.test(form.pregunta7)) {
      newErrors.pregunta7 = 'El comentario debe tener entre 5 y 200 caracteres alfanuméricos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await register.crearComentario(
          Number(form.pregunta1),
          Number(form.pregunta2),
          Number(form.pregunta3),
          Number(form.pregunta4),
          Number(form.pregunta5),
          Number(form.pregunta6),
          form.pregunta7
        );
        showSuccessAlert();
      } catch (error) {
        console.error('Error al registrar el comentario:', error);
        showErrorAlert('Error', 'Hubo un problema al registrar el comentario. Por favor, intenta nuevamente.');
      }
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Comentario registrado!',
      text: 'El comentario ha sido registrado correctamente.',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/comments');
    });
  };

  const showErrorAlert = (title, text) => {
    Swal.fire({
      icon: 'error',
      title,
      text,
    });
  };

  return (
    <AuthenticatedRoute>
      <Container className="mt-5">
        <h1>Permitanos conocer su opinión completando el siguiente formulario y así poder mejorar el servicio.</h1>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="pregunta1">
            <Form.Label>1. Indique el nivel de satisfacción del servicio</Form.Label>
            <Form.Control as="select" name="pregunta1" value={form.pregunta1} onChange={handleChange} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            {errors.pregunta1 && <Form.Text className="text-danger">{errors.pregunta1}</Form.Text>}
          </Form.Group>
          <br></br>
          <Form.Group controlId="pregunta2">
            <Form.Label>2. Indique el nivel de satisfacción de la entrega</Form.Label>
            <Form.Control as="select" name="pregunta2" value={form.pregunta2} onChange={handleChange} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            {errors.pregunta2 && <Form.Text className="text-danger">{errors.pregunta2}</Form.Text>}
          </Form.Group>
          <br></br>
          <Form.Group controlId="pregunta3">
            <Form.Label>3. ¿Cómo considera el tiempo de la entrega?</Form.Label>
            <Form.Control as="select" name="pregunta3" value={form.pregunta3} onChange={handleChange} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            {errors.pregunta3 && <Form.Text className="text-danger">{errors.pregunta3}</Form.Text>}
          </Form.Group>
        <br></br>
          <Form.Group controlId="pregunta4">
            <Form.Label>4. ¿Cómo considera el costo del servicio?</Form.Label>
            <Form.Control as="select" name="pregunta4" value={form.pregunta4} onChange={handleChange} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Control>
            {errors.pregunta4 && <Form.Text className="text-danger">{errors.pregunta4}</Form.Text>}
          </Form.Group>
        <br></br>
          <Form.Group controlId="pregunta5">
            <Form.Label>5. ¿Cómo considera la calidad del agua?</Form.Label>
            <Form.Control as="select" name="pregunta5" value={form.pregunta5} onChange={handleChange} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            {errors.pregunta5 && <Form.Text className="text-danger">{errors.pregunta5}</Form.Text>}
          </Form.Group>
          <br></br>
          <Form.Group controlId="pregunta6">
            <Form.Label>6. De forma general, ¿Cómo evalúa el servicio?</Form.Label>
            <Form.Control as="select" name="pregunta6" value={form.pregunta6} onChange={handleChange} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            {errors.pregunta6 && <Form.Text className="text-danger">{errors.pregunta6}</Form.Text>}
          </Form.Group>
          <br></br>
          <Form.Group controlId="pregunta7">
            <Form.Label>7. Comentarios adicionales</Form.Label>
            <Form.Control as="textarea" rows={3} name="pregunta7" value={form.pregunta7} onChange={handleChange} minLength="5" maxLength="200" required />
            {errors.pregunta7 && <Form.Text className="text-danger">{errors.pregunta7}</Form.Text>}
          </Form.Group>
            <br></br><br></br><br></br>
            <center>
          <Button variant="primary" type="submit">
            Registrar Comentario
          </Button>
          </center>
        </Form>
      </Container>
    </AuthenticatedRoute>
  );
}

export default Comments;
