import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Alert, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const CoreConcepts = () => {
  const { markAsCompleted, getProgress, getNextSection, getPreviousSection } = useProgress();
  const nextSection = getNextSection('core-concepts');
  const previousSection = getPreviousSection('core-concepts');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        markAsCompleted('core-concepts');
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
            <h1 className="section-title">المفاهيم الأساسية في React</h1>
            <p className="lead">تعلم أهم المفاهيم التي تحتاجها لبناء تطبيقات React</p>
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
                  <li><strong>التعبيرات داخل أقواس:</strong> <code>{name}</code> أو <code>{2 + 2}</code></li>
                </ul>

                <h6 style={{color: 'var(--primary-color)'}} className="mt-3">أمثلة على JSX:</h6>
                <CodeBlock>
{`function UserProfile() {
  const user = {
    name: 'سارة',
    age: 25,
    avatar: 'avatar.jpg'
  };

  return (
    <div className="user-profile">
      <img src={user.avatar} alt="صورة المستخدم" />
      <h2>{user.name}</h2>
      <p>العمر: {user.age} سنة</p>
      {user.age >= 18 && <span>بالغ</span>}
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

            {/* State */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الحالة (State) و useState</h3>
                <p>State هي البيانات الداخلية للمكون التي يمكن تغييرها وتؤثر على ما يُعرض.</p>

                <CodeBlock>
{`import React, { useState } from 'react';

function Counter() {
  // تعريف state متغير
  const [count, setCount] = useState(0);

  // دالة لزيادة العدد
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>العدد: {count}</h2>
      <button onClick={increment}>زيادة</button>
      <button onClick={() => setCount(count - 1)}>تقليل</button>
      <button onClick={() => setCount(0)}>إعادة تعيين</button>
    </div>
  );
}`}
                </CodeBlock>

                <h6 style={{color: 'var(--primary-color)'}} className="mt-3">أنواع مختلفة من State:</h6>
                <Row>
                  <Col md={6}>
                    <CodeBlock>
{`// رقم
const [count, setCount] = useState(0);

// نص
const [name, setName] = useState('');

// منطقي
const [isVisible, setIsVisible] = useState(true);`}
                    </CodeBlock>
                  </Col>
                  <Col md={6}>
                    <CodeBlock>
{`// مصفوفة
const [items, setItems] = useState([]);

// كائن
const [user, setUser] = useState({
  name: '',
  email: ''
});`}
                    </CodeBlock>
                  </Col>
                </Row>

                <div className="state-rules p-3 mt-3" style={{backgroundColor: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: '#ffc107'}}>⚠️ قواعد مهمة عن State:</h6>
                  <ul>
                    <li>لا تعدّل state مباشرة، استخدم الدالة المخصصة</li>
                    <li>تحديث State غير متزامن</li>
                    <li>React يعيد رسم المكون عند تغيير State</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Event Handling */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">التعامل مع الأحداث</h3>
                <p>في React، نتعامل مع أحداث المستخدم مثل النقر والكتابة بطريقة خاصة.</p>

                <CodeBlock>
{`function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // التعامل مع إرسال النموذج
  const handleSubmit = (event) => {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    
    // التحقق من البيانات
    if (email && password) {
      console.log('تسجيل الدخول:', { email, password });
    } else {
      alert('يرجى ملء جميع الحقول');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button type="submit">تسجيل الدخول</button>
    </form>
  );
}`}
                </CodeBlock>

                <h6 style={{color: 'var(--primary-color)'}} className="mt-3">أحداث شائعة:</h6>
                <Row>
                  <Col md={6}>
                    <ul>
                      <li><strong>onClick:</strong> النقر على عنصر</li>
                      <li><strong>onChange:</strong> تغيير قيمة input</li>
                      <li><strong>onSubmit:</strong> إرسال نموذج</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul>
                      <li><strong>onMouseOver:</strong> مرور الماوس</li>
                      <li><strong>onKeyDown:</strong> ضغط مفتاح</li>
                      <li><strong>onFocus:</strong> التركيز على عنصر</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Hooks Introduction */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">مقدمة عن Hooks</h3>
                <p>Hooks هي دوال خاصة تسمح باستخدام ميزات React في المكونات الوظيفية.</p>

                <Row>
                  <Col md={6}>
                    <div className="hook-item mb-3">
                      <h6 style={{color: 'var(--primary-color)'}}>useState</h6>
                      <p>إدارة حالة المكون</p>
                      <CodeBlock>
{`const [count, setCount] = useState(0);`}
                      </CodeBlock>
                    </div>

                    <div className="hook-item mb-3">
                      <h6 style={{color: 'var(--primary-color)'}}>useEffect</h6>
                      <p>تنفيذ عمليات جانبية</p>
                      <CodeBlock>
{`useEffect(() => {
  document.title = \`العدد: \${count}\`;
}, [count]);`}
                      </CodeBlock>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="hook-item mb-3">
                      <h6 style={{color: 'var(--primary-color)'}}>useContext</h6>
                      <p>استهلاك Context</p>
                      <CodeBlock>
{`const theme = useContext(ThemeContext);`}
                      </CodeBlock>
                    </div>

                    <div className="hook-item mb-3">
                      <h6 style={{color: 'var(--primary-color)'}}>useReducer</h6>
                      <p>إدارة حالة معقدة</p>
                      <CodeBlock>
{`const [state, dispatch] = useReducer(
  reducer, 
  initialState
);`}
                      </CodeBlock>
                    </div>
                  </Col>
                </Row>

                <Alert variant="primary">
                  <Alert.Heading>قواعد Hooks</Alert.Heading>
                  <ul className="mb-0">
                    <li>استخدم Hooks فقط في مستوى أعلى من المكون</li>
                    <li>استخدم Hooks فقط في المكونات الوظيفية</li>
                    <li>أسماء Hooks تبدأ بـ "use"</li>
                  </ul>
                </Alert>
              </Card.Body>
            </Card>

            {/* useEffect Hook */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">useEffect Hook</h3>
                <p>useEffect يسمح بتنفيذ العمليات الجانبية مثل جلب البيانات أو تحديث عنوان الصفحة.</p>

                <Tabs defaultActiveKey="basic" className="mb-3">
                  <Tab eventKey="basic" title="الاستخدام الأساسي">
                    <CodeBlock>
{`import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // يعمل عند كل تحديث
  useEffect(() => {
    document.title = \`المؤقت: \${seconds} ثانية\`;
  });

  return (
    <div>
      <h2>{seconds} ثانية</h2>
      <button onClick={() => setSeconds(seconds + 1)}>
        زيادة
      </button>
    </div>
  );
}`}
                    </CodeBlock>
                  </Tab>

                  <Tab eventKey="dependency" title="مع Dependencies">
                    <CodeBlock>
{`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // يعمل عند تغيير userId فقط
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // dependency array

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : (
    <p>جاري التحميل...</p>
  );
}`}
                    </CodeBlock>
                  </Tab>

                  <Tab eventKey="cleanup" title="التنظيف">
                    <CodeBlock>
{`function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // دالة التنظيف
    return () => {
      clearInterval(interval);
    };
  }, []); // مصفوفة فارغة = يعمل مرة واحدة

  return <h2>{time.toLocaleTimeString()}</h2>;
}`}
                    </CodeBlock>
                  </Tab>
                </Tabs>

                <div className="useeffect-patterns p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: 'var(--primary-color)'}}>أنماط شائعة لـ useEffect:</h6>
                  <ul>
                    <li><strong>بدون dependencies:</strong> يعمل بعد كل render</li>
                    <li><strong>مصفوفة فارغة []:</strong> يعمل مرة واحدة فقط</li>
                    <li><strong>مع dependencies:</strong> يعمل عند تغيير قيم معينة</li>
                    <li><strong>مع cleanup:</strong> لتنظيف الموارد (timers, subscriptions)</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Lists and Keys */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">عرض القوائم والمفاتيح</h3>
                <p>في React، نستخدم map() لعرض قوائم البيانات، مع أهمية استخدام key فريد لكل عنصر.</p>

                <CodeBlock>
{`function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'تعلم React', completed: false },
    { id: 2, text: 'بناء مشروع', completed: false },
    { id: 3, text: 'نشر التطبيق', completed: true }
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div>
      <h2>قائمة المهام</h2>
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} // مفتاح فريد مهم!
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
                </CodeBlock>

                <Alert variant="warning">
                  <Alert.Heading>⚠️ أهمية المفاتيح (Keys)</Alert.Heading>
                  <ul className="mb-0">
                    <li>استخدم دائماً key فريد لكل عنصر في القائمة</li>
                    <li>لا تستخدم index المصفوفة إلا كملاذ أخير</li>
                    <li>Keys تساعد React في تتبع التغييرات بكفاءة</li>
                  </ul>
                </Alert>

                <h6 style={{color: 'var(--primary-color)'}} className="mt-3">أمثلة أخرى على القوائم:</h6>
                <CodeBlock>
{`// قائمة منتجات
function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price} ريال</p>
        </div>
      ))}
    </div>
  );
}

// قائمة بشروط
function MessageList({ messages }) {
  return (
    <div>
      {messages.length === 0 ? (
        <p>لا توجد رسائل</p>
      ) : (
        messages.map(message => (
          <div key={message.id} className="message">
            <strong>{message.sender}:</strong>
            <span>{message.text}</span>
          </div>
        ))
      )}
    </div>
  );
}`}
                </CodeBlock>
              </Card.Body>
            </Card>

            {/* Conditional Rendering */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">العرض الشرطي</h3>
                <p>أحياناً نريد عرض أجزاء مختلفة من الواجهة حسب شروط معينة.</p>

                <Tabs defaultActiveKey="if-else" className="mb-3">
                  <Tab eventKey="if-else" title="If/Else">
                    <CodeBlock>
{`function LoginButton({ isLoggedIn, onLogin, onLogout }) {
  if (isLoggedIn) {
    return (
      <button onClick={onLogout}>
        تسجيل خروج
      </button>
    );
  } else {
    return (
      <button onClick={onLogin}>
        تسجيل دخول
      </button>
    );
  }
}`}
                    </CodeBlock>
                  </Tab>

                  <Tab eventKey="ternary" title="Ternary Operator">
                    <CodeBlock>
{`function Greeting({ user }) {
  return (
    <div>
      {user ? (
        <h1>مرحباً، {user.name}!</h1>
      ) : (
        <h1>مرحباً، زائر!</h1>
      )}
    </div>
  );
}`}
                    </CodeBlock>
                  </Tab>

                  <Tab eventKey="logical" title="Logical &&">
                    <CodeBlock>
{`function Notifications({ notifications }) {
  return (
    <div>
      {notifications.length > 0 && (
        <div className="notification-badge">
          {notifications.length}
        </div>
      )}
      
      <h2>الإشعارات</h2>
      
      {notifications.length === 0 && (
        <p>لا توجد إشعارات جديدة</p>
      )}
    </div>
  );
}`}
                    </CodeBlock>
                  </Tab>
                </Tabs>

                <div className="conditional-patterns p-3" style={{backgroundColor: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: '#28a745'}}>💡 نصائح للعرض الشرطي:</h6>
                  <ul>
                    <li>استخدم <code>&&</code> لعرض عنصر أو لا شيء</li>
                    <li>استخدم <code>? :</code> للاختيار بين عنصرين</li>
                    <li>استخدم <code>if/else</code> للمنطق المعقد</li>
                    <li>تجنب العرض الشرطي المتداخل كثيراً</li>
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
            <Col lg={3} md={4}>
            <div className="feature-card sticky-top" style={{top: '100px'}}>
              <h4>محتويات هذا الدرس</h4>
              <ul className="list-unstyled">
                <li><a href="#components" className="text-decoration-none">المكونات</a></li>
                <li><a href="#jsx" className="text-decoration-none">JSX</a></li>
                <li><a href="#props" className="text-decoration-none">Props</a></li>
                <li><a href="#state" className="text-decoration-none">State</a></li>
                <li><a href="#events" className="text-decoration-none">الأحداث</a></li>
                <li><a href="#hooks" className="text-decoration-none">Hooks</a></li>
                <li><a href="#useeffect" className="text-decoration-none">useEffect</a></li>
                <li><a href="#lists" className="text-decoration-none">القوائم</a></li>
                <li><a href="#conditional" className="text-decoration-none">العرض الشرطي</a></li>
              </ul>
            </div>

            <div className="feature-card mt-4">
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

            <div className="feature-card mt-4">
              <h4>⚡ مراجعة سريعة</h4>
              <div className="quick-review">
                <div className="review-item mb-2">
                  <strong>مكون:</strong> دالة تُرجع JSX
                </div>
                <div className="review-item mb-2">
                  <strong>Props:</strong> بيانات من المكون الأب
                </div>
                <div className="review-item mb-2">
                  <strong>State:</strong> بيانات داخلية قابلة للتغيير
                </div>
                <div className="review-item mb-2">
                  <strong>useEffect:</strong> للعمليات الجانبية
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CoreConcepts;