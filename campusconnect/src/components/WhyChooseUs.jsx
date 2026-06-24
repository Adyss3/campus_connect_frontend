import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaShieldAlt, FaBriefcase, FaComments } from 'react-icons/fa'

function WhyChooseUs() {
    return (
        <section className="py-6 py-lg-8 position-relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '6rem', paddingBottom: '6rem' }}>
            <div className="position-absolute bg-success rounded-circle opacity-10" style={{ width: '600px', height: '600px', right: '-20%', top: '-10%', filter: 'blur(80px)', zIndex: 0 }}></div>
            <Container className="position-relative z-1">
                <Row className="align-items-center">
                    <Col lg={5} className="mb-5 mb-lg-0 fade-up-1">
                        <span className="text-success fw-bold text-uppercase tracking-wider small mb-2 d-block">Why Us?</span>
                        <h2 className="display-5 fw-bold mb-4 lh-sm">Built Exclusively For <span className="text-gradient">Mountain Top University.</span></h2>
                        <p className="text-muted fs-5 mb-4 lh-lg">
                            We aren't just another generic marketplace. Campus Connect bridges the gap between students, faculties, and aspiring entrepreneurs in a highly localized, secure, and supportive environment.
                        </p>
                        
                        <div className="d-flex align-items-center mb-4 p-3 rounded-4 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                            <div className="bg-white p-3 rounded-circle shadow-sm me-3 text-warning fs-3 lh-1">⭐</div>
                            <div>
                                <h4 className="fw-bold mb-0">4.9/5 Rating</h4>
                                <p className="text-muted small mb-0">From 250+ active MTU students</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={{ span: 6, offset: 1 }}>
                        <div className="d-flex flex-column gap-4 mt-3">
                            <div className="glass-card p-4 d-flex align-items-start hover-lift fade-up-2">
                                <div className="bg-success text-white p-3 rounded-4 shadow-sm me-4">
                                    <FaShieldAlt size={24} />
                                </div>
                                <div>
                                    <h4 className="fw-bold">Secure & Verified</h4>
                                    <p className="text-muted mb-0">Every user is verified via the university system, ensuring absolute trust and safe transactions across the board.</p>
                                </div>
                            </div>
                            
                            <div className="glass-card p-4 d-flex align-items-start hover-lift fade-up-3">
                                <div className="bg-primary text-white p-3 rounded-4 shadow-sm me-4">
                                    <FaBriefcase size={24} />
                                </div>
                                <div>
                                    <h4 className="fw-bold">Career Building</h4>
                                    <p className="text-muted mb-0">Access exclusive part-time roles and internships pushed directly by university partners and trusted mentors.</p>
                                </div>
                            </div>

                            <div className="glass-card p-4 d-flex align-items-start hover-lift fade-up-4">
                                <div className="bg-dark text-white p-3 rounded-4 shadow-sm me-4">
                                    <FaComments size={24} />
                                </div>
                                <div>
                                    <h4 className="fw-bold">Real-Time Networking</h4>
                                    <p className="text-muted mb-0">Built-in high speed sockets ensure your negotiation and collaboration never slows down.</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default WhyChooseUs
