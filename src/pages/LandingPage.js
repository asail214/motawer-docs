import React from 'react';
import { Container, Row, Col, ProgressBar, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth, useReduxProgress, useUserStats } from '../hooks/useRedux';

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

const LearningPathCard = ({ number, title, description, path, completed, isAuthenticated }) => (
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
        {completed && isAuthenticated && (
          <Badge bg="success" className="ms-2">+10 نقاط</Badge>
        )}
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
  const { isAuthenticated, user } = useAuth();
  const { progressPercentage, isCompleted } = useReduxProgress();
  const { stats } = useUserStats();

  // بيانات الدروس
  const sections = [
    {
      id: 'frontend-basics',
      number: 1,
      title: 'أساسيات تطوير الواجهات',
      description: 'تعرف على تطوير الواجهات الأمامية والتقنيات المستخدمة ودور React',
      path: '/frontend-basics'
    },
    {
      id: 'react-introduction',
      number: 2,
      title: 'مقدمة عن React',
      description: 'ما هي React؟ تاريخها ولماذا أصبحت الخيار الأول لتطوير الواجهات',
      path: '/react-introduction'
    },
    {
      id: 'environment-setup',
      number: 3,
      title: 'إعداد بيئة التطوير',
      description: 'تثبيت Node.js وVS Code وإنشاء أول مشروع React',
      path: '/environment-setup'
    },
    {
      id: 'core-concepts',
      number: 4,
      title: 'المفاهيم الأساسية',
      description: 'تعلم Components وJSX وProps وState وHooks',
      path: '/core-concepts'
    },
    {
      id: 'todo-project',
      number: 5,
      title: 'مشروع قائمة المهام',
      description: 'تطبيق عملي شامل يجمع كل ما تعلمته',
      path: '/todo-project'
    },
    {
      id: 'next-steps',
      number: 6,
      title: 'الخطوات التالية',
      description: 'ماذا بعد؟ المواضيع المتقدمة والمسار المهني',
      path: '/next-steps'
    }
  ];

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
                
                {isAuthenticated ? (
                  // محتوى للمستخدمين المسجلين
                  <div className="user-welcome mb-4">
                    <h3 style={{color: 'var(--primary-color)'}}>
                      مرحباً مجدداً، {user?.name}! 👋
                    </h3>
                    <p className="text-muted">
                      استمر في رحلة تعلم React وطور مهاراتك خطوة بخطوة
                    </p>
                    
                    {/* إحصائيات المستخدم */}
                    <div className="user-stats mb-4 p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                      <Row>
                        <Col md={6}>
                          <div className="stat-item">
                            <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                              emoji_events
                            </span>
                            <strong>{stats.totalPoints}</strong> نقطة إجمالية
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="stat-item">
                            <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                              school
                            </span>
                            <strong>{stats.completedSections}</strong> من 6 دروس مكتملة
                          </div>
                        </Col>
                      </Row>
                      
                      {stats.achievements.length > 0 && (
                        <div className="achievements mt-2">
                          <small className="text-muted d-block mb-1">إنجازاتك:</small>
                          {stats.achievements.slice(0, 3).map((achievement, index) => (
                            <Badge key={index} bg="warning" className="me-1 small">
                              {achievement}
                            </Badge>
                          ))}
                          {stats.achievements.length > 3 && (
                            <Badge bg="secondary" className="small">
                              +{stats.achievements.length - 3} المزيد
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // محتوى للزوار
                  <p className="text-muted mb-4">
                    منصة شاملة لتعلم مكتبة React من الصفر حتى الاحتراف، مع أمثلة عملية وشرح مفصل باللغة العربية.
                    مناسب للمطورين العرب الذين يعرفون HTML وCSS وJavaScript.
                  </p>
                )}

                {/* Progress Display */}
                {progressPercentage > 0 && (
                  <div className="progress-display mb-4 p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>تقدمك في التعلم</span>
                      <strong>{progressPercentage}%</strong>
                    </div>
                    <ProgressBar 
                      now={progressPercentage} 
                      variant="info"
                      style={{height: '8px'}}
                    />
                    
                    {!isAuthenticated && (
                      <small className="text-muted mt-2 d-block">
                        💡 <Link to="/register" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>
                          سجل حساب مجاني
                        </Link> لحفظ تقدمك والحصول على مميزات إضافية
                      </small>
                    )}
                  </div>
                )}

                <div className="hero-buttons">
                  {isAuthenticated ? (
                    // أزرار للمسجلين
                    <>
                      <Link to="/dashboard" className="btn btn-primary btn-lg">
                        <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                          dashboard
                        </span>
                        لوحة التحكم
                      </Link>
                      <Link to="/frontend-basics" className="btn btn-outline-light btn-lg">
                        <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                          play_arrow
                        </span>
                        متابعة التعلم
                      </Link>
                    </>
                  ) : (
                    // أزرار للزوار
                    <>
                      <Link to="/frontend-basics" className="btn btn-primary btn-lg">
                        <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                          play_arrow
                        </span>
                        ابدأ التعلم الآن
                      </Link>
                      <Link to="/register" className="btn btn-outline-light btn-lg">
                        <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                          person_add
                        </span>
                        إنشاء حساب مجاني
                      </Link>
                    </>
                  )}
                </div>
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
            <p className="text-muted">
              {isAuthenticated 
                ? `مرحباً ${user?.name}، تابع تقدمك في تعلم React`
                : 'مسار تعليمي مصمم خصيصاً للمطورين العرب'
              }
            </p>
          </Col>
        </Row>
        
        <Row>
          {sections.map((section) => (
            <LearningPathCard
              key={section.id}
              number={section.number}
              title={section.title}
              description={section.description}
              path={section.path}
              completed={isCompleted(section.id)}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </Row>

        {/* رسالة تشجيعية للمسجلين */}
        {isAuthenticated && progressPercentage < 100 && (
          <Row className="mt-4">
            <Col>
              <Alert variant="info" className="text-center">
                <Alert.Heading>استمر في التعلم! 🚀</Alert.Heading>
                <p>
                  لقد أكملت {stats.completedSections} من 6 دروس وحصلت على {stats.totalPoints} نقطة.
                  استمر لتحصل على المزيد من الإنجازات والنقاط!
                </p>
                <Link to="/dashboard" className="btn btn-primary">
                  عرض التفاصيل في لوحة التحكم
                </Link>
              </Alert>
            </Col>
          </Row>
        )}

        {/* تهنئة للمكملين */}
        {isAuthenticated && progressPercentage === 100 && (
          <Row className="mt-4">
            <Col>
              <Alert variant="success" className="text-center">
                <Alert.Heading>🎉 تهانينا!</Alert.Heading>
                <p>
                  لقد أكملت جميع دروس React! حصلت على {stats.totalPoints} نقطة و{stats.achievements.length} إنجاز.
                  أنت الآن جاهز لبناء تطبيقات React حقيقية!
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/dashboard" className="btn btn-success">
                    عرض إنجازاتي
                  </Link>
                  <Link to="/next-steps" className="btn btn-outline-success">
                    ما الخطوة التالية؟
                  </Link>
                </div>
              </Alert>
            </Col>
          </Row>
        )}
      </Container>

      {/* Features Section - مخفي للمسجلين الذين أكملوا */}
      {(!isAuthenticated || progressPercentage < 50) && (
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
            {isAuthenticated && (
              <>
                <FeatureCard
                  icon="cloud_sync"
                  title="حفظ سحابي"
                  description="تقدمك محفوظ في السحابة ويمكن الوصول إليه من أي جهاز"
                />
                <FeatureCard
                  icon="emoji_events"
                  title="نظام النقاط"
                  description="اكسب نقاط مع كل درس وحصل على إنجازات مميزة"
                />
                <FeatureCard
                  icon="analytics"
                  title="تتبع التقدم"
                  description="راقب تقدمك بتفصيل في لوحة التحكم الشخصية"
                />
              </>
            )}
          </Row>
        </Container>
      )}

      {/* CTA Section */}
      <Container className="my-5 py-5">
        <Row>
          <Col xs={12}>
            <div className="feature-card text-center">
              {isAuthenticated ? (
                // CTA للمسجلين
                <>
                  <h3>استمر في رحلة التعلم</h3>
                  <p className="mb-4">
                    لديك {6 - stats.completedSections} دروس متبقية لإكمال تعلم React.
                    كل درس يحتوي على معلومات قيمة ومشاريع عملية.
                  </p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/dashboard" className="btn btn-primary btn-lg">
                      <span className="material-icons me-2">dashboard</span>
                      لوحة التحكم
                    </Link>
                    <Link to="/frontend-basics" className="btn btn-outline-light btn-lg">
                      <span className="material-icons me-2">play_arrow</span>
                      متابعة التعلم
                    </Link>
                  </div>
                </>
              ) : (
                // CTA للزوار
                <>
                  <h3>مستعد لبدء رحلة تعلم React؟</h3>
                  <p className="mb-4">
                    انضم إلى آلاف المطورين العرب الذين تعلموا React وحصلوا على وظائف رائعة في تطوير الويب
                  </p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/register" className="btn btn-primary btn-lg">
                      <span className="material-icons me-2">person_add</span>
                      إنشاء حساب مجاني
                    </Link>
                    <Link to="/frontend-basics" className="btn btn-outline-light btn-lg">
                      <span className="material-icons me-2">play_arrow</span>
                      ابدأ بدون تسجيل
                    </Link>
                  </div>
                </>
              )}
              
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