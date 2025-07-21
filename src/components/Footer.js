import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <h5 style={{color: 'var(--primary-color)'}}>مطور</h5>
            <p className="text-muted">
              منصة تعلم React باللغة العربية للمطورين العرب. 
              نسعى لجعل تعلم البرمجة أكثر سهولة ووضوحاً.
            </p>
            <div className="social-links">
              <a href="#" className="text-decoration-none me-3" title="فيسبوك">
                <span className="material-icons" style={{color: 'var(--primary-color)'}}>facebook</span>
              </a>
              <a href="#" className="text-decoration-none me-3" title="تويتر">
                <span className="material-icons" style={{color: 'var(--primary-color)'}}>alternate_email</span>
              </a>
              <a href="#" className="text-decoration-none me-3" title="GitHub">
                <span className="material-icons" style={{color: 'var(--primary-color)'}}>code</span>
              </a>
              <a href="#" className="text-decoration-none" title="يوتيوب">
                <span className="material-icons" style={{color: 'var(--primary-color)'}}>play_circle</span>
              </a>
            </div>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6>التعلم</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/home" className="text-decoration-none text-muted">
                  الأساسيات
                </Link>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">المتقدم</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">المشاريع</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">التحديات</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6>الموارد</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-muted">الدروس</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">الأمثلة</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">المرجع السريع</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">أدوات التطوير</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6>المجتمع</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-muted">المنتدى</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">Discord</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">GitHub</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">المساهمة</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={2} className="mb-4">
            <h6>الدعم</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-muted">المساعدة</a>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-muted">
                  التواصل
                </Link>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">الإبلاغ عن خطأ</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted">سياسة الخصوصية</a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr style={{borderColor: 'var(--border-color)'}} />
        
        <Row>
          <Col md={6} className="mb-3">
            <p className="text-muted mb-0">
              &copy; 2025 مطور. جميع الحقوق محفوظة.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-muted mb-0">
              مبني بـ <span style={{color: '#e74c3c'}}>❤️</span> للمطورين العرب
            </p>
          </Col>
        </Row>
        
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <small className="text-muted">
              هذا المشروع مفتوح المصدر • 
              <a href="#" className="text-decoration-none mx-2" style={{color: 'var(--primary-color)'}}>
                شروط الاستخدام
              </a>
              • 
              <a href="#" className="text-decoration-none mx-2" style={{color: 'var(--primary-color)'}}>
                سياسة الخصوصية
              </a>
            </small>
          </Col>
        </Row>
        
        {/* Back to top button */}
        <div 
          className="position-fixed bottom-0 end-0 p-3" 
          style={{zIndex: 1000}}
        >
          <button
            className="btn btn-primary rounded-circle"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="العودة للأعلى"
            style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span className="material-icons">keyboard_arrow_up</span>
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;