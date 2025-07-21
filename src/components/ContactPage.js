import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactCard = ({ icon, title, description }) => (
  <Col lg={4} className="mb-4">
    <div className="feature-card text-center">
      <div className="feature-icon material-icons">{icon}</div>
      <h4>{title}</h4>
      <p className="text-muted">{description}</p>
    </div>
  </Col>
);

const FAQItem = ({ question, answer }) => (
  <div className="mb-3">
    <h5 style={{color: 'var(--primary-color)'}}>{question}</h5>
    <p className="mb-3">{answer}</p>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      setAlertType('danger');
      setAlertMessage('يرجى ملء جميع الحقول المطلوبة');
      setShowAlert(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertType('danger');
      setAlertMessage('يرجى إدخال بريد إلكتروني صحيح');
      setShowAlert(true);
      return;
    }

    // Simulate form submission
    setAlertType('success');
    setAlertMessage('شكراً لك! تم إرسال رسالتك بنجاح. سنقوم بالرد عليك قريباً.');
    setShowAlert(true);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div className="section">
      <Container className="py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="section-title">تواصل معنا</h1>
            <p className="text-muted">نحن هنا للمساعدة والإجابة على استفساراتك</p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <div className="contact-form">
              {showAlert && (
                <Alert 
                  variant={alertType} 
                  onClose={() => setShowAlert(false)} 
                  dismissible
                  className="mb-4"
                >
                  {alertMessage}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>الاسم الأول *</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>الاسم الأخير *</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                
                <div className="mb-3">
                  <Form.Label>البريد الإلكتروني *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <Form.Label>الموضوع *</Form.Label>
                  <Form.Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="general">استفسار عام</option>
                    <option value="technical">مساعدة تقنية</option>
                    <option value="suggestion">اقتراح</option>
                    <option value="bug">الإبلاغ عن خطأ</option>
                    <option value="partnership">شراكة</option>
                    <option value="other">أخرى</option>
                  </Form.Select>
                </div>
                
                <div className="mb-3">
                  <Form.Label>الرسالة *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="text-center">
                  <Button type="submit" className="btn btn-primary btn-lg">
                    <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                      send
                    </span>
                    إرسال الرسالة
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <ContactCard
            icon="email"
            title="البريد الإلكتروني"
            description="info@motawer.dev"
          />
          <ContactCard
            icon="forum"
            title="المجتمع"
            description="انضم لمجتمعنا على Discord"
          />
          <ContactCard
            icon="help"
            title="الدعم الفني"
            description="متوفر 24/7 للمساعدة"
          />
        </Row>

        {/* Contact Information */}
        <Row className="mt-5">
          <Col lg={6}>
            <div className="feature-card">
              <h3>معلومات التواصل</h3>
              <div className="d-flex align-items-center mb-3">
                <span className="material-icons text-primary me-3">location_on</span>
                <div>
                  <strong>العنوان:</strong><br />
                  الرياض، المملكة العربية السعودية
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span className="material-icons text-primary me-3">schedule</span>
                <div>
                  <strong>ساعات العمل:</strong><br />
                  الأحد - الخميس: 9:00 ص - 5:00 م
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="material-icons text-primary me-3">language</span>
                <div>
                  <strong>اللغات:</strong><br />
                  العربية، الإنجليزية
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="feature-card">
              <h3>وسائل التواصل الاجتماعي</h3>
              <div className="social-links">
                <div className="d-flex align-items-center mb-3">
                  <span className="material-icons text-primary me-3">link</span>
                  <a href="#" className="text-decoration-none">تويتر: @MotawerDev</a>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="material-icons text-primary me-3">code</span>
                  <a href="#" className="text-decoration-none">GitHub: /motawer-dev</a>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="material-icons text-primary me-3">play_circle</span>
                  <a href="#" className="text-decoration-none">يوتيوب: قناة مطور</a>
                </div>
                <div className="d-flex align-items-center">
                  <span className="material-icons text-primary me-3">chat</span>
                  <a href="#" className="text-decoration-none">Discord: مجتمع مطور</a>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="mt-5">
          <Col xs={12}>
            <div className="feature-card">
              <h3 className="text-center mb-4">الأسئلة الشائعة</h3>
              <Row>
                <Col md={6}>
                  <FAQItem
                    question="هل المحتوى مجاني؟"
                    answer="نعم، جميع المحتوى الأساسي مجاني ومتاح للجميع. قد نضيف محتوى متقدم مدفوع في المستقبل."
                  />
                  
                  <FAQItem
                    question="هل يناسب المبتدئين؟"
                    answer="نعم، المحتوى مصمم خصيصاً للمبتدئين مع الشرح المفصل والأمثلة العملية."
                  />
                  
                  <FAQItem
                    question="كم من الوقت أحتاج لتعلم React؟"
                    answer="يعتمد على خلفيتك في البرمجة، لكن عادة 2-3 أسابيع للأساسيات و 2-3 أشهر للإتقان."
                  />
                </Col>
                <Col md={6}>
                  <FAQItem
                    question="هل هناك شهادات؟"
                    answer="نعمل على إضافة نظام الشهادات قريباً. ستكون متاحة للمتعلمين الذين يكملون الدورات."
                  />
                  
                  <FAQItem
                    question="هل يمكنني المساهمة في المحتوى؟"
                    answer="نعم! نرحب بالمساهمات من المجتمع. تواصل معنا لمعرفة كيف يمكنك المساعدة."
                  />
                  
                  <FAQItem
                    question="متى يتم تحديث المحتوى؟"
                    answer="نحدث المحتوى بانتظام، عادة أسبوعياً، لإضافة دروس جديدة ومواكبة أحدث إصدارات React."
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;