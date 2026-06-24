import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const mockJobs = [
  { id: 1, title: 'Campus Ambassador', company: 'TechNova', location: 'On-Campus', type: 'Part-Time', salary: '₦25,000/month' },
  { id: 2, title: 'Software Engineering Intern', company: 'Google', location: 'Remote', type: 'Internship', salary: 'Paid – Competitive' },
  { id: 3, title: 'Library Assistant', company: 'MTU Main Library', location: 'Main Library', type: 'Work-Study', salary: '₦20,000/month' },
  { id: 4, title: 'Marketing Coordinator', company: 'Local Agency', location: 'City Center', type: 'Full-Time', salary: '₦800,000/year' },
  { id: 5, title: 'Research Assistant', company: 'Biology Dept.', location: 'Science Block', type: 'Work-Study', salary: '₦18,000/month' },
  { id: 6, title: 'UI/UX Design Intern', company: 'Creative Co.', location: 'Remote', type: 'Internship', salary: 'Paid – Stipend' },
];

const TYPE_COLORS = {
  'Internship': '#3182CE',
  'Part-Time': '#2F855A',
  'Full-Time': '#6B46C1',
  'Work-Study': '#C05621',
};

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('All');

  const filtered = mockJobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        j.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = jobType === 'All' || j.type === jobType;
    return matchSearch && matchType;
  });

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3 fade-up-1">
        <div>
          <h2 className="display-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Career <span className="text-gradient">Board</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="mb-0">Find internships, part-time and full-time opportunities.</p>
        </div>
        <Link to="/resume-builder" className="btn-premium text-decoration-none">
          My Resume Builder
        </Link>
      </div>

      {/* Search + Filter Row */}
      <Row className="mb-5 g-3 fade-up-2">
        <Col md={8}>
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '0.85rem' }} />
            <input
              type="text"
              placeholder="Search roles, companies, or keywords…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 40px',
                background: 'var(--input-bg)', color: 'var(--input-text)',
                border: '1px solid var(--border-color)', borderRadius: 12,
                fontSize: '0.95rem', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#2F855A'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
        </Col>
        <Col md={4}>
          <select
            value={jobType}
            onChange={e => setJobType(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px',
              background: 'var(--input-bg)', color: 'var(--input-text)',
              border: '1px solid var(--border-color)', borderRadius: 12,
              fontSize: '0.95rem', outline: 'none',
            }}
          >
            {['All', 'Internship', 'Part-Time', 'Full-Time', 'Work-Study'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Col>
      </Row>

      {/* Job Cards */}
      <Row className="g-4">
        {filtered.map((job, i) => (
          <Col md={6} lg={4} key={job.id} className={`fade-up-${(i % 4) + 1}`}>
            <div
              className="hover-lift h-100 d-flex flex-column p-4"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 20, transition: 'all 0.3s' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{ background: `${TYPE_COLORS[job.type] || '#2F855A'}22`, color: TYPE_COLORS[job.type] || '#2F855A', fontWeight: 700, fontSize: '0.75rem', border: `1px solid ${TYPE_COLORS[job.type] || '#2F855A'}44` }}
                >
                  {job.type}
                </span>
                <span className="fw-bold" style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{job.salary}</span>
              </div>
              <h5 className="fw-bold mb-1" style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}>{job.title}</h5>
              <div className="d-flex align-items-center gap-2 mb-3" style={{ color: '#3182CE', fontWeight: 600, fontSize: '0.88rem' }}>
                <FaBriefcase size={13} /> {job.company}
              </div>
              <div
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 mb-4"
                style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: '0.83rem' }}
              >
                <FaMapMarkerAlt style={{ color: '#E53E3E', flexShrink: 0 }} /> {job.location}
              </div>
              <div className="mt-auto">
                <Link to={`/jobs/${job.id}`} className="btn-premium-outline text-decoration-none text-center w-100 d-block" style={{ fontSize: '0.88rem', padding: '10px' }}>
                  View Details
                </Link>
              </div>
            </div>
          </Col>
        ))}
        {filtered.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>No jobs found. Try a different search or filter.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Jobs;
