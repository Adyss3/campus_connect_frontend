// src/components/Trending.jsx
import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Trending() {
    const products = [
        {
            id: 1,
            title: 'Mathematics Textbook',
            price: '$45.00',
            rating: '4.8 (45)',
            img: 'https://placehold.co/200?text=Math+Book'
        },
        {
            id: 2,
            title: 'Campus Hoodie',
            price: '$35.00',
            rating: '4.8 (41)',
            img: 'https://placehold.co/200?text=Hoodie'
        },
        {
            id: 3,
            title: 'Wireless Mouse',
            price: '$15.00',
            rating: '3.2 (32)',
            img: 'https://placehold.co/200?text=Mouse'
        },
        {
            id: 4,
            title: 'Study Lamp',
            price: '$20.00',
            rating: '4.8 (29)',
            img: 'https://placehold.co/200?text=Lamp'
        },
        {
            id: 5,
            title: 'Graphic Design Services',
            price: '$50/hr',
            rating: '4.9 (55)',
            img: 'https://placehold.co/200?text=Design+Service'
        },
        // add more products as needed...
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992, // below 992px screen width
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // below 768px screen width
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    return (
        <section className="py-5 bg-light">
            <Container>
                <h2 className="mb-4 text-center">Now Trending</h2>
                <Slider {...settings}>
                    {products.map(product => (
                        <div key={product.id} className="px-2">
                            <Card className="mb-4">
                                <Card.Img variant="top" src={product.img} alt={product.title} />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '1rem' }}>{product.title}</Card.Title>
                                    <Card.Text className="text-muted">
                                        {product.rating}
                                    </Card.Text>
                                    <p className="fw-bold fs-5 text-success mb-3">{product.price}</p>
                                    <Link to={`/product/${product.id}`} className="btn btn-success fw-bold w-100">
                                        View Details
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    )
}

export default Trending
