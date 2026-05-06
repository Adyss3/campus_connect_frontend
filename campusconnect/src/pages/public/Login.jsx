import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
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
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Check your credentials.');
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
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Log in to your Campus Connect account</p>
      </div>

      {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            <FaEnvelope className="me-2 text-success" size={14} />University Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="student@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="loginPassword">
          <Form.Label className="d-flex justify-content-between align-items-center" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            <span><FaLock className="me-2 text-success" size={13} />Password</span>
            <Link to="/forgot-password" className="text-success text-decoration-none" style={{ fontSize: '0.82rem', fontWeight: 500 }}>
              Forgot Password?
            </Link>
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
          className="w-100 fw-bold py-2 rounded-pill"
          disabled={isLoading}
          style={{ fontSize: '1rem' }}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Log In'}
        </Button>
      </Form>

      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
        <Link to="/signup" className="text-success text-decoration-none fw-bold">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
