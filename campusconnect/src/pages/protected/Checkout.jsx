import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const inputStyle = {
  background: 'var(--input-bg)',
  color: 'var(--input-text)',
  borderColor: 'var(--border-color)',
  borderRadius: 10,
  padding: '10px 14px',
  fontSize: '0.95rem',
};

const SectionCard = ({ title, children }) => (
  <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 18, padding: '1.5rem', marginBottom: '1.25rem' }}>
    <h5 className="fw-bold mb-4 pb-3" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>{title}</h5>
    {children}
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart, cart } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = 4.50;
  const total = subtotal + tax;

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDone(true);
      clearCart();
      setTimeout(() => navigate('/dashboard'), 2000);
    }, 1500);
  };

  if (done) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: 500 }}>
        <FaCheckCircle size={72} color="#48BB78" style={{ marginBottom: 20 }} />
        <h3 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Order Placed!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Thank you for your purchase. Redirecting you to the dashboard…</p>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>
          <FaLock className="me-2 text-success" size={22} />Secure Checkout
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>Your payment info is encrypted and secure.</p>
      </div>

      <Form onSubmit={handleCheckout}>
        <Row className="g-4">
          <Col lg={8}>
            <SectionCard title="Shipping Information">
              <Row className="g-3">
                <Col sm={6}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>First Name</Form.Label>
                  <Form.Control required style={inputStyle} />
                </Col>
                <Col sm={6}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>Last Name</Form.Label>
                  <Form.Control required style={inputStyle} />
                </Col>
                <Col xs={12}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>Dorm / Address</Form.Label>
                  <Form.Control required placeholder="e.g. North Hall, Room 410" style={inputStyle} />
                </Col>
                <Col sm={6}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>City</Form.Label>
                  <Form.Control required style={inputStyle} />
                </Col>
                <Col sm={6}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>Postcode</Form.Label>
                  <Form.Control required style={inputStyle} />
                </Col>
              </Row>
            </SectionCard>

            <SectionCard title={<><FaCreditCard className="me-2" />Payment Details</>}>
              <Row className="g-3">
                <Col xs={12}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>Card Number</Form.Label>
                  <Form.Control required placeholder="0000 0000 0000 0000" style={inputStyle} maxLength={19} />
                </Col>
                <Col sm={6}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>Expiry Date</Form.Label>
                  <Form.Control required placeholder="MM / YY" style={inputStyle} />
                </Col>
                <Col sm={6}>
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>CVC</Form.Label>
                  <Form.Control required placeholder="123" style={inputStyle} maxLength={4} />
                </Col>
              </Row>
            </SectionCard>
          </Col>

          <Col lg={4}>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 18, padding: '1.5rem', position: 'sticky', top: 88 }}>
              <h5 className="fw-bold mb-4 pb-3" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>Order Summary</h5>

              {cart.map((item, i) => (
                <div key={i} className="d-flex justify-content-between mb-2">
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '70%' }} className="text-truncate">{item.name} ×{item.qty}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}

              <hr style={{ borderColor: 'var(--border-color)', opacity: 1, margin: '12px 0' }} />

              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: 'var(--text-secondary)' }}>Tax &amp; Fees</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${tax.toFixed(2)}</span>
              </div>
              <hr style={{ borderColor: 'var(--border-color)', opacity: 1, margin: '0 0 16px' }} />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>Total</span>
                <span className="fw-bold fs-5 text-success">${total.toFixed(2)}</span>
              </div>

              <button type="submit" className="btn-premium w-100 justify-content-center py-3 fs-6" disabled={isProcessing}>
                {isProcessing ? 'Processing…' : 'Place Order'}
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;
