import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'

function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: 'Leo',
            role: 'Engineering Student',
            rating: 5,
            text: 'I found the absolute perfect part-time job through this platform. The verified university status makes every interaction feel incredibly safe and legitimate. Highly recommended!',
            img: 'https://ui-avatars.com/api/?name=Leo&background=2F855A&color=fff&size=100'
        },
        {
            id: 2,
            name: 'Sarah',
            role: 'Business Major',
            rating: 5,
            text: 'Selling my old textbooks was a breeze! I connected with a freshman right on campus and made the sale the very next day. Campus Connect is a lifesaver.',
            img: 'https://ui-avatars.com/api/?name=Sarah&background=E53E3E&color=fff&size=100'
        },
        {
            id: 3,
            name: 'David',
            role: 'Student Entrepreneur',
            rating: 4,
            text: 'I launched my graphic design service here. The real-time chat helps me negotiate quotes instantly with clients studying in the exact same library!',
            img: 'https://ui-avatars.com/api/?name=David&background=3182CE&color=fff&size=100'
        },
        {
            id: 4,
            name: 'Emma',
            role: 'Campus Tutor',
            rating: 5,
            text: 'Finding tutoring clients has historically been hard, but the local ecosystem built right into Campus Connect changed everything.',
            img: 'https://ui-avatars.com/api/?name=Emma&background=805AD5&color=fff&size=100'
        }
    ]

    return (
        <section className="py-6 py-lg-8" style={{ backgroundColor: 'var(--bg-primary)', padding: '6rem 0' }}>
            <Container>
                <div className="mb-5 text-center fade-up-1">
                    <span className="text-success fw-bold text-uppercase tracking-wider small d-block mb-2">Student Voices</span>
                    <h2 className="display-6 fw-bold">Don't just take our word for it.</h2>
                </div>
                <Row className="g-4 mt-3">
                    {testimonials.map((testimonial, i) => (
                        <Col lg={6} key={testimonial.id} className={`fade-up-${(i % 4) + 1}`}>
                            <div className="glass-card hover-lift p-4 p-md-5 h-100 border-0 shadow-sm" style={{ background: 'var(--card-bg)', borderTop: '4px solid var(--primary-color)' }}>
                                <div className="text-warning mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="me-1" />
                                    ))}
                                </div>
                                <p className="fs-5 mb-4 lh-lg" style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>
                                    "{testimonial.text}"
                                </p>
                                <div className="d-flex align-items-center mt-auto">
                                    <img src={testimonial.img} alt={testimonial.name} className="rounded-circle me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    <div>
                                        <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                                        <small className="text-muted">{testimonial.role}</small>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default Testimonials
