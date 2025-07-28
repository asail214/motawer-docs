import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth, useReduxProgress } from '../hooks/useRedux';
import ProgressTracker from '../components/common/ProgressTracker';
import AchievementNotification, { useAchievements } from '../components/common/AchievementNotification';

const ReactIntroduction = () => {
  const { isAuthenticated, addPoints, addUserAchievement } = useAuth();
  const { markCompleted, isCompleted } = useReduxProgress();
  const { currentAchievement, showAchievement, hideAchievement } = useAchievements();

  const sectionId = 'react-introduction';
  const sectionCompleted = isCompleted(sectionId);
  const nextSection = { path: '/environment-setup', title: 'إعداد بيئة التطوير' };
  const previousSection = { path: '/frontend-basics', title: 'أساسيات تطوير الواجهات' };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100 && !sectionCompleted) {
        markCompleted(sectionId);
        
        // إضافة إنجاز للمسجلين
        if (isAuthenticated) {
          addPoints(10);
          showAchievement('متعلم React المبتدئ!', 10);
          addUserAchievement('متعلم React المبتدئ');
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
            <h1 className="section-title">مقدمة عن React</h1>
            <p className="lead">تعرف على React وتاريخها ولماذا أصبحت الخيار الأول لتطوير الواجهات</p>
            
            {/* مؤشر إكمال الدرس */}
            {sectionCompleted && (
              <Alert variant="success" className="mt-3">
                <span className="material-icons me-2">check_circle</span>
                <strong>تم إكمال هذا الدرس!</strong>
                {isAuthenticated && ' +10 نقاط تمت إضافتها لحسابك.'}
              </Alert>
            )}
          </Col>
        </Row>

        <Row>
        <Col lg={9} md={8}>
            {/* What is React */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">ما هي React؟</h3>
                <p>
                  React هي مكتبة JavaScript مفتوحة المصدر طورتها شركة Facebook (Meta الآن) في عام 2013. 
                  تُستخدم لبناء واجهات المستخدم، خاصة للتطبيقات التي تتطلب تحديثات مستمرة للبيانات.
                </p>

                <div className="highlight-box p-3 mb-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: 'var(--primary-color)'}}>💡 نقطة مهمة</h6>
                  <p className="mb-0">React هي مكتبة وليست إطار عمل كامل - هذا يعني أنها تركز على شيء واحد وتفعله بشكل ممتاز: بناء واجهات المستخدم.</p>
                </div>

                <h5 style={{color: 'var(--primary-color)'}}>الخصائص الرئيسية لـ React:</h5>
                <Row>
                  <Col md={6}>
                    <ul>
                      <li><strong>Declarative:</strong> تصف كيف تريد أن تبدو الواجهة</li>
                      <li><strong>Component-Based:</strong> تقسم الواجهة إلى قطع صغيرة</li>
                      <li><strong>Learn Once, Write Anywhere:</strong> يمكن استخدامها في الويب والموبايل</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul>
                      <li><strong>Virtual DOM:</strong> تحسين الأداء عبر DOM وهمي</li>
                      <li><strong>JSX:</strong> كتابة HTML داخل JavaScript</li>
                      <li><strong>One-way Data Flow:</strong> تدفق البيانات في اتجاه واحد</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* React History */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">تاريخ وتطور React</h3>
                <div className="timeline">
                  <div className="timeline-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="info" className="me-2">2013</Badge>
                      <h6 className="mb-0">البداية</h6>
                    </div>
                    <p>إطلاق React من قبل Jordan Walke في Facebook لحل مشاكل تحديث البيانات في التطبيقات الكبيرة</p>
                  </div>
                  
                  <div className="timeline-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="info" className="me-2">2015</Badge>
                      <h6 className="mb-0">React Native</h6>
                    </div>
                    <p>إطلاق React Native لتطوير تطبيقات الموبايل باستخدام نفس مفاهيم React</p>
                  </div>
                  
                  <div className="timeline-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="info" className="me-2">2019</Badge>
                      <h6 className="mb-0">React Hooks</h6>
                    </div>
                    <p>تقديم Hooks التي غيرت طريقة كتابة المكونات وإدارة الحالة</p>
                  </div>
                  
                  <div className="timeline-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">2024</Badge>
                      <h6 className="mb-0">React 19</h6>
                    </div>
                    <p>أحدث إصدار مع تحسينات في الأداء ومميزات جديدة مثل Server Components</p>
                  </div>
                </div>

                {/* رسالة تشجيعية للمسجلين */}
                {isAuthenticated && (
                  <Alert variant="primary" className="mt-3">
                    <span className="material-icons me-2">history</span>
                    <strong>معلومة مثيرة:</strong> React تطورت كثيراً منذ 2013، وما ستتعلمه هنا هو أحدث الممارسات!
                  </Alert>
                )}
              </Card.Body>
            </Card>

            {/* React vs Other Frameworks */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">React مقارنة بالإطارات الأخرى</h3>
                <Row>
                  <Col md={4}>
                    <div className="framework-card p-3 mb-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                      <h5 style={{color: 'var(--primary-color)'}}>React</h5>
                      <ul className="small">
                        <li>مكتبة مرنة</li>
                        <li>مجتمع ضخم</li>
                        <li>Facebook/Meta</li>
                        <li>JSX</li>
                        <li>Virtual DOM</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="framework-card p-3 mb-3" style={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px'}}>
                      <h5 style={{color: 'var(--text-secondary)'}}>Vue.js</h5>
                      <ul className="small">
                        <li>إطار تدريجي</li>
                        <li>سهل التعلم</li>
                        <li>Evan You</li>
                        <li>Template-based</li>
                        <li>Virtual DOM</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="framework-card p-3 mb-3" style={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px'}}>
                      <h5 style={{color: 'var(--text-secondary)'}}>Angular</h5>
                      <ul className="small">
                        <li>إطار كامل</li>
                        <li>منحنى تعلم حاد</li>
                        <li>Google</li>
                        <li>TypeScript</li>
                        <li>Real DOM</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <div className="mt-4">
                  <h6 style={{color: 'var(--primary-color)'}}>لماذا نختار React؟</h6>
                  <ul>
                    <li><strong>مرونة:</strong> يمكن دمجها مع أي مشروع موجود</li>
                    <li><strong>فرص العمل:</strong> الأكثر طلباً في سوق العمل</li>
                    <li><strong>التطوير السريع:</strong> مكونات قابلة لإعادة الاستخدام</li>
                    <li><strong>الدعم:</strong> دعم مستمر من Meta ومجتمع كبير</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* React 19 Features */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">مميزات React 19 الجديدة</h3>
                <p>React 19 جلبت تحسينات مهمة تجعل التطوير أسهل وأسرع:</p>
                
                <Row>
                  <Col md={6}>
                    <div className="feature-item mb-3">
                      <h6><span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>rocket_launch</span>React Compiler</h6>
                      <p>تحسين تلقائي للأداء بدون الحاجة لـ useMemo و useCallback</p>
                    </div>
                    
                    <div className="feature-item mb-3">
                      <h6><span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>cloud</span>Server Components</h6>
                      <p>تشغيل بعض المكونات على الخادم لتحسين الأداء</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="feature-item mb-3">
                      <h6><span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>sync</span>Actions</h6>
                      <p>طريقة جديدة للتعامل مع النماذج والبيانات</p>
                    </div>
                    
                    <div className="feature-item mb-3">
                      <h6><span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>speed</span>Concurrent Features</h6>
                      <p>تحديثات أكثر سلاسة وتجاوب أفضل</p>
                    </div>
                  </Col>
                </Row>

                <div className="alert alert-success">
                  <strong>رائع!</strong> سنتعلم هذه المميزات خطوة بخطوة في الدروس القادمة.
                </div>
              </Card.Body>
            </Card>

            {/* Simple React Example */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">مثال بسيط على React</h3>
                <p>دعنا نرى مثالاً بسيطاً لمكون React:</p>
                
                <CodeBlock>
{`// مثال بسيط لمكون React
function Welcome() {
  return (
    <div>
      <h1>مرحباً بك في عالم React!</h1>
      <p>هذا أول مكون لك</p>
    </div>
  );
}

// استخدام المكون
<Welcome />`}
                </CodeBlock>

                <div className="mt-3">
                  <h6 style={{color: 'var(--primary-color)'}}>لاحظ في هذا المثال:</h6>
                  <ul>
                    <li><code>function Welcome()</code> - تعريف مكون كدالة</li>
                    <li><code>return</code> - إرجاع JSX (HTML داخل JavaScript)</li>
                    <li><code>&lt;Welcome /&gt;</code> - استخدام المكون كعنصر HTML</li>
                  </ul>
                </div>

                {/* تشجيع للمسجلين */}
                {isAuthenticated && (
                  <Alert variant="success" className="mt-3">
                    <span className="material-icons me-2">code</span>
                    <strong>ممتاز!</strong> الآن أنت تعرف كيف يبدو مكون React. في الدروس القادمة ستبني مكونات أكثر تعقيداً!
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
                <h4>محتويات هذا الدرس</h4>
                <ul className="list-unstyled">
                  <li><a href="#what-is-react" className="text-decoration-none">ما هي React؟</a></li>
                  <li><a href="#history" className="text-decoration-none">تاريخ React</a></li>
                  <li><a href="#comparison" className="text-decoration-none">مقارنة مع الإطارات الأخرى</a></li>
                  <li><a href="#react19" className="text-decoration-none">مميزات React 19</a></li>
                  <li><a href="#example" className="text-decoration-none">مثال بسيط</a></li>
                </ul>
              </div>

              <div className="feature-card">
                <h4>📊 إحصائيات مثيرة</h4>
                <div className="stats-item mb-2">
                  <strong style={{color: 'var(--primary-color)'}}>40.5%</strong> من المطورين يستخدمون React
                </div>
                <div className="stats-item mb-2">
                  <strong style={{color: 'var(--primary-color)'}}>200k+</strong> نجمة على GitHub
                </div>
                <div className="stats-item mb-2">
                  <strong style={{color: 'var(--primary-color)'}}>10M+</strong> تنزيل أسبوعي على npm
                </div>
              </div>

              <div className="feature-card">
                <h4>💼 شركات تستخدم React</h4>
                <div className="companies">
                  <Badge bg="secondary" className="me-2 mb-2">Facebook</Badge>
                  <Badge bg="secondary" className="me-2 mb-2">Netflix</Badge>
                  <Badge bg="secondary" className="me-2 mb-2">Instagram</Badge>
                  <Badge bg="secondary" className="me-2 mb-2">Uber</Badge>
                  <Badge bg="secondary" className="me-2 mb-2">WhatsApp</Badge>
                  <Badge bg="secondary" className="me-2 mb-2">Airbnb</Badge>
                </div>
              </div>

              {/* مكافآت للمسجلين */}
              {isAuthenticated && (
                <div className="feature-card">
                  <h4>🎁 مكافآت هذا الدرس</h4>
                  <div className="rewards">
                    <div className="reward-item mb-2">
                      <span className="material-icons me-2" style={{color: '#ffc107'}}>stars</span>
                      10 نقاط عند الإكمال
                    </div>
                    <div className="reward-item mb-2">
                      <span className="material-icons me-2" style={{color: '#28a745'}}>emoji_events</span>
                      إنجاز "متعلم React المبتدئ"
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

export default ReactIntroduction;