import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaStore, FaBriefcase, FaUsers, FaComments } from 'react-icons/fa'

const Features = () => {
    const features = [
        {
            icon: <FaStore size={35} />,
            title: 'Marketplace',
            text: 'Discover tailored dorm essentials or sell course textbooks peer-to-peer.'
        },
        {
            icon: <FaBriefcase size={35} />,
            title: 'Job Listings',
            text: 'Land top-tier internships and part-time jobs directly on campus.'
        },
        {
            icon: <FaUsers size={35} />,
            title: 'Networking',
            text: 'Forge valuable connections with fellow entrepreneurs and mentors.'
        },
        {
            icon: <FaComments size={35} />,
            title: 'Real-Time Chat',
            text: 'Securely negotiate, collaborate, and chat instantly within the network.'
        }
    ]

    return (
        <section id="features" className="py-6 py-lg-8" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '6rem', paddingBottom: '6rem' }}>
            <Container>
                <div className="text-center mb-5 pb-3 fade-up-1">
                    <span className="text-success fw-bold text-uppercase small mb-2 d-block" style={{ letterSpacing: '0.08em' }}>Platform Advantages</span>
                    <h2 className="display-6 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Everything a student needs,<br/>in one powerful ecosystem.</h2>
                    <p className="fs-5 mx-auto" style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>Swap chaos for clarity. Campus Connect brings all the tools you need directly to your fingertips.</p>
                </div>
                
                <Row className="g-4 mt-4">
                    {features.map((feature, index) => (
                        <Col md={6} lg={3} key={index} className={`fade-up-${(index % 4) + 1}`}>
                            <div className="glass-card text-center p-4 p-xl-5 h-100" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '24px' }}>
                                <div className="feature-icon-wrapper">
                                    {feature.icon}
                                </div>
                                <h5 className="fw-bold mb-3 fs-4" style={{ color: 'var(--text-primary)' }}>{feature.title}</h5>
                                <p className="lh-lg mb-0" style={{ color: 'var(--text-secondary)' }}>{feature.text}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default Features
