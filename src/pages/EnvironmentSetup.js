import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const EnvironmentSetup = () => {
  const { markAsCompleted, getProgress, getNextSection, getPreviousSection } = useProgress();
  const nextSection = getNextSection('environment-setup');
  const previousSection = getPreviousSection('environment-setup');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        markAsCompleted('environment-setup');
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
            <h1 className="section-title">إعداد بيئة التطوير</h1>
            <p className="lead">تجهيز حاسوبك للبدء في تطوير تطبيقات React</p>
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
              </Card.Body>
            </Card>

            {/* Node.js Installation */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">تثبيت Node.js</h3>
                <p>Node.js هو بيئة تشغيل JavaScript خارج المتصفح، وهو ضروري لتطوير React.</p>

                <Alert variant="info">
                  <Alert.Heading>ما هو Node.js؟</Alert.Heading>
                  <p>Node.js يسمح بتشغيل JavaScript على حاسوبك مباشرة، وليس فقط في المتصفح. كما أنه يأتي مع npm (Node Package Manager) لإدارة المكتبات.</p>
                </Alert>

                <h5 style={{color: 'var(--primary-color)'}}>خطوات التثبيت:</h5>
                <div className="steps">
                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="primary" className="me-2">1</Badge>
                      <h6 className="mb-0">تنزيل Node.js</h6>
                    </div>
                    <p>اذهب إلى <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>nodejs.org</a></p>
                    <p>اختر النسخة LTS (Long Term Support) - الأكثر استقراراً</p>
                  </div>

                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="primary" className="me-2">2</Badge>
                      <h6 className="mb-0">تثبيت Node.js</h6>
                    </div>
                    <p>شغل الملف المحمل واتبع التعليمات</p>
                    <p>اقبل جميع الإعدادات الافتراضية</p>
                  </div>

                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="primary" className="me-2">3</Badge>
                      <h6 className="mb-0">تأكد من التثبيت</h6>
                    </div>
                    <p>افتح Command Prompt أو Terminal واكتب:</p>
                    <CodeBlock>
node --version
npm --version
                    </CodeBlock>
                    <p>يجب أن ترى أرقام الإصدارات</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* React Installation Methods */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">طرق تثبيت React</h3>
                <p>هناك عدة طرق لإنشاء مشروع React جديد:</p>

                <Row>
                  <Col md={6}>
                    <div className="method-card p-3 mb-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                      <h5 style={{color: 'var(--primary-color)'}}>Create React App</h5>
                      <p>الطريقة الأسهل للمبتدئين</p>
                      <CodeBlock>
npx create-react-app my-app
cd my-app
npm start
                      </CodeBlock>
                      <div className="pros-cons mt-2">
                        <div className="pros mb-2">
                          <strong style={{color: 'green'}}>المميزات:</strong>
                          <ul className="small">
                            <li>سهل جداً للمبتدئين</li>
                            <li>كل شيء معد مسبقاً</li>
                            <li>لا حاجة لإعدادات معقدة</li>
                          </ul>
                        </div>
                        <div className="cons">
                          <strong style={{color: 'orange'}}>العيوب:</strong>
                          <ul className="small">
                            <li>أبطأ قليلاً من Vite</li>
                            <li>ملفات إضافية لا تحتاجها</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="method-card p-3 mb-3" style={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px'}}>
                      <h5 style={{color: 'var(--text-secondary)'}}>Vite</h5>
                      <p>أسرع وأحدث</p>
                      <CodeBlock>
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
                      </CodeBlock>
                      <div className="pros-cons mt-2">
                        <div className="pros mb-2">
                          <strong style={{color: 'green'}}>المميزات:</strong>
                          <ul className="small">
                            <li>سريع جداً</li>
                            <li>تحديث فوري للصفحة</li>
                            <li>حديث ومتطور</li>
                          </ul>
                        </div>
                        <div className="cons">
                          <strong style={{color: 'orange'}}>العيوب:</strong>
                          <ul className="small">
                            <li>قد يحتاج إعدادات إضافية</li>
                            <li>أقل شيوعاً في الشروحات</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Alert variant="success">
                  <strong>توصيتنا للمبتدئين:</strong> ابدأ بـ Create React App، ثم انتقل لـ Vite عندما تصبح أكثر خبرة.
                </Alert>
              </Card.Body>
            </Card>

            {/* VS Code Setup */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">إعداد VS Code</h3>
                <p>Visual Studio Code هو أفضل محرر أكواد لتطوير React.</p>

                <div className="mb-4">
                  <h5 style={{color: 'var(--primary-color)'}}>تثبيت VS Code:</h5>
                  <p>اذهب إلى <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-color)'}}>code.visualstudio.com</a> وحمل النسخة المناسبة لنظامك</p>
                </div>

                <h5 style={{color: 'var(--primary-color)'}}>الإضافات الضرورية لـ React:</h5>
                <div className="extensions-list">
                  <Row>
                    <Col md={6}>
                      <div className="extension-item mb-3">
                        <h6><span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>extension</span>Prettier - Code formatter</h6>
                        <p className="small">تنسيق الكود تلقائياً</p>
                      </div>

                      <div className="extension-item mb-3">
                        <h6><span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>extension</span>GitLens</h6>
                        <p className="small">تحسينات Git داخل VS Code</p>
                      </div>

                      <div className="extension-item mb-3">
                        <h6><span className="material-icons me-2" style={{color: 'var(--primary-color)'}}>extension</span>Live Server</h6>
                        <p className="small">خادم محلي للملفات HTML</p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="installation-tip p-3" style={{backgroundColor: 'rgba(97, 218, 251, 0.1)', borderRadius: '8px'}}>
                  <h6 style={{color: 'var(--primary-color)'}}>💡 نصيحة التثبيت</h6>
                  <p>اذهب إلى Extensions (Ctrl+Shift+X) في VS Code وابحث عن كل إضافة بالاسم</p>
                </div>
              </Card.Body>
            </Card>

            {/* First Project */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">إنشاء أول مشروع React</h3>
                <p>الآن لننشئ أول مشروع React!</p>

                <div className="steps">
                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">1</Badge>
                      <h6 className="mb-0">افتح Terminal</h6>
                    </div>
                    <p>في VS Code: Terminal → New Terminal</p>
                    <p>أو استخدم Command Prompt / Terminal</p>
                  </div>

                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">2</Badge>
                      <h6 className="mb-0">اختر مجلد المشروع</h6>
                    </div>
                    <CodeBlock>
cd Desktop
mkdir react-projects
cd react-projects
                    </CodeBlock>
                  </div>

                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">3</Badge>
                      <h6 className="mb-0">أنشئ مشروع React</h6>
                    </div>
                    <CodeBlock>
npx create-react-app my-first-react-app
                    </CodeBlock>
                    <p className="small text-muted">هذا قد يستغرق بضع دقائق...</p>
                  </div>

                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">4</Badge>
                      <h6 className="mb-0">ادخل إلى المشروع وشغله</h6>
                    </div>
                    <CodeBlock>
cd my-first-react-app
npm start
                    </CodeBlock>
                    <p>سيفتح المتصفح تلقائياً على http://localhost:3000</p>
                  </div>

                  <div className="step-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">5</Badge>
                      <h6 className="mb-0">افتح المشروع في VS Code</h6>
                    </div>
                    <CodeBlock>
code .
                    </CodeBlock>
                    <p>أو File → Open Folder في VS Code</p>
                  </div>
                </div>

                <Alert variant="success">
                  <Alert.Heading>🎉 تهانينا!</Alert.Heading>
                  <p>إذا رأيت صفحة React الترحيبية في المتصفح، فقد نجحت في إعداد بيئة التطوير!</p>
                </Alert>
              </Card.Body>
            </Card>

            {/* Project Structure */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">فهم هيكل المشروع</h3>
                <p>دعنا نتعرف على الملفات والمجلدات في مشروع React:</p>

                <div className="folder-structure p-3" style={{backgroundColor: 'var(--darker-bg)', borderRadius: '8px', fontFamily: 'monospace'}}>
                  <div className="folder-item">📁 my-first-react-app/</div>
                  <div className="folder-item ms-3">📁 public/ <span className="text-muted">- الملفات العامة</span></div>
                  <div className="folder-item ms-4">📄 index.html <span className="text-muted">- الصفحة الرئيسية</span></div>
                  <div className="folder-item ms-4">📄 favicon.ico <span className="text-muted">- أيقونة الموقع</span></div>
                  <div className="folder-item ms-3">📁 src/ <span className="text-muted">- كود المصدر</span></div>
                  <div className="folder-item ms-4">📄 App.js <span className="text-muted">- المكون الرئيسي</span></div>
                  <div className="folder-item ms-4">📄 App.css <span className="text-muted">- تنسيقات App</span></div>
                  <div className="folder-item ms-4">📄 index.js <span className="text-muted">- نقطة البداية</span></div>
                  <div className="folder-item ms-4">📄 index.css <span className="text-muted">- التنسيقات العامة</span></div>
                  <div className="folder-item ms-3">📄 package.json <span className="text-muted">- معلومات المشروع</span></div>
                  <div className="folder-item ms-3">📁 node_modules/ <span className="text-muted">- المكتبات</span></div>
                </div>

                <div className="mt-3">
                  <h6 style={{color: 'var(--primary-color)'}}>الملفات المهمة:</h6>
                  <ul>
                    <li><strong>src/App.js:</strong> هنا ستكتب معظم كودك</li>
                    <li><strong>src/index.js:</strong> نقطة البداية للتطبيق</li>
                    <li><strong>public/index.html:</strong> الصفحة الأساسية</li>
                    <li><strong>package.json:</strong> قائمة المكتبات والإعدادات</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Troubleshooting */}
            <Card className="tutorial-card mb-4">
              <Card.Body>
                <h3 className="tutorial-title">حل المشاكل الشائعة</h3>
                
                <div className="problem-item mb-4">
                  <h6 style={{color: 'var(--primary-color)'}}>❌ 'npx' is not recognized</h6>
                  <p><strong>السبب:</strong> Node.js غير مثبت أو غير مضاف لـ PATH</p>
                  <p><strong>الحل:</strong> أعد تثبيت Node.js وأعد تشغيل Terminal</p>
                </div>

                <div className="problem-item mb-4">
                  <h6 style={{color: 'var(--primary-color)'}}>❌ Permission denied</h6>
                  <p><strong>السبب:</strong> مشكلة في الصلاحيات (Mac/Linux)</p>
                  <p><strong>الحل:</strong> استخدم sudo أو غير مجلد المشروع</p>
                </div>

                <div className="problem-item mb-4">
                  <h6 style={{color: 'var(--primary-color)'}}>❌ Port 3000 is already in use</h6>
                  <p><strong>السبب:</strong> يوجد تطبيق آخر يستخدم المنفذ 3000</p>
                  <p><strong>الحل:</strong> أغلق التطبيق الآخر أو استخدم منفذ مختلف</p>
                </div>

                <div className="problem-item mb-4">
                  <h6 style={{color: 'var(--primary-color)'}}>❌ Network timeout</h6>
                  <p><strong>السبب:</strong> مشكلة في الاتصال بالإنترنت</p>
                  <p><strong>الحل:</strong> تأكد من الاتصال أو استخدم VPN</p>
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EnvironmentSetup;