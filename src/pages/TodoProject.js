import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Alert, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const TodoProject = () => {
  const { markAsCompleted, getProgress, getNextSection, getPreviousSection } = useProgress();
  const nextSection = getNextSection('todo-project');
  const previousSection = getPreviousSection('todo-project');

  // Demo Todo App State
  const [demoTodos, setDemoTodos] = useState([
    { id: 1, text: 'تعلم أساسيات React', completed: true },
    { id: 2, text: 'بناء تطبيق Todo List', completed: false },
    { id: 3, text: 'إضافة التنسيقات', completed: false }
  ]);
  const [demoInput, setDemoInput] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        markAsCompleted('todo-project');
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

  // Demo Todo Functions
  const addDemoTodo = () => {
    if (demoInput.trim()) {
      setDemoTodos([...demoTodos, {
        id: Date.now(),
        text: demoInput.trim(),
        completed: false
      }]);
      setDemoInput('');
    }
  };

  const toggleDemoTodo = (id) => {
    setDemoTodos(demoTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteDemoTodo = (id) => {
    setDemoTodos(demoTodos.filter(todo => todo.id !== id));
  };

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
            <h1 className="section-title">مشروع عملي: تطبيق قائمة المهام</h1>
            <p className="lead">تطبيق شامل لكل ما تعلمناه في React</p>
          </Col>
        </Row>

        <Row>
          <Col lg={9} md={8}>
            {/* Project Overview */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">نظرة عامة على المشروع</h3>
                <p>سنبني تطبيق قائمة مهام كامل يتضمن:</p>
                
                <Row>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>المميزات الأساسية:</h6>
                    <ul>
                      <li>إضافة مهام جديدة</li>
                      <li>وضع علامة على المهام كمكتملة</li>
                      <li>حذف المهام</li>
                      <li>عدّاد للمهام المكتملة/المتبقية</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>المفاهيم المستخدمة:</h6>
                    <ul>
                      <li>المكونات الوظيفية</li>
                      <li>useState Hook</li>
                      <li>معالجة الأحداث</li>
                      <li>عرض القوائم</li>
                      <li>العرض الشرطي</li>
                    </ul>
                  </Col>
                </Row>

                <Alert variant="info" className="mt-3">
                  <Alert.Heading>🎯 هدف المشروع</Alert.Heading>
                  <p className="mb-0">تطبيق عملي لجميع المفاهيم التي تعلمناها وبناء شيء حقيقي يمكن استخدامه!</p>
                </Alert>
              </Card.Body>
            </Card>

            {/* Demo Application */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">تجربة التطبيق الحي</h3>
                <p>جرب التطبيق أولاً لتفهم ما سنبنيه:</p>

                <div className="demo-app p-4" style={{
                  backgroundColor: 'var(--darker-bg)', 
                  borderRadius: '12px',
                  border: '2px solid var(--primary-color)'
                }}>
                  <h4 className="text-center mb-4" style={{color: 'var(--primary-color)'}}>
                    📝 قائمة المهام
                  </h4>
                  
                  {/* Add Todo Input */}
                  <div className="add-todo mb-3">
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        placeholder="أضف مهمة جديدة..."
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addDemoTodo()}
                        style={{
                          backgroundColor: 'var(--card-bg)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <Button variant="primary" onClick={addDemoTodo}>
                        إضافة
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="stats mb-3 d-flex justify-content-between">
                    <span>
                      <Badge bg="success">{demoTodos.filter(t => t.completed).length} مكتمل</Badge>
                    </span>
                    <span>
                      <Badge bg="warning">{demoTodos.filter(t => !t.completed).length} متبقي</Badge>
                    </span>
                    <span>
                      <Badge bg="info">{demoTodos.length} إجمالي</Badge>
                    </span>
                  </div>

                  {/* Todo List */}
                  <div className="todo-list">
                    {demoTodos.length === 0 ? (
                      <p className="text-center text-muted">لا توجد مهام بعد. أضف مهمة جديدة!</p>
                    ) : (
                      demoTodos.map(todo => (
                        <div 
                          key={todo.id} 
                          className="todo-item d-flex align-items-center justify-content-between p-2 mb-2"
                          style={{
                            backgroundColor: 'var(--card-bg)',
                            borderRadius: '8px',
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            opacity: todo.completed ? 0.7 : 1
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <Form.Check
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleDemoTodo(todo.id)}
                              className="me-2"
                            />
                            <span>{todo.text}</span>
                          </div>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => deleteDemoTodo(todo.id)}
                          >
                            <span className="material-icons">delete</span>
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <Alert variant="success" className="mt-3">
                  <strong>رائع!</strong> هذا ما سنبنيه معاً خطوة بخطوة.
                </Alert>
              </Card.Body>
            </Card>

            {/* Step 1: Setup */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 1: إعداد المشروع</h3>
                
                <div className="step-content">
                  <h6 style={{color: 'var(--primary-color)'}}>إنشاء مشروع جديد:</h6>
                  <CodeBlock>
{`npx create-react-app todo-app
cd todo-app
npm start`}
                  </CodeBlock>

                  <h6 style={{color: 'var(--primary-color)'}} className="mt-3">تنظيف الملفات:</h6>
                  <p>احذف المحتوى غير المطلوب من <code>src/App.js</code>:</p>
                  <CodeBlock>
{`import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>تطبيق قائمة المهام</h1>
    </div>
  );
}

export default App;`}
                  </CodeBlock>
                </div>
              </Card.Body>
            </Card>

            {/* Step 2: State Management */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 2: إدارة الحالة</h3>
                
                <p>نحتاج إلى state لحفظ قائمة المهام والنص الجديد:</p>
                <CodeBlock>
{`import React, { useState } from 'react';
import './App.css';

function App() {
  // حالة لقائمة المهام
  const [todos, setTodos] = useState([
    { id: 1, text: 'تعلم React', completed: false },
    { id: 2, text: 'بناء تطبيق', completed: false }
  ]);

  // حالة لحقل النص الجديد
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="App">
      <h1>📝 قائمة المهام</h1>
      {/* سنضيف المزيد هنا */}
    </div>
  );
}

export default App;`}
                </CodeBlock>

                <div className="explanation p-3 mt-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: 'var(--primary-color)'}}>شرح الكود:</h6>
                  <ul>
                    <li><code>todos</code>: مصفوفة تحتوي على جميع المهام</li>
                    <li><code>inputValue</code>: نص المهمة الجديدة</li>
                    <li>كل مهمة لها <code>id</code> و <code>text</code> و <code>completed</code></li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Step 3: Add Todo */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 3: إضافة مهام جديدة</h3>
                
                <p>نضيف حقل نص وزر لإضافة مهام جديدة:</p>
                <CodeBlock>
{`function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'تعلم React', completed: false },
    { id: 2, text: 'بناء تطبيق', completed: false }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  // دالة إضافة مهمة جديدة
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(), // ID بسيط باستخدام الوقت
        text: inputValue.trim(),
        completed: false
      };
      
      setTodos([...todos, newTodo]); // إضافة المهمة الجديدة
      setInputValue(''); // مسح الحقل
    }
  };

  // معالجة الضغط على Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="App">
      <h1>📝 قائمة المهام</h1>
      
      {/* حقل إضافة مهمة جديدة */}
      <div className="add-todo">
        <input
          type="text"
          placeholder="أضف مهمة جديدة..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTodo}>إضافة</button>
      </div>
    </div>
  );
}`}
                </CodeBlock>

                <div className="explanation p-3 mt-3" style={{backgroundColor: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: '#28a745'}}>💡 نقاط مهمة:</h6>
                  <ul>
                    <li><code>trim()</code>: لإزالة المسافات الزائدة</li>
                    <li><code>[...todos, newTodo]</code>: spread operator لإضافة عنصر جديد</li>
                    <li><code>Date.now()</code>: طريقة بسيطة لإنشاء ID فريد</li>
                    <li>معالجة Enter key للتسهيل على المستخدم</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Step 4: Display Todos */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 4: عرض قائمة المهام</h3>
                
                <p>نستخدم map() لعرض جميع المهام:</p>
                <CodeBlock>
{`return (
  <div className="App">
    <h1>📝 قائمة المهام</h1>
    
    {/* حقل إضافة مهمة */}
    <div className="add-todo">
      <input
        type="text"
        placeholder="أضف مهمة جديدة..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addTodo}>إضافة</button>
    </div>

    {/* عرض قائمة المهام */}
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>لا توجد مهام بعد. أضف مهمة جديدة!</p>
      ) : (
        todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.6 : 1
              }}
            >
              {todo.text}
            </span>
          </div>
        ))
      )}
    </div>
  </div>
);`}
                </CodeBlock>

                <Alert variant="primary" className="mt-3">
                  <strong>لاحظ:</strong> نستخدم العرض الشرطي لإظهار رسالة عند عدم وجود مهام، ونطبق تنسيقات مختلفة للمهام المكتملة.
                </Alert>
              </Card.Body>
            </Card>

            {/* Step 5: Toggle Complete */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 5: وضع علامة مكتمل</h3>
                
                <p>نضيف إمكانية وضع علامة على المهام كمكتملة:</p>
                <CodeBlock>
{`// دالة تبديل حالة المهمة
const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id 
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
};

// في return، نحدّث عرض المهام:
<div className="todo-list">
  {todos.length === 0 ? (
    <p>لا توجد مهام بعد. أضف مهمة جديدة!</p>
  ) : (
    todos.map(todo => (
      <div key={todo.id} className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.6 : 1
          }}
        >
          {todo.text}
        </span>
      </div>
    ))
  )}
</div>`}
                </CodeBlock>

                <div className="explanation p-3 mt-3" style={{backgroundColor: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: '#ffc107'}}>🔍 شرح toggleTodo:</h6>
                  <ul>
                    <li><code>map()</code>: نمر عبر جميع المهام</li>
                    <li>إذا كان <code>todo.id === id</code>: نقلب حالة <code>completed</code></li>
                    <li>وإلا: نُرجع المهمة كما هي بدون تغيير</li>
                    <li><code>{'{ ...todo, completed: !todo.completed }'}</code>: ننشئ نسخة جديدة مع تغيير completed فقط</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Step 6: Delete Todos */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 6: حذف المهام</h3>
                
                <p>نضيف إمكانية حذف المهام غير المرغوب فيها:</p>
                <CodeBlock>
{`// دالة حذف مهمة
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

// في عرض المهام، نضيف زر حذف:
<div className="todo-item">
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => toggleTodo(todo.id)}
  />
  <span
    style={{
      textDecoration: todo.completed ? 'line-through' : 'none',
      opacity: todo.completed ? 0.6 : 1
    }}
  >
    {todo.text}
  </span>
  <button onClick={() => deleteTodo(todo.id)}>
    حذف
  </button>
</div>`}
                </CodeBlock>

                <Alert variant="success" className="mt-3">
                  <strong>ممتاز!</strong> الآن لدينا تطبيق قائمة مهام كامل الوظائف.
                </Alert>
              </Card.Body>
            </Card>

            {/* Step 7: Statistics */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 7: إضافة الإحصائيات</h3>
                
                <p>لنضيف إحصائيات مفيدة عن المهام:</p>
                <CodeBlock>
{`function App() {
  // ... الكود السابق ...

  // حساب الإحصائيات
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <div className="App">
      <h1>📝 قائمة المهام</h1>
      
      {/* عرض الإحصائيات */}
      <div className="stats">
        <span>إجمالي: {totalTodos}</span>
        <span>مكتمل: {completedTodos}</span>
        <span>متبقي: {remainingTodos}</span>
      </div>
      
      {/* باقي الكود... */}
    </div>
  );
}`}
                </CodeBlock>
              </Card.Body>
            </Card>

            {/* Step 8: Styling */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوة 8: التنسيقات (CSS)</h3>
                
                <p>نضيف تنسيقات جميلة في <code>src/App.css</code>:</p>
                <CodeBlock>
{`.App {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.add-todo {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-todo input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
}

.add-todo input:focus {
  outline: none;
  border-color: #007bff;
}

.add-todo button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.add-todo button:hover {
  background-color: #0056b3;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #e9ecef;
  border-radius: 8px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-item span {
  flex: 1;
  font-size: 1.1rem;
}

.todo-item button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.todo-item button:hover {
  background-color: #c82333;
}`}
                </CodeBlock>
              </Card.Body>
            </Card>

            {/* Complete Code */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الكود الكامل النهائي</h3>
                
                <p>إليك الكود النهائي الكامل لـ <code>src/App.js</code>:</p>
                <CodeBlock>
{`import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'تعلم React', completed: false },
    { id: 2, text: 'بناء تطبيق', completed: false }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  // دالة إضافة مهمة جديدة
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // دالة تبديل حالة المهمة
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // دالة حذف مهمة
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // معالجة الضغط على Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // حساب الإحصائيات
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <div className="App">
      <h1>📝 قائمة المهام</h1>
      
      {/* الإحصائيات */}
      <div className="stats">
        <span>إجمالي: {totalTodos}</span>
        <span>مكتمل: {completedTodos}</span>
        <span>متبقي: {remainingTodos}</span>
      </div>
      
      {/* إضافة مهمة جديدة */}
      <div className="add-todo">
        <input
          type="text"
          placeholder="أضف مهمة جديدة..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTodo}>إضافة</button>
      </div>

      {/* قائمة المهام */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>
            لا توجد مهام بعد. أضف مهمة جديدة!
          </p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.6 : 1
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>
                حذف
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;`}
                </CodeBlock>

                <Alert variant="success" className="mt-3">
                  <Alert.Heading>🎉 تهانينا!</Alert.Heading>
                  <p className="mb-0">لقد أنشأت تطبيق قائمة مهام كامل باستخدام React! هذا المشروع يغطي معظم المفاهيم الأساسية.</p>
                </Alert>
              </Card.Body>
            </Card>

            {/* Common Mistakes */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الأخطاء الشائعة وحلولها</h3>
                
                <div className="mistake-item mb-4">
                  <h6 style={{color: '#dc3545'}}>❌ نسيان key في قائمة العناصر</h6>
                  <p><strong>المشكلة:</strong> Warning في Console</p>
                  <p><strong>الحل:</strong> أضف <code>key={`{todo.id}`}</code> لكل عنصر</p>
                </div>

                <div className="mistake-item mb-4">
                  <h6 style={{color: '#dc3545'}}>❌ تعديل state مباشرة</h6>
                  <CodeBlock>
{`// ❌ خطأ
todos.push(newTodo);
setTodos(todos);

// ✅ صحيح
setTodos([...todos, newTodo]);`}
                  </CodeBlock>
                </div>

                <div className="mistake-item mb-4">
                  <h6 style={{color: '#dc3545'}}>❌ عدم التحقق من النص الفارغ</h6>
                  <p><strong>المشكلة:</strong> إضافة مهام فارغة</p>
                  <p><strong>الحل:</strong> استخدم <code>inputValue.trim() !== ''</code></p>
                </div>

                <div className="mistake-item mb-4">
                  <h6 style={{color: '#dc3545'}}>❌ نسيان إعادة تعيين inputValue</h6>
                  <p><strong>المشكلة:</strong> الحقل لا يُفرغ بعد الإضافة</p>
                  <p><strong>الحل:</strong> أضف <code>setInputValue('')</code> بعد إضافة المهمة</p>
                </div>
              </Card.Body>
            </Card>

            {/* Enhancements */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">تحسينات إضافية (اختيارية)</h3>
                
                <p>يمكنك إضافة هذه المميزات لتحسين التطبيق:</p>
                <Row>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>تحسينات الوظائف:</h6>
                    <ul>
                      <li>تعديل نص المهمة</li>
                      <li>ترتيب المهام (السحب والإفلات)</li>
                      <li>فلترة المهام (الكل/مكتمل/غير مكتمل)</li>
                      <li>البحث في المهام</li>
                      <li>تاريخ إنشاء المهمة</li>
                      <li>أولوية المهام (عالية/متوسطة/منخفضة)</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>تحسينات تقنية:</h6>
                    <ul>
                      <li>حفظ البيانات في localStorage</li>
                      <li>إضافة أصوات للإشعارات</li>
                      <li>تصميم متجاوب للموبايل</li>
                      <li>تحسين الأداء مع useMemo</li>
                      <li>اختبارات للتطبيق</li>
                      <li>إضافة Dark Mode</li>
                    </ul>
                  </Col>
                </Row>

                <Alert variant="info" className="mt-3">
                  <Alert.Heading>💡 تحدي إضافي</Alert.Heading>
                  <p className="mb-0">جرب إضافة localStorage لحفظ المهام حتى بعد إغلاق المتصفح!</p>
                  <CodeBlock className="mt-2">
{`// في useEffect
useEffect(() => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    setTodos(JSON.parse(savedTodos));
  }
}, []);

// حفظ عند تغيير todos
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);`}
                  </CodeBlock>
                </Alert>
              </Card.Body>
            </Card>

            {/* What You Learned */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">🎓 ملخص ما تعلمته</h3>
                
                <Row>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>مفاهيم React:</h6>
                    <ul>
                      <li>✅ المكونات الوظيفية</li>
                      <li>✅ useState Hook</li>
                      <li>✅ معالجة الأحداث</li>
                      <li>✅ العرض الشرطي</li>
                      <li>✅ عرض القوائم مع map()</li>
                      <li>✅ المفاتيح (Keys)</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6 style={{color: 'var(--primary-color)'}}>مهارات البرمجة:</h6>
                    <ul>
                      <li>✅ إدارة الحالة المعقدة</li>
                      <li>✅ التعامل مع النماذج</li>
                      <li>✅ معالجة الأحداث المتقدمة</li>
                      <li>✅ الحوسبة المشتقة</li>
                      <li>✅ تنظيم الكود</li>
                      <li>✅ تطبيق CSS عملي</li>
                    </ul>
                  </Col>
                </Row>

                <div className="achievement-summary p-3 mt-3" style={{backgroundColor: 'rgba(40, 167, 69, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: '#28a745'}}>🏆 إنجازك:</h6>
                  <p className="mb-0">
                    لقد بنيت تطبيق React كامل الوظائف من الصفر! هذا المشروع يظهر فهمك العميق 
                    لأساسيات React ويؤهلك لبناء تطبيقات أكثر تعقيداً.
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Next Steps */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">الخطوات التالية</h3>
                
                <div className="next-steps-list">
                  <div className="step-item mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                        build
                      </span>
                      <h6 className="mb-0">تحسين هذا المشروع</h6>
                    </div>
                    <p>أضف المميزات الإضافية التي ذكرناها لتطوير مهاراتك</p>
                  </div>

                  <div className="step-item mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                        rocket_launch
                      </span>
                      <h6 className="mb-0">بناء مشروع جديد</h6>
                    </div>
                    <p>جرب بناء تطبيق مختلف مثل آلة حاسبة أو تطبيق طقس</p>
                  </div>

                  <div className="step-item mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                        school
                      </span>
                      <h6 className="mb-0">تعلم مواضيع متقدمة</h6>
                    </div>
                    <p>انتقل لتعلم React Router وإدارة الحالة المتقدمة</p>
                  </div>

                  <div className="step-item mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>
                        share
                      </span>
                      <h6 className="mb-0">شارك مشروعك</h6>
                    </div>
                    <p>اعرض مشروعك على GitHub وأضفه لـ Portfolio الخاص بك</p>
                  </div>
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
            <div className="sidebar-container">
              <div className="feature-card">
                <h4>خطوات المشروع</h4>
                <div className="project-steps">
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>1. إعداد المشروع</span>
                  </div>
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>2. إدارة الحالة</span>
                  </div>
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>3. إضافة المهام</span>
                  </div>
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>4. عرض القائمة</span>
                  </div>
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>5. وضع علامة مكتمل</span>
                  </div>
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>6. حذف المهام</span>
                  </div>
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>7. الإحصائيات</span>
                  </div>
                  <div className="step-item d-flex align-items-center mb-2">
                    <span className="material-icons me-2 text-success">check_circle</span>
                    <span>8. التنسيقات</span>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <h4>🧠 ما تعلمته</h4>
                <div className="learning-summary">
                  <Badge bg="success" className="me-2 mb-2">useState</Badge>
                  <Badge bg="success" className="me-2 mb-2">Event Handling</Badge>
                  <Badge bg="success" className="me-2 mb-2">Lists & Keys</Badge>
                  <Badge bg="success" className="me-2 mb-2">Conditional Rendering</Badge>
                  <Badge bg="success" className="me-2 mb-2">Forms</Badge>
                  <Badge bg="success" className="me-2 mb-2">CSS Styling</Badge>
                  <Badge bg="success" className="me-2 mb-2">State Management</Badge>
                  <Badge bg="success" className="me-2 mb-2">Component Structure</Badge>
                </div>
              </div>

              <div className="feature-card">
                <h4>🎯 تحدي إضافي</h4>
                <p className="small mb-3">
                  جرب إضافة ميزة تعديل المهام عند النقر المزدوج عليها!
                </p>
                <CodeBlock>
          {`// نصيحة:
          const [editingId, setEditingId] = useState(null);

          // في المكون
          onDoubleClick={() => setEditingId(todo.id)}`}
                </CodeBlock>
                <Button variant="outline-primary" size="sm" className="mt-2">
                  قبول التحدي
                </Button>
              </div>

              <div className="feature-card">
                <h4>📊 إحصائيات المشروع</h4>
                <div className="project-stats">
                  <div className="stat-item mb-2">
                    <strong style={{color: 'var(--primary-color)'}}>~100</strong> سطر كود
                  </div>
                  <div className="stat-item mb-2">
                    <strong style={{color: 'var(--primary-color)'}}>8</strong> دوال React
                  </div>
                  <div className="stat-item mb-2">
                    <strong style={{color: 'var(--primary-color)'}}>3</strong> useState hooks
                  </div>
                  <div className="stat-item mb-2">
                    <strong style={{color: 'var(--primary-color)'}}>5</strong> event handlers
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TodoProject;