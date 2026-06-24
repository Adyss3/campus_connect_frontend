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
                            <div className="d-flex flex-wrap justify-content-center gap-3 fade-up-4">
                              <Link to="/signup/student" className="btn-premium btn-lg fs-5 px-5 py-3 shadow-lg d-inline-flex align-items-center">
                                Join as Student <span className="ms-2">→</span>
                              </Link>
                              <Link to="/signup/campus" className="d-inline-flex align-items-center btn-lg fs-5 px-5 py-3 rounded-pill fw-bold" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                                Campus Access
                              </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default CallToAction
