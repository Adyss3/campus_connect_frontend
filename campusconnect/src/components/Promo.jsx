// src/components/Promo.jsx
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Promo = ({
    title = 'Limited Time Offer!',
    description = 'Enjoy exclusive discounts and free shipping on selected products. Don’t miss out!',
    buttonText = 'Shop Now',
    bgColor = '#288c26',
    textColor = 'white'
}) => {
    const promoStyle = {
        backgroundColor: bgColor,
        color: textColor,
        padding: '2rem 0'
    }

    return (
        <section style={promoStyle}>
            <Container>
                <Row className="align-items-center">
                    <Col md={8}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </Col>
                    <Col md={4} className="text-md-end">
                        <Button as={Link} to="/marketplace" variant="primary">
                            {buttonText}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Promo
