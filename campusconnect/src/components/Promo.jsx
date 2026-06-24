import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaTag } from 'react-icons/fa'

const Promo = () => {
  return (
    <section style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <Container>
        <div
          className="rounded-5 overflow-hidden position-relative p-4 p-md-5"
          style={{
            background: 'var(--primary-gradient)',
            boxShadow: '0 20px 60px rgba(47, 133, 90, 0.35)'
          }}
        >
          {/* Decorative blobs */}
          <div
            className="position-absolute rounded-circle"
            style={{
              width: 300,
              height: 300,
              background: 'rgba(255,255,255,0.08)',
              top: '-80px',
              right: '-60px',
              pointerEvents: 'none'
            }}
          />
          <div
            className="position-absolute rounded-circle"
            style={{
              width: 200,
              height: 200,
              background: 'rgba(255,255,255,0.06)',
              bottom: '-60px',
              left: '10%',
              pointerEvents: 'none'
            }}
          />

          <Row className="align-items-center position-relative" style={{ zIndex: 1 }}>
            <Col md={8} className="mb-4 mb-md-0">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{ background: 'rgba(255,255,255,0.2)', width: 38, height: 38 }}
                >
                  <FaTag size={16} color="#fff" />
                </div>
                <span
                  className="fw-bold text-uppercase"
                  style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', letterSpacing: '0.1em' }}
                >
                  Limited Time Offer
                </span>
              </div>
              <h2 className="fw-bolder mb-2" style={{ color: '#fff', letterSpacing: '-0.5px' }}>
                Back to School Deals 🎒
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', marginBottom: 0 }}>
                Exclusive discounts on campus essentials from verified student stores. Don't miss out!
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Link
                to="/signup/student"
                className="d-inline-flex align-items-center gap-2 fw-bold px-4 py-3 rounded-pill"
                style={{
                  background: '#fff',
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Shop Now <FaArrowRight size={13} />
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}

export default Promo
