import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBuilding } from 'react-icons/fa';

const Login = () => {
  return (
    <>
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>Welcome to Campus Connect</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Choose your login portal to continue</p>
      </div>

      <Row className="g-3">
        <Col xs={12}>
          <Link to="/login/student" className="text-decoration-none">
            <Card className="hover-lift border-0 shadow-sm" style={{ cursor: 'pointer', background: 'var(--card-bg)' }}>
              <Card.Body className="d-flex align-items-center p-4">
                <div className="bg-success text-white rounded-circle p-3 me-3">
                  <FaGraduationCap size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Student Access</h5>
                  <p className="text-muted mb-0 small">Log in with your @mtu.edu.ng email</p>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col xs={12}>
          <Link to="/login/campus" className="text-decoration-none">
            <Card className="hover-lift border-0 shadow-sm" style={{ cursor: 'pointer', background: 'var(--card-bg)' }}>
              <Card.Body className="d-flex align-items-center p-4">
                <div className="bg-dark text-white rounded-circle p-3 me-3" style={{ background: 'var(--dark-gradient) !important' }}>
                  <FaBuilding size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Campus Access</h5>
                  <p className="text-muted mb-0 small">Staff, vendors, and student organizations</p>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>

      <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
        <Link to="/signup" className="text-success text-decoration-none fw-bold">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
