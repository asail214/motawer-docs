import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth, useReduxProgress } from '../hooks/useRedux';
import ProgressTracker from '../components/common/ProgressTracker';
import AchievementNotification, { useAchievements } from '../components/common/AchievementNotification';

const EnvironmentSetup = () => {
  const { isAuthenticated, addPoints, addUserAchievement } = useAuth();
  const { markCompleted, isCompleted } = useReduxProgress();
  const { currentAchievement, showAchievement, hideAchievement } = useAchievements();

  const sectionId = 'environment-setup';
  const sectionCompleted = isCompleted(sectionId);
  const nextSection = { path: '/core-concepts', title: 'المفاهيم الأساسية' };
  const previousSection = { path: '/react-introduction', title: 'مقدمة عن React' };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100 && !sectionCompleted) {
        markCompleted(sectionId);
        
        // إضافة إنجاز للمسجلين
        if (isAuthenticated) {
          addPoints(15); // نقاط أكثر لأن إعداد البيئة مهم
          showAchievement('مطور جاهز للعمل!', 15);
          addUserAchievement('مطور جاهز للعمل');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [markCompleted, sectionId, sectionCompleted, isAuthenticated, addPoints, showAchievement, addUserAchievement]);

  const CodeBlock = ({ children }) => (
    <div className="code-block">
      <code>{children}</code>
    </div>
  );

  return (
    <div className="section">
      <Container className="py-5">
        {/* Progress Bar */}
        <Row className="mb-4">
          <Col>
            <ProgressTracker />
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="section-title">إعداد بيئة التطوير</h1>
            <p className="lead">تجهيز حاسوبك للبدء في تطوير تطبيقات React</p>
            
            {/* مؤشر إكمال الدرس */}
            {sectionCompleted && (
              <Alert variant="success" className="mt-3">
                <span className="material-icons me-2">check_circle</span>
                <strong>تم إكمال هذا الدرس!</strong>
                {isAuthenticated && ' +15 نقطة تمت إضافتها لحسابك.'}
              </Alert>
            )}
          </Col>
        </Row>

        <Row>
        <Col lg={9} md={8}>
            {/* System Requirements */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">متطلبات النظام</h3>
                <p>قبل البدء، تأكد من توفر المتطلبات التالية:</p>
                
                <Row>
                  <Col md={6}>
                    <h5 style={{color: 'var(--primary-color)'}}>💻 Windows</h5>
                    <ul>
                      <li>Windows 10 أو أحدث</li>
                      <li>ذاكرة وصول عشوائي: 4GB على الأقل (8GB مفضل)</li>
                      <li>مساحة خالية: 2GB على الأقل</li>
                      <li>اتصال إنترنت مستقر</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h5 style={{color: 'var(--primary-color)'}}>🍎 macOS</h5>
                    <ul>
                      <li>macOS 10.15 أو أحدث</li>
                      <li>ذاكرة وصول عشوائي: 4GB على الأقل (8GB مفضل)</li>
                      <li>مساحة خالية: 2GB على الأقل</li>
                      <li>اتصال إنترنت مستقر</li>
                    </ul>
                  </Col>
                </Row>

                {/* رسالة تشجيعية للمسجلين */}
                {isAuthenticated && (
                  <Alert variant="warning" className="mt-3">
                    <span className="material-icons me-2">support_agent</span>
                    <strong>تذكر:</strong> إذا واجهت أي مشكلة، لا تتردد في طلب المساعدة. كل مطور مر بهذه التحديات!
                  </Alert>
                )}
              </Card.Body>
            </Card>

            {/* Navigation */}
            <div className="navigation-section d-flex justify-content-between align-items-center">
              <div>
                {previousSection && (
                  <Link to={previousSection.path} className="btn btn-outline-light">
                    <span className="material-icons me-2">arrow_forward</span>
                    {previousSection.title}
                  </Link>
                )}
              </div>
              <div>
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
          <Col lg={3} md={4}>
            <div className="sidebar-container">
              <div className="feature-card">
                <h4>قائمة التحقق</h4>
                <div className="checklist">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="nodejs"/>
                    <label className="form-check-label" htmlFor="nodejs">
                      تثبيت Node.js
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="vscode"/>
                    <label className="form-check-label" htmlFor="vscode">
                      تثبيت VS Code
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="extensions"/>
                    <label className="form-check-label" htmlFor="extensions">
                      تثبيت الإضافات
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="project"/>
                    <label className="form-check-label" htmlFor="project">
                      إنشاء أول مشروع
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="run"/>
                    <label className="form-check-label" htmlFor="run">
                      تشغيل المشروع بنجاح
                    </label>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <h4>⚡ نصائح سريعة</h4>
                <div className="tip-item mb-2">
                  <strong>Ctrl + C:</strong> لإيقاف الخادم
                </div>
                <div className="tip-item mb-2">
                  <strong>npm start:</strong> لتشغيل المشروع
                </div>
                <div className="tip-item mb-2">
                  <strong>Ctrl + `:</strong> فتح Terminal في VS Code
                </div>
                <div className="tip-item mb-2">
                  <strong>Ctrl + Shift + P:</strong> قائمة الأوامر
                </div>
              </div>

              <div className="feature-card">
                <h4>📚 روابط مفيدة</h4>
                <ul className="list-unstyled">
                  <li><a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-decoration-none">Node.js الموقع الرسمي</a></li>
                  <li><a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">VS Code الموقع الرسمي</a></li>
                  <li><a href="https://create-react-app.dev" target="_blank" rel="noopener noreferrer" className="text-decoration-none">Create React App الدليل</a></li>
                </ul>
              </div>

              {/* مكافآت للمسجلين */}
              {isAuthenticated && (
                <div className="feature-card">
                  <h4>🎁 مكافآت هذا الدرس</h4>
                  <div className="rewards">
                    <div className="reward-item mb-2">
                      <span className="material-icons me-2" style={{color: '#ffc107'}}>stars</span>
                      15 نقطة عند الإكمال
                    </div>
                    <div className="reward-item mb-2">
                      <span className="material-icons me-2" style={{color: '#28a745'}}>emoji_events</span>
                      إنجاز "مطور جاهز للعمل"
                    </div>
                    <div className="reward-item mb-2">
                      <span className="material-icons me-2" style={{color: '#17a2b8'}}>info</span>
                      نقاط إضافية لأهمية هذا الدرس
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* إشعار الإنجازات */}
        {currentAchievement && (
          <AchievementNotification
            achievement={currentAchievement.achievement}
            points={currentAchievement.points}
            show={currentAchievement.show}
            onClose={hideAchievement}
          />
        )}
      </Container>
    </div>
  );
};

export default EnvironmentSetup;