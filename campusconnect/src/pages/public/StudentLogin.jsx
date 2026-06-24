import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaGraduationCap } from 'react-icons/fa';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    if (!email.toLowerCase().endsWith('@mtu.edu.ng')) {
      setError('Student access requires a valid MTU email (@mtu.edu.ng).');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login. Check your credentials.');
    }
  };

  const inputStyle = {
    background: 'var(--input-bg)',
    color: 'var(--input-text)',
    borderColor: 'var(--border-color)',
    paddingTop: '11px',
    paddingBottom: '11px',
  };

  return (
    <>
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle p-3 mb-3">
          <FaGraduationCap size={28} />
        </div>
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Student Portal</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Log in to your MTU Student Account</p>
      </div>

      {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            <FaEnvelope className="me-2 text-success" size={14} />MTU Student Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="firstname.lastname@mtu.edu.ng"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="loginPassword">
          <Form.Label className="d-flex justify-content-between align-items-center" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            <span><FaLock className="me-2 text-success" size={13} />Password</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className="w-100 fw-bold py-2 rounded-pill btn-premium"
          disabled={isLoading}
          style={{ fontSize: '1rem' }}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Log In'}
        </Button>
      </Form>

      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
        <Link to="/signup/student" className="text-success text-decoration-none fw-bold">Sign Up</Link>
      </div>
      <div className="text-center mt-2">
        <Link to="/login/campus" className="text-secondary small text-decoration-none">Are you staff or vendor? <strong>Go to Campus Access</strong></Link>
      </div>
    </>
  );
};

export default StudentLogin;
