import React from 'react';
import { Container, Row, Col, ProgressBar, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const ReactLogo = () => (
  <svg className="react-logo-hero" viewBox="-11.5 -10.23174 23 20.46348">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" style={{color: '#61dafb'}}/>
    <g stroke="currentColor" strokeWidth="1" fill="none" style={{color: '#61dafb'}}>
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const FeatureCard = ({ icon, title, description }) => (
  <Col lg={4} md={6} className="mb-4">
    <div className="feature-card text-center">
      <div className="feature-icon material-icons">{icon}</div>
      <h4>{title}</h4>
      <p className="text-muted">{description}</p>
    </div>
  </Col>
);

const LearningPathCard = ({ number, title, description, path, completed }) => (
  <Col lg={6} className="mb-4">
    <div className={`feature-card h-100 ${completed ? 'border-success' : ''}`}>
      <div className="d-flex align-items-center mb-3">
        <div 
          className={`rounded-circle d-flex align-items-center justify-content-center me-1`}
          style={{
            width: '40px', 
            height: '40px', 
            backgroundColor: completed ? '#28a745' : 'var(--primary-color)',
            color: completed ? 'white' : 'var(--darker-bg)',
            marginLeft: '1rem' 
          }}
        >
          {completed ? (
            <span className="material-icons">check</span>
          ) : (
            <strong>{number}</strong>
          )}
        </div>
        <h5 className="mb-0">{title}</h5>
      </div>
      <p className="text-muted mb-3">{description}</p>
      <Link to={path} className="btn btn-outline-primary">
        {completed ? 'مراجعة' : 'ابدأ'}
        <span className="material-icons ms-2" style={{verticalAlign: 'middle'}}>arrow_back</span>
      </Link>
    </div>
  </Col>
);

const LandingPage = () => {
  const { getProgress, isCompleted } = useProgress();
  const progress = getProgress();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        {/* Large React Logo Background */}
        <div className="hero-logo-container">
          <ReactLogo />
        </div>
        
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">مطور</h1>
                <p className="hero-subtitle">تعلم React باللغة العربية بطريقة سهلة ومبسطة</p>
                <p className="text-muted mb-4">
                  منصة شاملة لتعلم مكتبة React من الصفر حتى الاحتراف، مع أمثلة عملية وشرح مفصل باللغة العربية.
                  مناسب للمطورين العرب الذين يعرفون HTML وCSS وJavaScript.
                </p>
                

                <div className="hero-buttons">
                  <Link to="/frontend-basics" className="btn btn-primary btn-lg">
                    <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                      play_arrow
                    </span>
                    ابدأ التعلم الآن
                  </Link>
                  <Link to="/tutorial" className="btn btn-outline-light btn-lg">
                    <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                      menu_book
                    </span>
                    الدليل السريع
                  </Link>
                  {/* <Link to="/contact" className="btn btn-outline-light btn-lg">
                    <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                      person
                    </span>
                    تواصل معي
                  </Link> */}
                </div>

                                    {/* Progress Display */}
                {progress > 0 && (
                  <div className="progress-display mb-4 p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>تقدمك في التعلم</span>
                      <strong>{progress}%</strong>
                    </div>
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{width: `${progress}%`, backgroundColor: 'var(--primary-color)'}}
                      ></div>
                    </div>
                  </div>
                )}

              </div>
            </Col>
            <Col lg={6}>
              {/* This column is now empty since logo is positioned absolutely */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Learning Path Section */}
      <Container className="my-5 py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h2 className="section-title">رحلة التعلم خطوة بخطوة</h2>
            <p className="text-muted">مسار تعليمي مصمم خصيصاً للمطورين العرب</p>
          </Col>
        </Row>
        
        <Row>
          <LearningPathCard
            number="1"
            title="أساسيات تطوير الواجهات"
            description="تعرف على تطوير الواجهات الأمامية والتقنيات المستخدمة ودور React"
            path="/frontend-basics"
            completed={isCompleted('frontend-basics')}
          />
          
          <LearningPathCard
            number="2"
            title="مقدمة عن React"
            description="ما هي React؟ تاريخها ولماذا أصبحت الخيار الأول لتطوير الواجهات"
            path="/react-introduction"
            completed={isCompleted('react-introduction')}
          />
          
          <LearningPathCard
            number="3"
            title="إعداد بيئة التطوير"
            description="تثبيت Node.js وVS Code وإنشاء أول مشروع React"
            path="/environment-setup"
            completed={isCompleted('environment-setup')}
          />
          
          <LearningPathCard
            number="4"
            title="المفاهيم الأساسية"
            description="تعلم Components وJSX وProps وState وHooks"
            path="/core-concepts"
            completed={isCompleted('core-concepts')}
          />
          
          <LearningPathCard
            number="5"
            title="مشروع قائمة المهام"
            description="تطبيق عملي شامل يجمع كل ما تعلمته"
            path="/todo-project"
            completed={isCompleted('todo-project')}
          />
          
          <LearningPathCard
            number="6"
            title="الخطوات التالية"
            description="ماذا بعد؟ المواضيع المتقدمة والمسار المهني"
            path="/next-steps"
            completed={isCompleted('next-steps')}
          />
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="my-5 py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h2 className="section-title">لماذا مطور؟</h2>
            <p className="text-muted">تعلم React بطريقة عملية وسهلة</p>
          </Col>
        </Row>
        <Row>
          <FeatureCard
            icon="translate"
            title="باللغة العربية"
            description="جميع الشروحات والأمثلة مكتوبة باللغة العربية لفهم أفضل وأسهل"
          />
          <FeatureCard
            icon="code"
            title="أمثلة عملية"
            description="تعلم من خلال أمثلة حقيقية وتطبيقات عملية تساعدك على فهم المفاهيم"
          />
          <FeatureCard
            icon="school"
            title="للمبتدئين"
            description="مناسب للمبتدئين مع شرح مفصل لكل مفهوم من الأساسيات"
          />
          <FeatureCard
            icon="build"
            title="مشروع حقيقي"
            description="بناء تطبيق قائمة مهام كامل من الصفر خطوة بخطوة"
          />
          <FeatureCard
            icon="trending_up"
            title="مسار واضح"
            description="رحلة تعليمية منظمة تأخذك من المبتدئ إلى الجاهز للعمل"
          />
          <FeatureCard
            icon="support"
            title="دعم مستمر"
            description="إمكانية التواصل للاستفسارات والحصول على المساعدة"
          />
        </Row>
      </Container>

      {/* Target Audience Section */}
      <Container className="my-5 py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h2 className="section-title">هل هذا المحتوى مناسب لك؟</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <div className="feature-card h-100">
              <h4 style={{color: '#28a745'}}>✅ مناسب لك إذا كنت:</h4>
              <ul>
                <li>تعرف أساسيات HTML وCSS</li>
                <li>لديك معرفة بـ JavaScript</li>
                <li>تريد تعلم تطوير الواجهات الحديثة</li>
                <li>تفضل التعلم باللغة العربية</li>
                <li>تبحث عن مشاريع عملية</li>
                <li>تريد دخول سوق العمل كمطور Frontend</li>
              </ul>
            </div>
          </Col>
          <Col lg={6}>
            <div className="feature-card h-100">
              <h4 style={{color: '#ffc107'}}>⚠️ قد تحتاج تعلم الأساسيات أولاً إذا:</h4>
              <ul>
                <li>لا تعرف HTML أو CSS</li>
                <li>لم تكتب JavaScript من قبل</li>
                <li>لا تعرف كيف تستخدم المتصفح للتطوير</li>
                <li>لم تستخدم محرر أكواد مثل VS Code</li>
              </ul>
              <div className="mt-3">
                <small className="text-muted">
                  <strong>نصيحة:</strong> إذا كنت مبتدئ تماماً، ابدأ بتعلم HTML وCSS وJavaScript أولاً، 
                  ثم عود لتعلم React.
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* What You'll Build Section */}
      <Container className="my-5 py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h2 className="section-title">ماذا ستتعلم وتبني؟</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <div className="feature-card">
              <h4 style={{color: 'var(--primary-color)'}}>🧠 المفاهيم التي ستتعلمها:</h4>
              <Row>
                <Col md={6}>
                  <ul>
                    <li>Components</li>
                    <li>JSX</li>
                    <li>Props</li>
                    <li>State</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul>
                    <li>Event Handling</li>
                    <li>Hooks (useState, useEffect)</li>
                    <li>Lists & Keys</li>
                    <li>Conditional Rendering</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={6}>
            <div className="feature-card">
              <h4 style={{color: 'var(--primary-color)'}}>🛠️ المشروع الذي ستبنيه:</h4>
              <div className="project-preview p-3" style={{backgroundColor: 'var(--darker-bg)', borderRadius: '8px'}}>
                <h6 className="text-center mb-3">📝 تطبيق قائمة المهام</h6>
                <ul className="small">
                  <li>إضافة مهام جديدة</li>
                  <li>وضع علامة على المهام كمكتملة</li>
                  <li>حذف المهام</li>
                  <li>عدّاد للمهام المكتملة والمتبقية</li>
                  <li>تصميم جميل ومتجاوب</li>
                  <li>كود نظيف ومنظم</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <Container className="my-5 py-5">
        <Row>
          <Col xs={12}>
            <div className="feature-card text-center">
              <h3>مستعد لبدء رحلة تعلم React؟</h3>
              <p className="mb-4">
                انضم إلى آلاف المطورين العرب الذين تعلموا React وحصلوا على وظائف رائعة في تطوير الويب
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/frontend-basics" className="btn btn-primary btn-lg">
                  <span className="material-icons me-2">rocket_launch</span>
                  ابدأ الآن مجاناً
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg">
                  <span className="material-icons me-2">contact_support</span>
                  لديك سؤال؟
                </Link>
              </div>
              
              <div className="mt-4">
                <small className="text-muted">
                  💯 المحتوى مجاني بالكامل | ⏱️ حوالي 10-15 ساعة تعلم | 🎯 مناسب للمبتدئين
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LandingPage;