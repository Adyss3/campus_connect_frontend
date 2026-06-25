import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaCheck, FaPlus } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const mockEvents = [
  { id: 1, title: 'Spring Career Fair', date: 'Apr 20, 2026', time: '10:00 AM - 4:00 PM', location: 'Main Student Union', img: '/images/events/spring career fair.jpg' },
  { id: 2, title: 'Hackathon 2026', date: 'May 15, 2026', time: '8:00 AM', location: 'Engineering Building', img: '/images/events/Hackathon.png' },
  { id: 3, title: 'Guest Lecture: AI in Healthcare', date: 'April 25, 2026', time: '2:00 PM', location: 'Hall 3', img: '/images/events/Lecture.jpg' },
];

const Events = () => {
  const { rsvpedEvents, rsvpEvent } = useAppContext();

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 pb-4 fade-up-1 flex-wrap gap-3">
        <div>
          <h2 className="display-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Campus <span className="text-gradient">Events</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="fs-5 mb-0">Discover what's happening around you.</p>
        </div>
        <Button className="btn-premium px-4 d-flex align-items-center gap-2">
          <FaPlus size={12} /> Host an Event
        </Button>
      </div>

      <Row className="g-4">
        {mockEvents.map(event => {
          const isGoing = rsvpedEvents.includes(event.id);
          return (
            <Col md={6} lg={4} key={event.id} className={`fade-up-${(event.id % 4) + 1}`}>
              <Card className="h-100 glass-card hover-lift border-0 overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: 20 }}>
                <Card.Img variant="top" src={event.img} className="object-fit-cover" style={{ height: '200px' }} />
                <Card.Body className="d-flex flex-column p-4">
                  <div className="fw-bold small mb-2 d-flex align-items-center" style={{ color: '#2F855A' }}>
                    <FaCalendarAlt className="me-2" /> {event.date} • {event.time}
                  </div>
                  <Card.Title className="fw-bold fs-5 mb-3 lh-sm" style={{ color: 'var(--text-primary)' }}>{event.title}</Card.Title>
                  <div className="small mb-4 d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
                    <FaMapMarkerAlt className="me-2" style={{ color: '#E53E3E' }} /> {event.location}
                  </div>
                  <div className="mt-auto">
                    <Button 
                      className={`w-100 fw-bold transition-all ${isGoing ? 'opacity-75' : ''}`}
                      onClick={() => rsvpEvent(event.id)}
                      style={isGoing ? { background: 'var(--card-bg-alt)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } : {}}
                      variant={isGoing ? "light" : "success"}
                    >
                      {isGoing ? <><FaCheck className="me-2 text-success"/> Going</> : 'RSVP'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Events;
