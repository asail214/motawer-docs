import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'رسالة من موقع مطور');
    const body = encodeURIComponent(
      `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\n\nالرسالة:\n${formData.message}`
    );
    const mailtoLink = `mailto:asail.m.h.99@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    setShowAlert(true);
    
    // Hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div className="section">
      <Container className="py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="section-title">تواصل معي</h1>
            <p className="lead">أسعد بالتواصل معك والإجابة على استفساراتك</p>
          </Col>
        </Row>

        <Row>
          {/* Contact Information */}
          <Col lg={6} className="mb-5">
            <Card className="feature-card h-100">
              <Card.Body>
                <h3 className="tutorial-title mb-4">معلومات التواصل</h3>
                
                {/* Personal Introduction */}
                <div className="contact-intro mb-4">
                  <h5 style={{color: 'var(--primary-color)'}}>أسيل الشكيلي</h5>
                  <p className="text-muted">
                    مصمم UI/UX ومطور Front-End | متدرب Full-Stack Developer
                  </p>
                  <p>
                    مطور حر ومتدرب في نفس الوقت، متخصص في تطوير الواجهات الأمامية وتصميم تجربة المستخدم. 
                    أحب مشاركة المعرفة وتعليم البرمجة باللغة العربية لمساعدة المطورين العرب على التطور في مجال التقنية.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="contact-methods">
                  <div className="contact-item mb-3">
                    <div className="d-flex align-items-center">
                      <span className="material-icons me-3" style={{color: 'var(--primary-color)'}}>
                        email
                      </span>
                      <div>
                        <strong>البريد الإلكتروني</strong>
                        <br />
                        <a 
                          href="mailto:asail.m.h.99@gmail.com" 
                          className="text-decoration-none"
                          style={{color: 'var(--primary-color)'}}
                        >
                          asail.m.h.99@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item mb-3">
                    <div className="d-flex align-items-center">
                      <span className="material-icons me-3" style={{color: 'var(--primary-color)'}}>
                        code
                      </span>
                      <div>
                        <strong>GitHub</strong>
                        <br />
                        <a 
                          href="https://github.com/asail214" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                          style={{color: 'var(--primary-color)'}}
                        >
                          github.com/asail214
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item mb-3">
                    <div className="d-flex align-items-center">
                      <span className="material-icons me-3" style={{color: 'var(--primary-color)'}}>
                        work
                      </span>
                      <div>
                        <strong>LinkedIn</strong>
                        <br />
                        <a 
                          href="https://www.linkedin.com/in/asail-alshukaili-080226298" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                          style={{color: 'var(--primary-color)'}}
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item mb-4">
                    <div className="d-flex align-items-center">
                      <span className="material-icons me-3" style={{color: 'var(--primary-color)'}}>
                        camera_alt
                      </span>
                      <div>
                        <strong>Instagram</strong>
                        <br />
                        <a 
                          href="https://instagram.com/asail214" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                          style={{color: 'var(--primary-color)'}}
                        >
                          @asail214
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <Alert variant="info" className="mt-4">
                  <Alert.Heading>الوضع الحالي</Alert.Heading>
                  <p className="mb-0">
                    📚 متدرب في برنامج Makeen Bootcamp لتطوير Full-Stack<br />
                    💼 متاح للعمل الحر في مشاريع UI/UX و Front-End Development<br />
                    🎓 طالب علوم حاسوب في جامعة السلطان قابوس
                  </p>
                </Alert>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={6}>
            <Card className="contact-form">
              <Card.Body>
                <h3 className="tutorial-title mb-4">أرسل رسالة</h3>
                
                {showAlert && (
                  <Alert variant="success" className="mb-4">
                    تم فتح تطبيق البريد الإلكتروني. يرجى إرسال الرسالة من هناك.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>الاسم *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="اسمك الكامل"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>البريد الإلكتروني *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="example@email.com"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>الموضوع</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="موضوع الرسالة"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>الرسالة *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100"
                  >
                    <span className="material-icons me-2">send</span>
                    إرسال الرسالة
                  </Button>
                </Form>

                <div className="form-note mt-3">
                  <small className="text-muted">
                    * الحقول المطلوبة. سيتم فتح تطبيق البريد الإلكتروني الافتراضي لإرسال الرسالة.
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="mt-5">
          <Col xs={12}>
            <h2 className="section-title text-center mb-5">أسئلة شائعة</h2>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="mb-4">
            <Card className="feature-card">
              <Card.Body>
                <h5 style={{color: 'var(--primary-color)'}}>هل يمكنني طلب مساعدة في مشروع React؟</h5>
                <p>
                  بالطبع! أسعد بمساعدة المطورين في مشاريع React، سواء كانت أسئلة تقنية أو مراجعة كود. 
                  تواصل معي عبر البريد الإلكتروني مع تفاصيل مشكلتك.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="feature-card">
              <Card.Body>
                <h5 style={{color: 'var(--primary-color)'}}>هل تقدم خدمات تطوير مواقع؟</h5>
                <p>
                  نعم، أقدم خدمات تطوير المواقع كمطور حر، خاصة في مجال UI/UX وFront-End Development. 
                  يمكنك التواصل معي لمناقشة مشروعك ومتطلباتك.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="feature-card">
              <Card.Body>
                <h5 style={{color: 'var(--primary-color)'}}>كم من الوقت تستغرق الرد على الرسائل؟</h5>
                <p>
                  أحاول الرد على جميع الرسائل خلال 24-48 ساعة. في حالة الاستفسارات التقنية البسيطة، 
                  قد أرد بشكل أسرع.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card className="feature-card">
              <Card.Body>
                <h5 style={{color: 'var(--primary-color)'}}>هل تقدم جلسات تدريب أو ورش عمل؟</h5>
                <p>
                  أقدم جلسات تدريب في مجال React وتطوير الواجهات. تواصل معي لمناقشة 
                  إمكانية تنظيم ورشة عمل أو جلسة تدريب مخصصة لفريقك أو مجموعتك.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;