import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBuilding } from 'react-icons/fa';

const CampusSignup = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'Staff', university: 'Mountain Top University' });
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.email || !formData.password || !formData.role) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      await signup({
        ...formData,
        isStudentPortal: false
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create a campus access account.');
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
        <div className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle p-3 mb-3" style={{ background: 'var(--dark-gradient) !important' }}>
          <FaBuilding size={28} />
        </div>
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Campus Registration</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Create your Staff, Entrepreneur, or Organization account</p>
      </div>

      {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

      <Form onSubmit={handleSignup}>
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label style={labelStyle}>First Name / Brand Name*</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle}/>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label style={labelStyle}>Last Name / Suffix</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle}/>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label style={labelStyle}>Campus Email Address*</Form.Label>
          <Form.Control type="email" name="email" placeholder="e.g. contact@store.com or staff@mtu.edu.ng" value={formData.email} onChange={handleChange} required style={inputStyle}/>
        </Form.Group>

        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Group controlId="role">
              <Form.Label style={labelStyle}>Account Type*</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} required style={inputStyle}>
                <option value="Staff">Staff / Faculty</option>
                <option value="Entrepreneur">Entrepreneur / Vendor</option>
                <option value="Organization">Student Organization / Association</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="university">
              <Form.Label style={labelStyle}>Institution*</Form.Label>
              <Form.Control type="text" name="university" value={formData.university} onChange={handleChange} required style={inputStyle}/>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label style={labelStyle}>Password*</Form.Label>
          <Form.Control type="password" name="password" placeholder="At least 6 characters" value={formData.password} onChange={handleChange} required style={inputStyle}/>
        </Form.Group>

        <Button variant="success" type="submit" className="btn-premium w-100 py-2 fs-6 fw-bold" disabled={isLoading} style={{ background: 'var(--dark-gradient)', border: 'none' }}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Register Campus Account'}
        </Button>
      </Form>

      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Already have a campus account? </span>
        <Link to="/login/campus" className="text-success text-decoration-none fw-bold">Log In</Link>
      </div>
      <div className="text-center mt-2">
        <Link to="/signup/student" className="text-success small text-decoration-none fw-bold">Are you a Student? <strong>Register as Student instead</strong></Link>
      </div>
    </>
  );
};

export default CampusSignup;
