import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const TutorialCard = ({ title, children }) => (
  <div className="tutorial-card">
    <h3 className="tutorial-title">{title}</h3>
    {children}
  </div>
);

const CodeBlock = ({ children }) => (
  <div className="code-block">
    <code>{children}</code>
  </div>
);

const HomePage = () => {
  return (
    <div className="section">
      <Container className="py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="section-title">تعلم React خطوة بخطوة</h1>
            <p className="text-muted">دليلك الشامل لتعلم React من البداية</p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Introduction */}
            <TutorialCard title="ما هو React؟">
              <p>React هي مكتبة JavaScript مطورة من قبل Facebook لبناء واجهات المستخدم. تتميز React بكونها:</p>
              <ul>
                <li><strong>سريعة:</strong> تستخدم Virtual DOM لتحسين الأداء</li>
                <li><strong>قابلة لإعادة الاستخدام:</strong> يمكن تقسيم الواجهة إلى مكونات منفصلة</li>
                <li><strong>مرنة:</strong> يمكن دمجها مع مكتبات أخرى بسهولة</li>
              </ul>
            </TutorialCard>

            {/* Getting Started */}
            <TutorialCard title="البداية مع React">
              <p>لإنشاء تطبيق React جديد، استخدم الأمر التالي:</p>
              <CodeBlock>
{`npx create-react-app my-app
cd my-app
npm start`}
              </CodeBlock>
              <p>هذا سينشئ مشروع React جديد ويبدأ خادم التطوير على المنفذ 3000.</p>
            </TutorialCard>

            {/* Components */}
            <TutorialCard title="المكونات (Components)">
              <p>المكونات هي أساس React. يمكن إنشاء مكون بسيط كالتالي:</p>
              <CodeBlock>
{`function Welcome(props) {
  return <h1>مرحبا، {props.name}</h1>;
}

// استخدام المكون
<Welcome name="أحمد" />`}
              </CodeBlock>
            </TutorialCard>

            {/* JSX */}
            <TutorialCard title="JSX">
              <p>JSX هي امتداد لـ JavaScript تسمح بكتابة HTML داخل JavaScript:</p>
              <CodeBlock>
{`const element = <h1>مرحبا بالعالم!</h1>;

// يمكن أيضا استخدام المتغيرات
const name = 'سارة';
const element2 = <h1>مرحبا، {name}</h1>;`}
              </CodeBlock>
            </TutorialCard>

            {/* Props and State */}
            <TutorialCard title="Props والحالة (State)">
              <p><strong>Props:</strong> خصائص يتم تمريرها للمكون من الخارج</p>
              <p><strong>State:</strong> حالة داخلية للمكون يمكن تغييرها</p>
              <CodeBlock>
{`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>العدد: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        زيادة
      </button>
    </div>
  );
}`}
              </CodeBlock>
            </TutorialCard>

            {/* Event Handling */}
            <TutorialCard title="التعامل مع الأحداث">
              <p>في React، يتم التعامل مع الأحداث باستخدام camelCase:</p>
              <CodeBlock>
{`function Button() {
  function handleClick() {
    alert('تم النقر!');
  }

  return (
    <button onClick={handleClick}>
      انقر هنا
    </button>
  );
}`}
              </CodeBlock>
            </TutorialCard>

            {/* Lists */}
            <TutorialCard title="عرض القوائم">
              <p>لعرض قائمة من العناصر في React:</p>
              <CodeBlock>
{`function ItemList() {
  const items = ['التفاح', 'البرتقال', 'الموز'];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}`}
              </CodeBlock>
            </TutorialCard>

            {/* Forms */}
            <TutorialCard title="النماذج (Forms)">
              <p>التعامل مع النماذج في React:</p>
              <CodeBlock>
{`function MyForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('مرحبا ' + name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="أدخل اسمك"
      />
      <button type="submit">إرسال</button>
    </form>
  );
}`}
              </CodeBlock>
            </TutorialCard>

          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <div className="feature-card">
              <h4>فهرس الدروس</h4>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none">المقدمة</a></li>
                <li><a href="#" className="text-decoration-none">إعداد البيئة</a></li>
                <li><a href="#" className="text-decoration-none">المكونات</a></li>
                <li><a href="#" className="text-decoration-none">JSX</a></li>
                <li><a href="#" className="text-decoration-none">Props والحالة</a></li>
                <li><a href="#" className="text-decoration-none">الأحداث</a></li>
                <li><a href="#" className="text-decoration-none">القوائم</a></li>
                <li><a href="#" className="text-decoration-none">النماذج</a></li>
                <li><a href="#" className="text-decoration-none">دورة الحياة</a></li>
                <li><a href="#" className="text-decoration-none">Hooks</a></li>
                <li><a href="#" className="text-decoration-none">Context API</a></li>
                <li><a href="#" className="text-decoration-none">الأخطاء الشائعة</a></li>
              </ul>
            </div>

            <div className="feature-card mt-4">
              <h4>نصائح مفيدة</h4>
              <Alert variant="info" className="alert-info">
                <strong>نصيحة:</strong> ابدأ بالمفاهيم الأساسية قبل الانتقال للمواضيع المتقدمة
              </Alert>
              <Alert variant="warning" style={{backgroundColor: 'rgba(255, 193, 7, 0.1)', borderColor: '#ffc107', color: '#ffc107'}}>
                <strong>تذكر:</strong> مارس الكتابة بنفسك لفهم أفضل
              </Alert>
            </div>

            <div className="feature-card mt-4">
              <h4>موارد إضافية</h4>
              <ul className="list-unstyled">
                <li>📚 <a href="#" className="text-decoration-none">مكتبة الأمثلة</a></li>
                <li>🎯 <a href="#" className="text-decoration-none">تحديات البرمجة</a></li>
                <li>💡 <a href="#" className="text-decoration-none">أفضل الممارسات</a></li>
                <li>🔧 <a href="#" className="text-decoration-none">أدوات التطوير</a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;