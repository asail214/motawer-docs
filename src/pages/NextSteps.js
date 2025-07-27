import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const NextSteps = () => {
  const { markAsCompleted, getProgress, getPreviousSection } = useProgress();
  const previousSection = getPreviousSection('next-steps');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        markAsCompleted('next-steps');
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
            <h1 className="section-title">الخطوات التالية</h1>
            <p className="lead">ماذا بعد؟ دليلك لمواصلة رحلة تعلم React</p>
          </Col>
        </Row>

        <Row>
        <Col lg={9} md={8}>
            {/* Congratulations */}
            <Card className="tutorial-card mb-4" style={{background: 'linear-gradient(135deg, rgba(97, 218, 251, 0.1), rgba(40, 167, 69, 0.1))'}}>
              <Card.Body className="text-center">
                <h3 className="tutorial-title">🎉 تهانينا! لقد أكملت الأساسيات</h3>
                <p className="lead">أنت الآن تعرف:</p>
                <Row>
                  <Col md={6}>
                    <ul className="text-start">
                      <li>ما هو React ولماذا نستخدمه</li>
                      <li>كيفية إعداد بيئة التطوير</li>
                      <li>المكونات والـ JSX</li>
                      <li>Props والـ State</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="text-start">
                      <li>useState و useEffect</li>
                      <li>التعامل مع الأحداث</li>
                      <li>عرض القوائم والعرض الشرطي</li>
                      <li>بناء مشروع حقيقي</li>
                    </ul>
                  </Col>
                </Row>
                <Alert variant="success" className="mt-3">
                  <strong>أنت الآن مطور React مبتدئ!</strong> 🚀
                </Alert>
              </Card.Body>
            </Card>

            {/* Advanced Topics */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">مواضيع React متقدمة</h3>
                <p>بعد إتقان الأساسيات، إليك المواضيع المتقدمة التي يجب تعلمها:</p>

                <Row>
                  <Col md={6}>
                    <div className="topic-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>🎣 Hooks متقدمة</h5>
                      <ul>
                        <li><strong>useContext:</strong> إدارة البيانات العامة</li>
                        <li><strong>useReducer:</strong> إدارة حالة معقدة</li>
                        <li><strong>useMemo:</strong> تحسين الأداء</li>
                        <li><strong>useCallback:</strong> تحسين الدوال</li>
                        <li><strong>useRef:</strong> الوصول لعناصر DOM</li>
                        <li><strong>Custom Hooks:</strong> إنشاء hooks مخصصة</li>
                      </ul>
                    </div>

                    <div className="topic-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>🔄 إدارة الحالة</h5>
                      <ul>
                        <li><strong>Context API:</strong> حالة عامة بدون مكتبات خارجية</li>
                        <li><strong>Redux Toolkit:</strong> إدارة حالة للتطبيقات الكبيرة</li>
                        <li><strong>Zustand:</strong> مكتبة بديلة خفيفة</li>
                        <li><strong>React Query:</strong> إدارة بيانات الخادم</li>
                      </ul>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="topic-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>🛣️ التوجيه (Routing)</h5>
                      <ul>
                        <li><strong>React Router:</strong> التنقل بين الصفحات</li>
                        <li><strong>Dynamic Routes:</strong> مسارات متحركة</li>
                        <li><strong>Protected Routes:</strong> مسارات محمية</li>
                        <li><strong>Nested Routes:</strong> مسارات متداخلة</li>
                      </ul>
                    </div>

                    <div className="topic-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>🎨 التنسيق والواجهات</h5>
                      <ul>
                        <li><strong>Styled Components:</strong> CSS-in-JS</li>
                        <li><strong>Material-UI:</strong> مكتبة مكونات جاهزة</li>
                        <li><strong>Tailwind CSS:</strong> إطار عمل CSS مساعد</li>
                        <li><strong>Framer Motion:</strong> حركات وانتقالات</li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <div className="learning-path p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: 'var(--primary-color)'}}>📚 ترتيب التعلم المقترح:</h6>
                  <ol>
                    <li>React Router للتنقل بين الصفحات</li>
                    <li>useContext و Context API</li>
                    <li>Custom Hooks</li>
                    <li>مكتبة UI (Material-UI أو Chakra UI)</li>
                    <li>إدارة الحالة (Redux Toolkit أو Zustand)</li>
                  </ol>
                </div>
              </Card.Body>
            </Card>

            {/* Tools & Ecosystem */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">أدوات ومكتبات React الأساسية</h3>
                
                <Row>
                  <Col md={6}>
                    <div className="tool-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>🛠️ أدوات التطوير</h5>
                      <div className="tool-item mb-2">
                        <strong>React Developer Tools:</strong>
                        <p className="small text-muted">إضافة المتصفح لتتبع المكونات</p>
                      </div>
                      <div className="tool-item mb-2">
                        <strong>ESLint + Prettier:</strong>
                        <p className="small text-muted">لكتابة كود نظيف ومتسق</p>
                      </div>
                      <div className="tool-item mb-2">
                        <strong>Storybook:</strong>
                        <p className="small text-muted">لتطوير واختبار المكونات منفردة</p>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="tool-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>🧪 الاختبار</h5>
                      <div className="tool-item mb-2">
                        <strong>Jest:</strong>
                        <p className="small text-muted">إطار اختبار JavaScript</p>
                      </div>
                      <div className="tool-item mb-2">
                        <strong>React Testing Library:</strong>
                        <p className="small text-muted">اختبار مكونات React</p>
                      </div>
                      <div className="tool-item mb-2">
                        <strong>Cypress:</strong>
                        <p className="small text-muted">اختبار التطبيق بالكامل (E2E)</p>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="tools-priority p-3" style={{backgroundColor: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: '#ffc107'}}>⭐ الأولوية العالية:</h6>
                  <p>ركز على React Developer Tools وReact Router أولاً - هما الأكثر أهمية للمشاريع الحقيقية.</p>
                </div>
              </Card.Body>
            </Card>

            {/* Learning Resources */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">مصادر التعلم المتقدم</h3>
                
                <Row>
                  <Col md={6}>
                    <div className="resource-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>📖 الوثائق الرسمية</h5>
                      <ul>
                        <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>React الوثائق الرسمية</a></li>
                        <li><a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>React Router</a></li>
                        <li><a href="https://redux-toolkit.js.org" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>Redux Toolkit</a></li>
                      </ul>
                    </div>

                    <div className="resource-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>🎥 قنوات يوتيوب (إنجليزية)</h5>
                      <ul>
                        <li>Traversy Media</li>
                        <li>The Net Ninja</li>
                        <li>Academind</li>
                        <li>Web Dev Simplified</li>
                      </ul>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="resource-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>💻 منصات التعلم</h5>
                      <ul>
                        <li><a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>freeCodeCamp</a></li>
                        <li><a href="https://scrimba.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>Scrimba</a></li>
                        <li><a href="https://egghead.io" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>Egghead</a></li>
                        <li><a href="https://frontendmasters.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>Frontend Masters</a></li>
                      </ul>
                    </div>

                    <div className="resource-category mb-4">
                      <h5 style={{color: 'var(--primary-color)'}}>📚 كتب مفيدة</h5>
                      <ul>
                        <li>"React Up & Running"</li>
                        <li>"Learning React" by O'Reilly</li>
                        <li>"The Road to React"</li>
                        <li>"Fullstack React"</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Project Ideas */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">أفكار مشاريع للممارسة</h3>
                <p>أفضل طريقة لتعلم React هي بناء مشاريع حقيقية. إليك أفكار مرتبة حسب الصعوبة:</p>

                <div className="project-level mb-4">
                  <h5 style={{color: '#28a745'}}>🟢 مستوى مبتدئ</h5>
                  <Row>
                    <Col md={6}>
                      <ul>
                        <li><strong>آلة حاسبة:</strong> تطبيق عمليات حسابية بسيط</li>
                        <li><strong>تطبيق طقس:</strong> عرض الطقس باستخدام API</li>
                        <li><strong>مدونة شخصية:</strong> عرض مقالات وتصنيفها</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul>
                        <li><strong>تطبيق اقتباسات:</strong> عرض اقتباسات عشوائية</li>
                        <li><strong>معرض صور:</strong> عرض وتصفية الصور</li>
                        <li><strong>تطبيق ملاحظات:</strong> إنشاء وإدارة الملاحظات</li>
                      </ul>
                    </Col>
                  </Row>
                </div>

                <div className="project-level mb-4">
                  <h5 style={{color: '#ffc107'}}>🟡 مستوى متوسط</h5>
                  <Row>
                    <Col md={6}>
                      <ul>
                        <li><strong>تطبيق تسوق:</strong> سلة مشتريات وإدارة المنتجات</li>
                        <li><strong>إدارة مهام فرق:</strong> Todo متقدم مع فرق</li>
                        <li><strong>تطبيق دردشة:</strong> رسائل فورية بسيطة</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul>
                        <li><strong>مشغل موسيقى:</strong> تشغيل وإدارة الأغاني</li>
                        <li><strong>تطبيق تتبع النفقات:</strong> إدارة مالية شخصية</li>
                        <li><strong>منصة تعلم:</strong> دورات وفيديوهات تعليمية</li>
                      </ul>
                    </Col>
                  </Row>
                </div>

                <div className="project-level mb-4">
                  <h5 style={{color: '#dc3545'}}>🔴 مستوى متقدم</h5>
                  <Row>
                    <Col md={6}>
                      <ul>
                        <li><strong>شبكة اجتماعية مصغرة:</strong> منشورات وتعليقات</li>
                        <li><strong>نظام إدارة محتوى:</strong> CMS كامل</li>
                        <li><strong>تطبيق مصرفي:</strong> إدارة حسابات ومعاملات</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul>
                        <li><strong>منصة تجارة إلكترونية:</strong> متجر كامل</li>
                        <li><strong>تطبيق إدارة مشاريع:</strong> أشبه بـ Trello</li>
                        <li><strong>منصة فيديو:</strong> رفع ومشاهدة الفيديوهات</li>
                      </ul>
                    </Col>
                  </Row>
                </div>

                <Alert variant="info">
                  <Alert.Heading>💡 نصيحة مهمة</Alert.Heading>
                  <p className="mb-0">ابدأ بمشروع بسيط وأكمله بالكامل بدلاً من البدء بمشروع معقد وتركه في المنتصف.</p>
                </Alert>
              </Card.Body>
            </Card>

            {/* Career Path */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">المسار المهني كمطور React</h3>
                
                <div className="career-path">
                  <div className="career-stage mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">المرحلة الأولى</Badge>
                      <h5 className="mb-0">Junior React Developer (0-2 سنة)</h5>
                    </div>
                    <p><strong>المهارات المطلوبة:</strong></p>
                    <ul>
                      <li>إتقان أساسيات React (Components, State, Props)</li>
                      <li>JavaScript ES6+ و HTML/CSS</li>
                      <li>Git وأساسيات إدارة الكود</li>
                      <li>React Router للتنقل</li>
                      <li>التعامل مع APIs</li>
                    </ul>
                    <p><strong>متوسط الراتب:</strong> 4,000 - 8,000 ريال شهرياً (السعودية)</p>
                  </div>

                  <div className="career-stage mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="warning" className="me-2">المرحلة الثانية</Badge>
                      <h5 className="mb-0">Mid-Level React Developer (2-5 سنوات)</h5>
                    </div>
                    <p><strong>المهارات المطلوبة:</strong></p>
                    <ul>
                      <li>إدارة الحالة المتقدمة (Redux, Context API)</li>
                      <li>TypeScript للمشاريع الكبيرة</li>
                      <li>اختبار التطبيقات (Jest, React Testing Library)</li>
                      <li>تحسين الأداء والـ SEO</li>
                      <li>Next.js أو Gatsby للـ SSR/SSG</li>
                    </ul>
                    <p><strong>متوسط الراتب:</strong> 8,000 - 15,000 ريال شهرياً</p>
                  </div>

                  <div className="career-stage mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="danger" className="me-2">المرحلة الثالثة</Badge>
                      <h5 className="mb-0">Senior React Developer (5+ سنوات)</h5>
                    </div>
                    <p><strong>المهارات المطلوبة:</strong></p>
                    <ul>
                      <li>قيادة فريق تطوير وإرشاد المطورين الجدد</li>
                      <li>تصميم هيكلة التطبيقات الكبيرة</li>
                      <li>معرفة عميقة بأداء React وتحسينه</li>
                      <li>الخبرة في CI/CD والنشر</li>
                      <li>المساهمة في قرارات التقنية والهيكلة</li>
                    </ul>
                    <p><strong>متوسط الراتب:</strong> 15,000 - 25,000+ ريال شهرياً</p>
                  </div>
                </div>

                <div className="career-tips p-3" style={{backgroundColor: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: '#28a745'}}>💼 نصائح للنجاح المهني:</h6>
                  <ul className="mb-0">
                    <li>بناء portfolio قوي بمشاريع متنوعة</li>
                    <li>المشاركة في مشاريع مفتوحة المصدر</li>
                    <li>الاستمرار في التعلم ومتابعة التطورات</li>
                    <li>بناء شبكة علاقات مع مطورين آخرين</li>
                    <li>كتابة مقالات تقنية ومشاركة الخبرات</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Final Message */}
            <Card className="tutorial-card mb-4" style={{background: 'linear-gradient(135deg, rgba(97, 218, 251, 0.1), rgba(123, 104, 238, 0.1))'}}>
              <Card.Body className="text-center">
                <h3 className="tutorial-title">🚀 رسالة أخيرة</h3>
                <p className="lead">
                  React ليست مجرد مكتبة - إنها مهارة تفتح لك أبواب عالم تطوير الويب الحديث.
                </p>
                <p>
                  تذكر أن التعلم رحلة مستمرة، والمطورون الأفضل هم من لا يتوقفون عن التعلم والتجريب.
                  ابدأ بمشروع صغير، وتدرّج في الصعوبة، ولا تخف من الأخطاء - فهي جزء من رحلة التعلم.
                </p>
                <div className="final-cta mt-4">
                  <Button variant="primary" size="lg" className="me-3">
                    <span className="material-icons me-2">code</span>
                    ابدأ مشروعك الأول
                  </Button>
                  <Link to="/contact" className="btn btn-outline-light btn-lg">
                    <span className="material-icons me-2">contact_support</span>
                    تواصل معنا
                  </Link>
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
                <Link to="/" className="btn btn-success">
                  <span className="material-icons me-2">home</span>
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col lg={3} md={4}>
            <div className="feature-card sticky-top" style={{top: '100px'}}>
              <h4>🎯 خارطة الطريق</h4>
              <div className="roadmap-steps">
                <div className="roadmap-item mb-3">
                  <div className="d-flex align-items-center">
                    <Badge bg="success" className="me-2">✓</Badge>
                    <span>أساسيات React</span>
                  </div>
                </div>
                <div className="roadmap-item mb-3">
                  <div className="d-flex align-items-center">
                    <Badge bg="warning" className="me-2">1</Badge>
                    <span>React Router</span>
                  </div>
                </div>
                <div className="roadmap-item mb-3">
                  <div className="d-flex align-items-center">
                    <Badge bg="warning" className="me-2">2</Badge>
                    <span>State Management</span>
                  </div>
                </div>
                <div className="roadmap-item mb-3">
                  <div className="d-flex align-items-center">
                    <Badge bg="warning" className="me-2">3</Badge>
                    <span>Testing & Performance</span>
                  </div>
                </div>
                <div className="roadmap-item mb-3">
                  <div className="d-flex align-items-center">
                    <Badge bg="secondary" className="me-2">4</Badge>
                    <span>Advanced Patterns</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-card mt-4">
              <h4>📊 إنجازاتك</h4>
              <div className="achievements">
                <div className="achievement-item mb-2">
                  <span className="material-icons me-2 text-success">emoji_events</span>
                  مطور React معتمد
                </div>
                <div className="achievement-item mb-2">
                  <span className="material-icons me-2 text-success">build</span>
                  باني تطبيقات
                </div>
                <div className="achievement-item mb-2">
                  <span className="material-icons me-2 text-success">psychology</span>
                  مفكر منطقي
                </div>
                <div className="achievement-item mb-2">
                  <span className="material-icons me-2 text-success">rocket_launch</span>
                  مستعد للمشاريع الحقيقية
                </div>
              </div>
            </div>

            <div className="feature-card mt-4">
              <h4>🌟 نصيحة يومية</h4>
              <blockquote style={{borderLeft: '4px solid var(--primary-color)', paddingLeft: '1rem', fontStyle: 'italic'}}>
                "أفضل طريقة للتعلم هي البناء. ابن شيئاً جديداً كل أسبوع، مهما كان بسيطاً."
              </blockquote>
              <small className="text-muted">- مطور خبير</small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NextSteps;