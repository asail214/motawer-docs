import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth, useReduxProgress } from '../hooks/useRedux';
import ProgressTracker from '../components/common/ProgressTracker';
import AchievementNotification, { useAchievements } from '../components/common/AchievementNotification';

const CoreConcepts = () => {
  const { isAuthenticated, addPoints, addUserAchievement } = useAuth();
  const { markCompleted, isCompleted } = useReduxProgress();
  const { currentAchievement, showAchievement, hideAchievement } = useAchievements();

  const sectionId = 'core-concepts';
  const sectionCompleted = isCompleted(sectionId);

  const nextSection = { path: '/todo-project', title: 'مشروع قائمة المهام' };
  const previousSection = { path: '/environment-setup', title: 'إعداد بيئة التطوير' };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // إذا وصل لنهاية الصفحة ولم يكن مكتمل من قبل
      if (scrollPosition >= documentHeight - 100 && !sectionCompleted) {
        markCompleted(sectionId);
        
        // إضافة إنجاز وهمي للمسجلين
        if (isAuthenticated) {
          addPoints(10);
          showAchievement('خبير المفاهيم الأساسية!', 10);
          addUserAchievement('خبير المفاهيم الأساسية');
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
        {/* شريط التقدم المحسن */}
        <Row className="mb-4">
          <Col>
            <ProgressTracker />
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="section-title">المفاهيم الأساسية في React</h1>
            <p className="lead">تعلم أهم المفاهيم التي تحتاجها لبناء تطبيقات React</p>
            
            {/* مؤشر إكمال الدرس */}
            {sectionCompleted && (
              <Alert variant="success" className="mt-3">
                <span className="material-icons me-2">check_circle</span>
                <strong>تم إكمال هذا الدرس!</strong>
                {isAuthenticated && ' تم حفظ تقدمك في السحابة.'}
              </Alert>
            )}
          </Col>
        </Row>

        <Row>
          <Col lg={9} md={8}>
            {/* Components */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">المكونات (Components)</h3>
                <p>المكونات هي أساس React - قطع صغيرة قابلة لإعادة الاستخدام من واجهة المستخدم.</p>

                <Tabs defaultActiveKey="functional" className="mb-3">
                  <Tab eventKey="functional" title="المكونات الوظيفية">
                    <p>المكونات الوظيفية هي الطريقة الحديثة والمفضلة لكتابة المكونات:</p>
                    <CodeBlock>
                      {`// مكون وظيفي بسيط
function Welcome(props) {
  return <h1>مرحباً، {props.name}!</h1>;
}

// أو باستخدام Arrow Function
const Welcome = (props) => {
  return <h1>مرحباً، {props.name}!</h1>;
}

// استخدام المكون
<Welcome name="أحمد" />`}
                    </CodeBlock>
                  </Tab>
                  
                  <Tab eventKey="class" title="مكونات الفئة (مرجع)">
                    <p>الطريقة القديمة لكتابة المكونات (لا تستخدم في المشاريع الجديدة):</p>
                    <CodeBlock>
                      {`// مكون فئة (Class Component)
class Welcome extends React.Component {
  render() {
    return <h1>مرحباً، {this.props.name}!</h1>;
  }
}`}
                    </CodeBlock>
                    <Alert variant="warning">
                      <strong>نصيحة:</strong> استخدم المكونات الوظيفية دائماً في المشاريع الجديدة
                    </Alert>
                  </Tab>
                </Tabs>

                <div className="component-rules p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: 'var(--primary-color)'}}>قواعد مهمة للمكونات:</h6>
                  <ul>
                    <li>أسماء المكونات تبدأ بحرف كبير: <code>Welcome</code> وليس <code>welcome</code></li>
                    <li>كل مكون يجب أن يُرجع عنصر JSX واحد فقط</li>
                    <li>المكونات يجب أن تكون "pure" - لا تغير props</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* JSX */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">JSX - JavaScript XML</h3>
                <p>JSX يسمح بكتابة HTML داخل JavaScript بطريقة سهلة ومألوفة.</p>

                <Row>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>بدون JSX:</h6>
                    <CodeBlock>
                      {`// صعب القراءة
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'مرحباً بالعالم!'
);`}
                    </CodeBlock>
                  </Col>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>مع JSX:</h6>
                    <CodeBlock>
                      {`// سهل القراءة
const element = (
  <h1 className="greeting">
    مرحباً بالعالم!
  </h1>
);`}
                    </CodeBlock>
                  </Col>
                </Row>

                <h6 style={{color: 'var(--primary-color)'}} className="mt-4">قواعد JSX المهمة:</h6>
                <ul>
                  <li><strong>className بدلاً من class:</strong> <code>&lt;div className="container"&gt;</code></li>
                  <li><strong>htmlFor بدلاً من for:</strong> <code>&lt;label htmlFor="name"&gt;</code></li>
                  <li><strong>العلامات المفردة يجب إغلاقها:</strong> <code>&lt;img /&gt;</code> و <code>&lt;br /&gt;</code></li>
                  <li><strong>التعبيرات داخل أقواس:</strong> <code>{`{name}`}</code> أو <code>{`{2 + 2}`}</code></li>
                </ul>

                <h6 style={{color: 'var(--primary-color)'}} className="mt-3">أمثلة على JSX:</h6>
                <CodeBlock>
                  {`function UserProfile() {
  const userExample = {
    userName: 'سارة',
    age: 25,
    avatar: 'avatar.jpg'
  };

  return (
    <div className="user-profile">
      <img src={userExample.avatar} alt="صورة المستخدم" />
      <h2>{userExample.userName}</h2>
      <p>العمر: {userExample.age} سنة</p>
      {userExample.age >= 18 && <span>بالغ</span>}
    </div>
  );
}`}
                </CodeBlock>
              </Card.Body>
            </Card>

            {/* Props */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخصائص (Props)</h3>
                <p>Props هي البيانات التي تُمرر للمكونات من المكون الأب - مثل معاملات الدوال.</p>

                <CodeBlock>
                  {`// مكون يستقبل props
function ProductCard(props) {
  return (
    <div className="product-card">
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.price} ريال</p>
      <p>{props.description}</p>
    </div>
  );
}

// استخدام المكون مع تمرير props
<ProductCard 
  name="هاتف ذكي"
  price={1500}
  image="phone.jpg"
  description="هاتف ذكي بمواصفات عالية"
/>`}
                </CodeBlock>

                <h6 style={{color: 'var(--primary-color)'}} className="mt-3">Destructuring Props:</h6>
                <p>طريقة أنظف لاستخدام props:</p>
                <CodeBlock>
                  {`// بدلاً من props.name, props.price...
function ProductCard({ name, price, image, description }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price} ريال</p>
      <p>{description}</p>
    </div>
  );
}`}
                </CodeBlock>

                <Alert variant="info">
                  <strong>مهم:</strong> Props للقراءة فقط! لا يمكن تغييرها داخل المكون.
                </Alert>
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
                  <li><a href="#components" className="text-decoration-none">المكونات</a></li>
                  <li><a href="#jsx" className="text-decoration-none">JSX</a></li>
                  <li><a href="#props" className="text-decoration-none">Props</a></li>
                  <li><a href="#state" className="text-decoration-none">State</a></li>
                  <li><a href="#events" className="text-decoration-none">الأحداث</a></li>
                  <li><a href="#hooks" className="text-decoration-none">Hooks</a></li>
                </ul>
              </div>

              <div className="feature-card">
                <h4>🎯 أهداف التعلم</h4>
                <div className="learning-objectives">
                  <div className="objective-item mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    فهم المكونات والـ JSX
                  </div>
                  <div className="objective-item mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    التعامل مع Props و State
                  </div>
                  <div className="objective-item mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    استخدام useState و useEffect
                  </div>
                  <div className="objective-item mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    عرض القوائم والبيانات
                  </div>
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
                      إنجاز "خبير المفاهيم الأساسية"
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

export default CoreConcepts;