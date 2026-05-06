import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserGraduate, FaBriefcase, FaChalkboardTeacher } from 'react-icons/fa';

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assume already signed up but needs to select role

  const handleRoleSelection = (role) => {
    // Ideally update user role in backend here
    console.log("Selected role:", role);
    navigate('/dashboard');
  };

  const roles = [
    { id: 'Student', icon: <FaUserGraduate size={40} className="mb-3 text-success" />, title: 'Student', desc: 'Shop, find jobs, join events.' },
    { id: 'Entrepreneur', icon: <FaBriefcase size={40} className="mb-3 text-success" />, title: 'Entrepreneur', desc: 'Sell products and offer services.' },
    { id: 'Faculty', icon: <FaChalkboardTeacher size={40} className="mb-3 text-success" />, title: 'Faculty / Admin', desc: 'Manage campus and post announcements.' }
  ];

  return (
    <div className="text-center">
      <h2 className="fw-bold text-dark mb-2">Welcome to Campus Connect!</h2>
      <p className="text-muted mb-4">Please select your role to personalize your experience.</p>

      <Row className="g-3">
        {roles.map((role) => (
          <Col md={12} key={role.id}>
            <Card
              className="h-100 border border-1 border-opacity-10 shadow-sm cursor-pointer hover-shadow transition-all"
              onClick={() => handleRoleSelection(role.id)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="d-flex flex-row align-items-center p-3">
                <div className="me-4">{role.icon}</div>
                <div className="text-start">
                  <h5 className="fw-bold mb-1">{role.title}</h5>
                  <p className="text-muted mb-0 small">{role.desc}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button variant="link" className="mt-4 text-muted text-decoration-none" onClick={() => navigate('/dashboard')}>
        Skip for now
      </Button>
    </div>
  );
};

export default Welcome;
