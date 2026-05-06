import React from 'react';
import { Container, Row, Col, Card, Alert, Button, Form } from 'react-bootstrap';
import { FaIdCard } from 'react-icons/fa';

const Verification = () => {
  return (
    <Container className="py-5" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center mb-4">
            <div style={{ background: 'rgba(237, 137, 54, 0.1)', width: 100, height: 100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <FaIdCard size={50} style={{ color: '#ED8936' }} />
            </div>
            <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>University Verification</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Verify your student status to unlock marketplace features and jobs.</p>
          </div>

          <Alert variant="warning" className="fw-bold text-center border-0 rounded-4" style={{ background: 'rgba(237, 137, 54, 0.15)', color: '#ED8936' }}>
            Status: Action Required
          </Alert>

          <Card className="shadow-sm border-0 rounded-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Body className="p-4 p-md-5 text-center">
              <h5 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Upload Student ID</h5>
              <p className="small mb-4" style={{ color: 'var(--text-secondary)' }}>
                Please upload a clear photo of your student ID card or official university transcript.
              </p>
              
              <Form.Group controlId="formFile" className="mb-4">
                <Form.Control type="file" style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }} />
              </Form.Group>

              <Button variant="success" size="lg" className="btn-premium w-100 fw-bold py-3 mt-2">
                Submit Document
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Verification;
