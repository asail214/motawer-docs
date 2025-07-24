import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const FrontendBasics = () => {
  const { markAsCompleted, getProgress, getNextSection } = useProgress();
  const nextSection = getNextSection('frontend-basics');

  useEffect(() => {
    // Mark as completed when user scrolls to bottom
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        markAsCompleted('frontend-basics');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [markAsCompleted]);

  return (
    <div className="section">
      <Container className="py-5">
        {/* Progress Bar */}
        <Row className="mb-4">
          <Col>
            <div className="progress-section">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">تقدم التعلم</h6>
                <small>{getProgress()}% مكتمل</small>
              </div>
              <ProgressBar 
                now={getProgress()} 
                variant="info" 
                style={{backgroundColor: 'var(--card-bg)'}}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="section-title">أساسيات تطوير الواجهات الأمامية</h1>
            <p className="lead">فهم أساسيات تطوير الواجهات الأمامية والدور الذي يلعبه React</p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* What is Frontend Development */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">ما هو تطوير الواجهات الأمامية؟</h3>
                <p>
                  تطوير الواجهات الأمامية (Frontend Development) هو عملية إنشاء الجزء المرئي من المواقع والتطبيقات 
                  التي يتفاعل معها المستخدمون مباشرة. يشمل هذا:
                </p>
                <ul>
                  <li><strong>الواجهة المرئية:</strong> التصميم والألوان والخطوط</li>
                  <li><strong>التفاعل:</strong> الأزرار والنماذج والحركات</li>
                  <li><strong>تجربة المستخدم:</strong> سهولة الاستخدام والتنقل</li>
                  <li><strong>الاستجابة:</strong> التكيف مع جميع أحجام الشاشات</li>
                </ul>
              </Card.Body>
            </Card>

            {/* Technologies Used */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">التقنيات المستخدمة في تطوير الواجهات</h3>
                <Row>
                  <Col md={6}>
                    <h5 style={{color: 'var(--primary-color)'}}>التقنيات الأساسية</h5>
                    <div className="tech-item mb-3">
                      <h6><span className="material-icons me-2">code</span>HTML</h6>
                      <p>هيكل ومحتوى الصفحة - الأساس لأي موقع ويب</p>
                    </div>
                    <div className="tech-item mb-3">
                      <h6><span className="material-icons me-2">palette</span>CSS</h6>
                      <p>تنسيق وتصميم الصفحة - الألوان والخطوط والتخطيط</p>
                    </div>
                    <div className="tech-item mb-3">
                      <h6><span className="material-icons me-2">flash_on</span>JavaScript</h6>
                      <p>التفاعل والحركة - جعل الصفحة تتفاعل مع المستخدم</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h5 style={{color: 'var(--primary-color)'}}>الأدوات والإطارات الحديثة</h5>
                    <div className="tech-item mb-3">
                      <h6><span className="material-icons me-2">widgets</span>React</h6>
                      <p>مكتبة JavaScript لبناء واجهات المستخدم</p>
                    </div>
                    <div className="tech-item mb-3">
                      <h6><span className="material-icons me-2">build</span>أدوات البناء</h6>
                      <p>Webpack, Vite, Create React App</p>
                    </div>
                    <div className="tech-item mb-3">
                      <h6><span className="material-icons me-2">style</span>CSS Frameworks</h6>
                      <p>Bootstrap, Tailwind CSS, Material-UI</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Why React */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">لماذا React في تطوير الواجهات الحديثة؟</h3>
                <p>React أحدثت ثورة في تطوير الواجهات الأمامية لعدة أسباب:</p>
                
                <Row>
                  <Col md={6}>
                    <div className="advantage-item mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                          speed
                        </span>
                        <h6 className="mb-0">أداء سريع</h6>
                      </div>
                      <p>Virtual DOM يحسن من سرعة التحديث والأداء</p>
                    </div>
                    
                    <div className="advantage-item mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                          extension
                        </span>
                        <h6 className="mb-0">مكونات قابلة لإعادة الاستخدام</h6>
                      </div>
                      <p>كتابة الكود مرة واحدة واستخدامه في عدة أماكن</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="advantage-item mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                          group
                        </span>
                        <h6 className="mb-0">مجتمع كبير</h6>
                      </div>
                      <p>دعم واسع من Facebook ومجتمع المطورين</p>
                    </div>
                    
                    <div className="advantage-item mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                          school
                        </span>
                        <h6 className="mb-0">سهولة التعلم</h6>
                      </div>
                      <p>منحنى تعلم معقول للمطورين الذين يعرفون JavaScript</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Frontend vs Backend */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الفرق بين Frontend و Backend</h3>
                <Row>
                  <Col md={6}>
                    <div className="comparison-card p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                      <h5 style={{color: 'var(--primary-color)'}}>Frontend (الواجهة الأمامية)</h5>
                      <ul>
                        <li>ما يراه المستخدم</li>
                        <li>يعمل في متصفح الويب</li>
                        <li>HTML, CSS, JavaScript</li>
                        <li>تصميم وتجربة مستخدم</li>
                        <li>تفاعل مباشر مع المستخدم</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="comparison-card p-3" style={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px'}}>
                      <h5 style={{color: 'var(--text-secondary)'}}>Backend (الواجهة الخلفية)</h5>
                      <ul>
                        <li>ما لا يراه المستخدم</li>
                        <li>يعمل على الخادم</li>
                        <li>Node.js, Python, Java, PHP</li>
                        <li>قواعد البيانات والمنطق</li>
                        <li>معالجة البيانات والأمان</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Navigation */}
            <div className="navigation-section d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">الدرس التالي</small>
                {nextSection && (
                  <Link to={nextSection.path} className="btn btn-primary">
                    {nextSection.title}
                    <span className="material-icons ms-2">arrow_back</span>
                  </Link>
                )}
              </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <div className="feature-card sticky-top" style={{top: '100px'}}>
              <h4>محتويات هذا الدرس</h4>
              <ul className="list-unstyled">
                <li><a href="#what-is-frontend" className="text-decoration-none">ما هو تطوير الواجهات؟</a></li>
                <li><a href="#technologies" className="text-decoration-none">التقنيات المستخدمة</a></li>
                <li><a href="#why-react" className="text-decoration-none">لماذا React؟</a></li>
                <li><a href="#frontend-vs-backend" className="text-decoration-none">Frontend vs Backend</a></li>
              </ul>
            </div>

            <div className="feature-card mt-4">
              <h4>نصائح للمبتدئين</h4>
              <div className="alert alert-info">
                <strong>نصيحة:</strong> لا تقلق إذا بدت المفاهيم معقدة في البداية. التطوير مهارة تتحسن مع الوقت والممارسة!
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FrontendBasics;