import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useReduxProgress } from '../../hooks/useRedux';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, isAuthenticated, clearAuthError } = useAuth();
  const { migrateToCloud } = useReduxProgress();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
    
    // مسح أخطاء الحقل عند التغيير
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'الاسم مطلوب';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'الاسم يجب أن يكون حرفين على الأقل';
    }
    
    if (!formData.email) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'كلمة المرور غير متطابقة';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password
      });
      
      // ترحيل التقدم المحلي للحساب الجديد
      await migrateToCloud();
      
    } catch (err) {
      console.error('Registration failed:', err);
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
                  <h2 className="section-title">إنشاء حساب جديد</h2>
                  <p className="text-muted">
                    انضم إلى مطور واحصل على مميزات إضافية لتحسين رحلة التعلم
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <Alert.Heading>خطأ في التسجيل</Alert.Heading>
                    <p>{error}</p>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>الاسم الكامل</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ادخل اسمك الكامل"
                      required
                      disabled={isLoading}
                      isInvalid={!!formErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

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
                      isInvalid={!!formErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>كلمة المرور</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="ادخل كلمة مرور قوية"
                        required
                        disabled={isLoading}
                        isInvalid={!!formErrors.password}
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
                    <Form.Control.Feedback type="invalid">
                      {formErrors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>تأكيد كلمة المرور</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="أعد إدخال كلمة المرور"
                      required
                      disabled={isLoading}
                      isInvalid={!!formErrors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        جاري إنشاء الحساب...
                      </>
                    ) : (
                      <>
                        <span className="material-icons me-2">person_add</span>
                        إنشاء الحساب
                      </>
                    )}
                  </Button>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-2">لديك حساب بالفعل؟</p>
                  <Link to="/login" className="btn btn-outline-light">
                    <span className="material-icons me-2">login</span>
                    تسجيل الدخول
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

        {/* شروط الخدمة */}
        <Row className="justify-content-center mt-4">
          <Col lg={8}>
            <div className="text-center">
              <small className="text-muted">
                بإنشاء حساب، فإنك توافق على 
                <Link to="/terms" className="text-decoration-none mx-1" style={{color: 'var(--primary-color)'}}>
                  شروط الخدمة
                </Link>
                و
                <Link to="/privacy" className="text-decoration-none mx-1" style={{color: 'var(--primary-color)'}}>
                  سياسة الخصوصية
                </Link>
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;