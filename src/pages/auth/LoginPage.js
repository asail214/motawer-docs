import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useRedux';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearAuthError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  // إعادة توجيه إذا كان مسجل الدخول بالفعل
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // مسح الأخطاء عند تغيير البيانات
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearAuthError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearAuthError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password
      });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="section">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <Card className="feature-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="section-title">تسجيل الدخول</h2>
                  <p className="text-muted">
                    ادخل إلى حسابك لحفظ تقدمك والحصول على مميزات إضافية
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <Alert.Heading>خطأ في تسجيل الدخول</Alert.Heading>
                    <p>{error}</p>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ادخل بريدك الإلكتروني"
                      required
                      disabled={isLoading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>كلمة المرور</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="ادخل كلمة المرور"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="position-absolute end-0 top-50 translate-middle-y me-2"
                        style={{ border: 'none', background: 'transparent' }}
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        <span className="material-icons">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </Button>
                    </div>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100 mb-3"
                    disabled={isLoading || !formData.email || !formData.password}
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        جاري تسجيل الدخول...
                      </>
                    ) : (
                      <>
                        <span className="material-icons me-2">login</span>
                        تسجيل الدخول
                      </>
                    )}
                  </Button>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-2">لا تملك حساب؟</p>
                  <Link to="/register" className="btn btn-outline-light">
                    <span className="material-icons me-2">person_add</span>
                    إنشاء حساب جديد
                  </Link>
                </div>

                <div className="text-center mt-4">
                  <Link to="/" className="text-decoration-none">
                    <span className="material-icons me-1">arrow_forward</span>
                    العودة للرئيسية
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* معلومات إضافية */}
        <Row className="justify-content-center mt-4">
          <Col lg={8}>
            <div className="feature-card text-center">
              <h5 style={{color: 'var(--primary-color)'}}>🌟 مميزات الحساب المسجل</h5>
              <Row className="mt-3">
                <Col md={4}>
                  <div className="d-flex flex-column align-items-center">
                    <span className="material-icons mb-2" style={{color: 'var(--primary-color)', fontSize: '2rem'}}>
                      cloud_sync
                    </span>
                    <strong>حفظ سحابي</strong>
                    <small className="text-muted">تقدمك محفوظ بشكل دائم</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex flex-column align-items-center">
                    <span className="material-icons mb-2" style={{color: 'var(--primary-color)', fontSize: '2rem'}}>
                      emoji_events
                    </span>
                    <strong>نظام النقاط</strong>
                    <small className="text-muted">اكسب نقاط مع كل إنجاز</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex flex-column align-items-center">
                    <span className="material-icons mb-2" style={{color: 'var(--primary-color)', fontSize: '2rem'}}>
                      analytics
                    </span>
                    <strong>إحصائيات مفصلة</strong>
                    <small className="text-muted">تتبع تقدمك بدقة</small>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;