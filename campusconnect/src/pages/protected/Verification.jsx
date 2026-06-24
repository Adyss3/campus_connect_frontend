import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Form, Spinner, ProgressBar } from 'react-bootstrap';
import { FaIdCard, FaCheckCircle, FaHourglass, FaTimesCircle, FaUpload, FaFileImage } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Verification = () => {
  const { user } = useAuth();
  const [verificationData, setVerificationData] = useState(null);
  const [formData, setFormData] = useState({
    matricNumber: '',
    department: '',
    yearOfStudy: '1',
    documentType: 'Student ID'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load existing verification data from localStorage
  useEffect(() => {
    if (user) {
      const verifications = JSON.parse(localStorage.getItem('cc_verifications') || '[]');
      const userVerification = verifications.find(v => v.userId === user.id);
      if (userVerification) {
        setVerificationData(userVerification);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPEG, PNG, WEBP) or PDF file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError('');

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview('PDF Document');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedFile) {
      setError('Please select a document to upload');
      return;
    }

    if (!formData.matricNumber || !formData.department) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(interval);
      setUploadProgress(100);

      // Create verification record
      const newVerification = {
        id: 'v_' + Date.now(),
        userId: user.id,
        status: 'pending', // pending, approved, rejected
        matricNumber: formData.matricNumber,
        department: formData.department,
        yearOfStudy: formData.yearOfStudy,
        documentType: formData.documentType,
        documentName: selectedFile.name,
        documentPreview: filePreview,
        submittedAt: new Date().toISOString(),
        reviewedAt: null,
        reviewedBy: null,
        notes: ''
      };

      // Save to localStorage
      const verifications = JSON.parse(localStorage.getItem('cc_verifications') || '[]');
      const existingIndex = verifications.findIndex(v => v.userId === user.id);
      
      if (existingIndex >= 0) {
        verifications[existingIndex] = newVerification;
      } else {
        verifications.push(newVerification);
      }

      localStorage.setItem('cc_verifications', JSON.stringify(verifications));
      setVerificationData(newVerification);

      setSuccess('Verification document submitted successfully! Our team will review it within 24-48 hours.');
      
      // Reset form
      setTimeout(() => {
        setIsSubmitting(false);
        setUploadProgress(0);
      }, 1000);

    } catch (err) {
      setError(err.message || 'Failed to submit verification. Please try again.');
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Render status display if already submitted
  if (verificationData) {
    const statusConfig = {
      pending: {
        icon: FaHourglass,
        color: '#ED8936',
        bg: 'rgba(237, 137, 54, 0.15)',
        title: 'Verification Pending',
        message: 'Your documents are being reviewed by our verification team. This usually takes 24-48 hours.'
      },
      approved: {
        icon: FaCheckCircle,
        color: '#48BB78',
        bg: 'rgba(72, 187, 120, 0.15)',
        title: 'Verification Approved',
        message: 'Your student status has been verified! You now have full access to all marketplace features.'
      },
      rejected: {
        icon: FaTimesCircle,
        color: '#E53E3E',
        bg: 'rgba(229, 62, 62, 0.15)',
        title: 'Verification Rejected',
        message: verificationData.notes || 'Your documents could not be verified. Please submit clearer documents.'
      }
    };

    const config = statusConfig[verificationData.status];
    const StatusIcon = config.icon;

    return (
      <Container className="py-5" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Row className="justify-content-center w-100">
          <Col xs={12} md={8} lg={6}>
            <div className="text-center mb-4">
              <div style={{ background: config.bg, width: 100, height: 100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <StatusIcon size={50} style={{ color: config.color }} />
              </div>
              <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>{config.title}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{config.message}</p>
            </div>

            <Card className="shadow-sm border-0 rounded-4" style={{ background: 'var(--card-bg)' }}>
              <Card.Body className="p-4 p-md-5">
                <h5 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Verification Details</h5>
                
                <div className="mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--border-color) !important' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Status</span>
                    <span className="fw-bold text-capitalize" style={{ color: config.color }}>{verificationData.status}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Matric Number</span>
                    <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>{verificationData.matricNumber}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Department</span>
                    <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>{verificationData.department}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Year of Study</span>
                    <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>Year {verificationData.yearOfStudy}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Submitted</span>
                    <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>
                      {new Date(verificationData.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {verificationData.documentPreview && verificationData.documentPreview !== 'PDF Document' && (
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Submitted Document</h6>
                    <div className="border rounded-3 overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                      <img src={verificationData.documentPreview} alt="Verification Document" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', background: 'var(--bg-primary)' }} />
                    </div>
                  </div>
                )}

                {verificationData.status === 'rejected' && (
                  <Button 
                    variant="success" 
                    className="btn-premium w-100 fw-bold py-3 mt-3"
                    onClick={() => {
                      // Allow resubmission
                      const verifications = JSON.parse(localStorage.getItem('cc_verifications') || '[]');
                      const filtered = verifications.filter(v => v.userId !== user.id);
                      localStorage.setItem('cc_verifications', JSON.stringify(filtered));
                      setVerificationData(null);
                      setSelectedFile(null);
                      setFilePreview(null);
                      setFormData({ matricNumber: '', department: '', yearOfStudy: '1', documentType: 'Student ID' });
                    }}
                  >
                    Submit New Documents
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // Render verification form
  return (
    <Container className="py-5" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center mb-4">
            <div style={{ background: 'rgba(237, 137, 54, 0.1)', width: 100, height: 100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <FaIdCard size={50} style={{ color: '#ED8936' }} />
            </div>
            <h2 className="fw-bold" style={{ color: 'var(--text-primary)' }}>University Verification</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Verify your student status to unlock full marketplace features and job postings.</p>
          </div>

          <Alert variant="warning" className="fw-bold text-center border-0 rounded-4" style={{ background: 'rgba(237, 137, 54, 0.15)', color: '#ED8936' }}>
            Status: Action Required
          </Alert>

          {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
          {success && <Alert variant="success" className="rounded-3">{success}</Alert>}

          <Card className="shadow-sm border-0 rounded-4" style={{ background: 'var(--card-bg)' }}>
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                <h5 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>Student Information</h5>
                
                <Form.Group className="mb-3" controlId="matricNumber">
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Matric Number*</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="matricNumber"
                    placeholder="e.g. MTU/2024/001"
                    value={formData.matricNumber}
                    onChange={handleChange}
                    required
                    style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="department">
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Department*</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="department"
                    placeholder="e.g. Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="yearOfStudy">
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Year of Study*</Form.Label>
                  <Form.Select 
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    required
                    style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                    <option value="5">Year 5+</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4" controlId="documentType">
                  <Form.Label style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Document Type*</Form.Label>
                  <Form.Select 
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    required
                    style={{ background: 'var(--input-bg)', color: 'var(--input-text)', borderColor: 'var(--border-color)' }}
                  >
                    <option value="Student ID">Student ID Card</option>
                    <option value="Transcript">Official Transcript</option>
                    <option value="Admission Letter">Admission Letter</option>
                  </Form.Select>
                </Form.Group>

                <hr style={{ borderColor: 'var(--border-color)' }} className="my-4" />

                <h5 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Upload Document</h5>
                <p className="small mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Please upload a clear photo of your {formData.documentType.toLowerCase()}. Accepted formats: JPEG, PNG, WEBP, PDF (Max 5MB)
                </p>
                
                <Form.Group controlId="formFile" className="mb-4">
                  <div 
                    className="border rounded-3 p-4 text-center" 
                    style={{ 
                      background: 'var(--bg-primary)', 
                      borderColor: 'var(--border-color)', 
                      borderStyle: 'dashed',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => document.getElementById('formFile').click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        document.getElementById('formFile').files = e.dataTransfer.files;
                        handleFileChange({ target: { files: [file] } });
                      }
                    }}
                  >
                    {filePreview ? (
                      filePreview === 'PDF Document' ? (
                        <div>
                          <FaFileImage size={40} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }} />
                          <p className="mb-1 fw-bold" style={{ color: 'var(--text-primary)' }}>{selectedFile.name}</p>
                          <p className="small text-muted mb-0">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                      ) : (
                        <div>
                          <img src={filePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '1rem', borderRadius: '8px' }} />
                          <p className="mb-0 fw-bold" style={{ color: 'var(--text-primary)' }}>{selectedFile.name}</p>
                        </div>
                      )
                    ) : (
                      <div>
                        <FaUpload size={40} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }} />
                        <p className="mb-1 fw-bold" style={{ color: 'var(--text-primary)' }}>Click to upload or drag and drop</p>
                        <p className="small text-muted mb-0">JPEG, PNG, WEBP or PDF (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                  <Form.Control 
                    type="file" 
                    id="formFile"
                    accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                  />
                </Form.Group>

                {isSubmitting && uploadProgress > 0 && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="small fw-bold" style={{ color: 'var(--text-primary)' }}>Uploading...</span>
                      <span className="small fw-bold text-success">{uploadProgress}%</span>
                    </div>
                    <ProgressBar now={uploadProgress} variant="success" className="rounded-pill" style={{ height: '8px' }} />
                  </div>
                )}

                <Button 
                  variant="success" 
                  type="submit"
                  size="lg" 
                  className="btn-premium w-100 fw-bold py-3 mt-2"
                  disabled={isSubmitting || !selectedFile}
                >
                  {isSubmitting ? (
                    <><Spinner animation="border" size="sm" className="me-2" /> Submitting...</>
                  ) : (
                    'Submit for Verification'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Verification;
