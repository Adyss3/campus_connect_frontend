import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';

const CampusLogin = () => {
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
      const loggedInUser = await login(email, password);
      
      // Enforce that student accounts cannot log in through Campus Access
      if (loggedInUser.role === 'Student') {
        throw new Error('Students must log in through the Student Access Portal.');
      }
      
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
        <div className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle p-3 mb-3" style={{ background: 'var(--dark-gradient) !important' }}>
          <FaBuilding size={28} />
        </div>
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Campus Access Portal</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Log in as Staff, Entrepreneur, or Organization</p>
      </div>

      {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            <FaEnvelope className="me-2 text-success" size={14} />Campus Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@university.edu"
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
          style={{ background: 'var(--dark-gradient)', border: 'none', fontSize: '1rem' }}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Log In (Campus Access)'}
        </Button>
      </Form>

      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Don't have a campus access account? </span>
        <Link to="/signup/campus" className="text-success text-decoration-none fw-bold">Register here</Link>
      </div>
      <div className="text-center mt-2">
        <Link to="/login/student" className="text-success small text-decoration-none fw-bold">Are you a Student? <strong>Go to Student Portal</strong></Link>
      </div>
    </>
  );
};

export default CampusLogin;
