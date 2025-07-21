import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const ReactIntroduction = () => {
  const { markAsCompleted, getProgress, getNextSection, getPreviousSection } = useProgress();
  const nextSection = getNextSection('react-introduction');
  const previousSection = getPreviousSection('react-introduction');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        markAsCompleted('react-introduction');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [markAsCompleted]);

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
            <h1 className="section-title">مقدمة عن React</h1>
            <p className="lead">تعرف على React وتاريخها ولماذا أصبحت الخيار الأول لتطوير الواجهات</p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
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
          <Col lg={4}>
            <div className="feature-card sticky-top" style={{top: '100px'}}>
              <h4>محتويات هذا الدرس</h4>
              <ul className="list-unstyled">
                <li><a href="#what-is-react" className="text-decoration-none">ما هي React؟</a></li>
                <li><a href="#history" className="text-decoration-none">تاريخ React</a></li>
                <li><a href="#comparison" className="text-decoration-none">مقارنة مع الإطارات الأخرى</a></li>
                <li><a href="#react19" className="text-decoration-none">مميزات React 19</a></li>
                <li><a href="#example" className="text-decoration-none">مثال بسيط</a></li>
              </ul>
            </div>

            <div className="feature-card mt-4">
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

            <div className="feature-card mt-4">
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReactIntroduction;