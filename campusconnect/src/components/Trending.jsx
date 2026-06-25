import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStore, FaStar } from 'react-icons/fa'

const trendingItems = [
  {
    id: 'p1',
    title: 'Campus Hoodie - Black',
    price: '₦12,000',
    oldPrice: '₦25,000',
    category: 'Apparel',
    storeName: 'MTU Gear Store',
    rating: '4.8',
    img: '/images/products/Hoodie.jpg'
  },
  {
    id: 'p3',
    title: 'Fresh Dorm Cookies (Dozen)',
    price: '₦3,600',
    oldPrice: '₦4,800',
    category: 'Food & Snacks',
    storeName: 'Dorm Delights & Bites',
    rating: '4.9',
    img: '/images/products/cookies.jpg'
  },
  {
    id: 'p5',
    title: 'Wireless ANC Headphones',
    price: '₦36,000',
    oldPrice: '₦44,000',
    category: 'Electronics',
    storeName: 'ByteCode Tech',
    rating: '4.7',
    img: '/images/products/anc haeadphones.jpg'
  },
  {
    id: 'p6',
    title: 'USB-C Multi-port Hub',
    price: '₦10,000',
    oldPrice: null,
    category: 'Electronics',
    storeName: 'ByteCode Tech',
    rating: '4.6',
    img: '/images/products/usb c multiport hub.jpg'
  }
]

function Trending() {
  return (
    <section
      style={{
        backgroundColor: 'var(--bg-primary)',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        borderTop: '1px solid var(--border-color)'
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
          <div className="fade-up-1">
            <span
              className="text-success fw-bold text-uppercase small mb-2 d-block"
              style={{ letterSpacing: '0.08em' }}
            >
              Campus Marketplace
            </span>
            <h2
              className="display-6 fw-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Now Trending on <span className="text-gradient">Campus</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500 }} className="mb-0">
              Real products from verified student entrepreneurs — right at your doorstep.
            </p>
          </div>
          <Link
            to="/login/student"
            className="btn-premium d-inline-flex align-items-center gap-2 fade-up-1"
            style={{ whiteSpace: 'nowrap' }}
          >
            Browse Marketplace <FaArrowRight size={13} />
          </Link>
        </div>

        {/* Product Grid */}
        <Row className="g-4">
          {trendingItems.map((item, idx) => (
            <Col key={item.id} xs={12} sm={6} lg={3} className={`fade-up-${(idx % 4) + 1}`}>
              <div
                className="hover-lift h-100 d-flex flex-column"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 18,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.25,0.8,0.25,1)',
                  position: 'relative'
                }}
              >
                {/* Sale badge */}
                {item.oldPrice && (
                  <Badge
                    bg="danger"
                    className="position-absolute rounded-pill px-3 py-2"
                    style={{ top: 12, left: 12, zIndex: 2, fontSize: '0.72rem' }}
                  >
                    Sale
                  </Badge>
                )}

                {/* Product Image */}
                <div
                  style={{
                    height: 180,
                    background: 'var(--bg-secondary)',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div className="d-flex flex-column p-3" style={{ flex: 1 }}>
                  {/* Category + Store */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      className="d-inline-flex align-items-center"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 600
                      }}
                    >
                      <FaStore size={9} className="me-1" /> {item.storeName}
                    </span>
                  </div>

                  {/* Title */}
                  <div
                    className="fw-bold mb-2"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.35,
                      height: 38,
                      overflow: 'hidden'
                    }}
                  >
                    {item.title}
                  </div>

                  {/* Rating */}
                  <div className="d-flex align-items-center mb-3">
                    <FaStar size={11} color="#F6AD55" className="me-1" />
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {item.rating}
                    </span>
                  </div>

                  {/* Price + CTA */}
                  <div
                    className="d-flex align-items-center justify-content-between mt-auto pt-2"
                    style={{ borderTop: '1px solid var(--border-color)' }}
                  >
                    <div>
                      <span className="fw-bold text-success me-2" style={{ fontSize: '1rem' }}>
                        {item.price}
                      </span>
                      {item.oldPrice && (
                        <span
                          style={{
                            color: 'var(--text-muted)',
                            textDecoration: 'line-through',
                            fontSize: '0.78rem'
                          }}
                        >
                          {item.oldPrice}
                        </span>
                      )}
                    </div>
                    <Link
                      to="/login/student"
                      className="btn btn-sm fw-bold rounded-pill px-3"
                      style={{
                        background: 'var(--primary-gradient)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '0.72rem'
                      }}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Bottom CTA strip */}
        <div
          className="mt-5 p-4 rounded-4 text-center"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)'
          }}
        >
          <p className="mb-3 fw-semibold" style={{ color: 'var(--text-secondary)' }}>
            🛍️ These are just a few items from our growing marketplace. Sign in to browse everything.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/login/student" className="btn-premium d-inline-flex align-items-center gap-2">
              Student Login <FaArrowRight size={12} />
            </Link>
            <Link
              to="/login/campus"
              className="btn-premium-outline d-inline-flex align-items-center gap-2"
            >
              Sell on Campus Connect
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Trending
