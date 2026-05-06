// src/components/CallToAction.jsx
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaRocket } from 'react-icons/fa'

function CallToAction() {
    return (
        <section className="py-6 py-lg-8" style={{ background: 'var(--dark-gradient)', paddingTop: '6rem', paddingBottom: '6rem' }}>
            <Container>
                <div className="bg-white rounded-5 shadow-lg overflow-hidden position-relative p-5 p-md-6 glass-card border-0 text-center" style={{ backdropFilter: 'none', background: 'rgba(255, 255, 255, 0.95)' }}>
                    <div className="position-absolute bg-success rounded-circle opacity-25" style={{ width: '400px', height: '400px', top: '-20%', left: '-10%', filter: 'blur(60px)', zIndex: 0 }}></div>
                    <div className="position-absolute bg-primary rounded-circle opacity-25" style={{ width: '300px', height: '300px', bottom: '-20%', right: '-10%', filter: 'blur(60px)', zIndex: 0 }}></div>
                    
                    <Row className="justify-content-center position-relative z-1">
                        <Col lg={8}>
                            <FaRocket size={50} className="text-success mb-4 fade-up-1" />
                            <h2 className="display-5 fw-bolder mb-4 text-dark fade-up-2" style={{ letterSpacing: '-1px' }}>
                                Ready to transform your <br className="d-none d-md-block"/> university experience?
                            </h2>
                            <p className="lead text-muted mb-5 fade-up-3 mx-auto" style={{ maxWidth: '600px' }}>
                                Join thousands of students and entrepreneurs already buying, selling, and building careers on Campus Connect.
                            </p>
                            <Link to="/signup" className="btn-premium btn-lg fs-5 px-5 py-3 shadow-lg fade-up-4 d-inline-flex align-items-center">
                                Join The Network Now <span className="ms-2">→</span>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default CallToAction
