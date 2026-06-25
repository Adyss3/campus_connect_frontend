// src/components/Hero.jsx
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'

const Hero = () => {
    return (
        <section className="hero-wrapper">
            <div className="hero-blob green"></div>
            <div className="hero-blob blue"></div>
            
            <Container className="position-relative z-1">
                <Row className="align-items-center">
                    <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                        <div className="d-inline-flex align-items-center rounded-pill px-3 py-2 mb-4 shadow-sm border fade-up-1" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                            <span className="badge bg-success rounded-pill me-2 px-2 py-1">New</span>
                            <span className="small fw-semibold" style={{ color: 'var(--text-secondary)' }}>Mountain Top University's Exclusive Network 🎉</span>
                        </div>
                        
                        <h1 className="display-4 fw-bolder mb-4 fade-up-2 lh-sm" style={{ letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                            Empower Your Campus Experience to{' '}
                            <span className="text-gradient">Connect, Grow, & Thrive.</span>
                        </h1>
                        
                        <p className="lead text-muted mb-5 fade-up-3 pe-lg-5" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            The ultimate hub for students and entrepreneurs. Buy and sell dorm essentials, discover internships, and build your professional network effortlessly.
                        </p>
                        
                        <div className="row g-4 mt-2 fade-up-4">
                            <div className="col-12 col-sm-6">
                                <div className="p-4 rounded-4 h-100 transition-all border d-flex flex-column text-start" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-soft)', transition: 'all 0.3s' }}>
                                    <div className="fs-3 mb-2">🎓</div>
                                    <h5 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Student Access</h5>
                                    <p className="small text-muted flex-grow-1 mb-4">
                                        For verified MTU students. Access the campus marketplace, browse events, and search careers.
                                    </p>
                                    <Link to="/login/student" className="btn-premium text-decoration-none w-100 justify-content-center py-2">
                                        Student Portal <FaArrowRight className="ms-2" size={12} />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="p-4 rounded-4 h-100 transition-all border d-flex flex-column text-start" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-soft)', transition: 'all 0.3s' }}>
                                    <div className="fs-3 mb-2">🏢</div>
                                    <h5 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Campus Access</h5>
                                    <p className="small text-muted flex-grow-1 mb-4">
                                        For staff, student organizations, and vendors. Build a store, post jobs, and publish events.
                                    </p>
                                    <Link to="/login/campus" className="btn-premium text-decoration-none w-100 justify-content-center py-2" style={{ background: 'var(--dark-gradient)' }}>
                                        Campus Portal <FaArrowRight className="ms-2" size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-5 d-flex align-items-center justify-content-center justify-content-lg-start gap-4 fade-up-4 text-muted small fw-semibold">
                            <div className="d-flex align-items-center"><FaCheckCircle className="text-success me-2" size={18} /> Verified Users</div>
                            <div className="d-flex align-items-center"><FaCheckCircle className="text-success me-2" size={18} /> Secure Payments</div>
                            <div className="d-flex align-items-center"><FaCheckCircle className="text-success me-2" size={18} /> .edu Required</div>
                        </div>
                    </Col>
                    
                    <Col lg={6} className="fade-up-s d-none d-md-block">
                        <div className="position-relative" style={{ animation: 'float 8s ease-in-out infinite' }}>
                            <div className="position-absolute w-100 h-100 bg-success rounded-circle opacity-10 blur-xl" style={{ filter: 'blur(40px)', transform: 'scale(0.9)', zIndex: 0 }}></div>
                            <img
                                src="/images/university students collabing.png"
                                alt="University Students studying and working"
                                className="img-fluid rounded-5 shadow-lg position-relative z-3 border border-4 border-white"
                                style={{ transform: 'rotate(2deg)' }}
                            />
                            
                            {/* Floating UI Elements */}
                            <div className="position-absolute p-3 rounded-4 shadow-lg z-3 d-flex align-items-center" style={{ background: 'var(--card-bg)', bottom: '10%', left: '-10%', animation: 'float 6s ease-in-out infinite 1s' }}>
                                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: 40, height:40}}>🏆</div>
                                <div>
                                    <div className="fw-bold lh-1" style={{ color: 'var(--text-primary)' }}>4.9/5</div>
                                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Student Rating</small>
                                </div>
                            </div>

                            <div className="position-absolute p-3 rounded-4 shadow-lg z-3 d-flex align-items-center" style={{ background: 'var(--card-bg)', top: '10%', right: '-5%', animation: 'float 7s ease-in-out infinite 2s' }}>
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: 40, height:40}}>💼</div>
                                <div>
                                    <div className="fw-bold lh-1" style={{ color: 'var(--text-primary)' }}>150+</div>
                                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Weekly Jobs</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero
