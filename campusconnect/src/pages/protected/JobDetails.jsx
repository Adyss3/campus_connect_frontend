import React, { useState } from 'react';
import { Container, Card, Badge, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaCheck } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appliedJobs, applyForJob } = useAppContext();
  const [loading, setLoading] = useState(false);

  const jobId = id || 'job-1';
  const hasApplied = appliedJobs.includes(jobId);

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      applyForJob(jobId);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <Button variant="link" className="text-secondary text-decoration-none px-0 mb-4 d-flex align-items-center" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back to Jobs
      </Button>

      <Card className="shadow-sm border-0 mb-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: 20 }}>
        <Card.Body className="p-4 p-md-5">
          <Badge bg="success" className="mb-3 px-3 py-2 rounded-pill">Internship</Badge>
          <h2 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Software Engineering Intern</h2>
          <h5 className="mb-4 lead fw-semibold" style={{ color: 'var(--text-secondary)' }}>Google</h5>

          <div className="d-flex flex-wrap gap-4 mb-5" style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 16, border: '1px solid var(--border-color)' }}>
            <div className="d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
              <FaMapMarkerAlt size={18} className="me-2 text-danger" />
              <span className="fw-medium">Remote</span>
            </div>
            <div className="d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
              <FaMoneyBillWave size={18} className="me-2 text-success" />
              <span className="fw-medium">Paid Internship</span>
            </div>
            <div className="d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
              <FaCalendarAlt size={18} className="me-2 text-primary" />
              <span className="fw-medium">Summer 2026</span>
            </div>
          </div>

          <h5 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>About the Role</h5>
          <p className="lh-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
            Join our dynamic team and help build the next generation of web applications. 
            You will work closely with senior engineers to design, test, and deploy features. 
            Strong proficiency in JavaScript and React is required.
          </p>

          <h5 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Requirements</h5>
          <ul className="lh-lg mb-5" style={{ color: 'var(--text-secondary)' }}>
            <li>Currently enrolled in a BS/MS program in Computer Science or related field.</li>
            <li>Experience with modern frontend frameworks (React, Vue, Angular).</li>
            <li>Strong problem-solving skills and willingness to learn.</li>
          </ul>

          <div className="d-grid">
            <Button 
              variant={hasApplied ? 'primary' : 'success'} 
              size="lg" 
              className={`fw-bold py-3 transition-all ${!hasApplied ? 'btn-premium' : ''}`} 
              onClick={handleApply}
              disabled={loading || hasApplied}
              style={hasApplied ? {} : { width: '100%' }}
            >
              {loading ? <Spinner animation="border" size="sm" /> : hasApplied ? <><FaCheck className="me-2"/> Applied successfully</> : 'Apply Now'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetails;
