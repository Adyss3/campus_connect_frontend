import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', university: '' });
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.firstName || !formData.email || !formData.password || !formData.university) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      await signup(formData);
      navigate('/dashboard'); // Change from /welcome to /dashboard as per mock implementation
    } catch (err) {
      setError('Failed to create an account.');
    }
  };

  const inputStyle = {
    background: 'var(--input-bg)',
    color: 'var(--input-text)',
    borderColor: 'var(--border-color)',
    paddingTop: '11px',
    paddingBottom: '11px',
  };

  const labelStyle = { color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' };

  return (
    <>
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Join Campus Connect</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Create your account to get started</p>
      </div>

      {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

      <Form onSubmit={handleSignup}>
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label style={labelStyle}>First Name*</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle}/>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label style={labelStyle}>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle}/>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label style={labelStyle}>University Email*</Form.Label>
          <Form.Control type="email" name="email" placeholder="student@university.edu" value={formData.email} onChange={handleChange} required style={inputStyle}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="university">
          <Form.Label style={labelStyle}>University / Institution*</Form.Label>
          <Form.Select name="university" value={formData.university} onChange={handleChange} required style={inputStyle}>
            <option value="">Select University...</option>
            <option value="state">State University</option>
            <option value="tech">Tech Institute</option>
            <option value="city">City College</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label style={labelStyle}>Password*</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required style={inputStyle}/>
        </Form.Group>

        <Button variant="success" type="submit" className="btn-premium w-100 py-2 fs-6 fw-bold" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
        </Button>
      </Form>

      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
        <Link to="/login" className="text-success text-decoration-none fw-bold">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
