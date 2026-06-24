import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaGraduationCap } from 'react-icons/fa';

const StudentSignup = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.email || !formData.password) {
      setError('Please fill out all required fields.');
      return;
    }

    // Validate MTU email format: firstnamelastname@mtu.edu.ng
    const mtuEmailPattern = /^[a-z]+[a-z]+@mtu\.edu\.ng$/i;
    if (!mtuEmailPattern.test(formData.email.toLowerCase())) {
      setError('Please use the correct MTU email format: firstnamelastname@mtu.edu.ng');
      return;
    }

    try {
      await signup({
        ...formData,
        isStudentPortal: true,
        university: 'Mountain Top University'
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account.');
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
        <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle p-3 mb-3">
          <FaGraduationCap size={28} />
        </div>
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Student Signup</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Create your MTU student account</p>
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
          <Form.Label style={labelStyle}>MTU Student Email*</Form.Label>
          <Form.Control type="email" name="email" placeholder="firstname.lastname@mtu.edu.ng" value={formData.email} onChange={handleChange} required style={inputStyle}/>
          <Form.Text style={{ color: 'var(--text-secondary)' }}>Must end with @mtu.edu.ng</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label style={labelStyle}>Password*</Form.Label>
          <Form.Control type="password" name="password" placeholder="At least 6 characters" value={formData.password} onChange={handleChange} required style={inputStyle}/>
        </Form.Group>

        <Button variant="success" type="submit" className="btn-premium w-100 py-2 fs-6 fw-bold" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Create Student Account'}
        </Button>
      </Form>

      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
        <Link to="/login/student" className="text-success text-decoration-none fw-bold">Log In</Link>
      </div>
      <div className="text-center mt-2">
        <Link to="/signup/campus" className="text-secondary small text-decoration-none">Not a student? <strong>Register under Campus Access</strong></Link>
      </div>
    </>
  );
};

export default StudentSignup;
