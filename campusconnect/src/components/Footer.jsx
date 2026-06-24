import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

function Footer() {
    const [subscribed, setSubscribed] = useState(false);
    const location = useLocation();

    // Only show footer on landing page and events page
    const showNewsletter = location.pathname === '/' || location.pathname.startsWith('/events');

    if (!showNewsletter) return null;

    const handleSubscribe = (e) => {
        e.preventDefault();
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <footer style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)' }}>
            {/* Newsletter */}
            <div className="py-5" id="contact">
                <Container>
                <Row className="mb-4">
                    <Col md={6}>
                        <h5 style={{ color: 'var(--text-primary)' }}>Subscribe to our newsletter to get updates to our latest collections</h5>
                        <Form className="d-flex mt-3" onSubmit={handleSubscribe}>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                className="me-2"
                                required
                                style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                            />
                            <Button variant="success" type="submit" className="fw-bold px-4">
                                {subscribed ? 'Subscribed!' : 'Subscribe'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
                </Container>
            </div>

            {/* About + Links grid */}
            <div id="about" style={{ borderTop: '1px solid var(--border-color)' }}>
                <Container className="py-5">
                <Row className="mt-2">
                    <Col md={3} className="mb-4 mb-md-0">
                        <h6 className="fw-bold" style={{ color: 'var(--text-primary)' }}>SHOP</h6>
                        <ul className="list-unstyled" style={{ color: 'var(--text-secondary)' }}>
                            <li className="mb-2">Marketplace</li>
                            <li className="mb-2">Job listings</li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-4 mb-md-0">
                        <h6 className="fw-bold" style={{ color: 'var(--text-primary)' }}>COMPANY</h6>
                        <ul className="list-unstyled" style={{ color: 'var(--text-secondary)' }}>
                            <li className="mb-2">About Us</li>
                            <li className="mb-2">Contact Us</li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-4 mb-md-0">
                        <h6 className="fw-bold" style={{ color: 'var(--text-primary)' }}>SUPPORT</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2" style={{ color: '#48BB78' }}>FAQs</li>
                            <li className="mb-2" style={{ color: '#48BB78' }}>Cookie Policy</li>
                            <li className="mb-2" style={{ color: '#48BB78' }}>Terms of Use</li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>PAYMENT NETWORKS</h6>
                        <div className="d-flex align-items-center bg-white rounded px-3 py-2 d-inline-flex" style={{ border: '1px solid #E2E8F0' }}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Visa_2014.svg"
                                alt="Visa"
                                style={{ width: '40px', marginRight: '15px' }}
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                alt="PayPal"
                                style={{ width: '40px' }}
                            />
                        </div>
                    </Col>
                </Row>
                </Container>
            </div>

            {/* Copyright bar */}
            <div style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', padding: '1rem 0' }}>
                <Container>
                    <p className="text-center mb-0 small" style={{ color: 'var(--text-secondary)' }}>
                        © {new Date().getFullYear()} Campus Connect · Mountain Top University · All rights reserved.
                    </p>
                </Container>
            </div>
        </footer>
    )
}

export default Footer
