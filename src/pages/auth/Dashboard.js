import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useReduxProgress, useUserStats } from '../../hooks/useRedux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { currentProgress, syncToCloud, syncStatus, lastSync } = useReduxProgress();
  const { stats } = useUserStats();

  // إعادة توجيه إذا لم يكن مسجل الدخول
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSyncNow = async () => {
    try {
      await syncToCloud();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  if (!isAuthenticated || !user) {
    return null; // أو مكون Loading
  }

  const sections = [
    { id: 'frontend-basics', title: 'أساسيات تطوير الواجهات', path: '/frontend-basics' },
    { id: 'react-introduction', title: 'مقدمة عن React', path: '/react-introduction' },
    { id: 'environment-setup', title: 'إعداد بيئة التطوير', path: '/environment-setup' },
    { id: 'core-concepts', title: 'المفاهيم الأساسية', path: '/core-concepts' },
    { id: 'todo-project', title: 'مشروع قائمة المهام', path: '/todo-project' },
    { id: 'next-steps', title: 'الخطوات التالية', path: '/next-steps' }
  ];

  return (
    <div className="section">
      <Container className="py-5">
        {/* ترحيب */}
        <Row className="mb-5">
          <Col>
            <div className="feature-card text-center" style={{background: 'linear-gradient(135deg, rgba(97, 218, 251, 0.1), rgba(40, 167, 69, 0.1))'}}>
              <h2 className="section-title">مرحباً، {user.name}! 👋</h2>
              <p className="lead">
                أهلاً بك في لوحة تحكم مطور. تابع رحلة تعلمك وراقب تقدمك.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
                <Badge bg="primary" className="p-2">
                  <span className="material-icons me-1">emoji_events</span>
                  {stats.totalPoints} نقطة
                </Badge>
                <Badge bg="success" className="p-2">
                  <span className="material-icons me-1">check_circle</span>
                  {stats.completedSections} دروس مكتملة
                </Badge>
                <Badge bg="info" className="p-2">
                  <span className="material-icons me-1">calendar_today</span>
                  عضو منذ {new Date(user.joinDate).toLocaleDateString('ar-SA')}
                </Badge>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {/* إحصائيات سريعة */}
          <Col lg={4} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body>
                <h4 style={{color: 'var(--primary-color)'}}>📊 إحصائياتك</h4>
                
                <div className="stat-item mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span>تقدم التعلم</span>
                    <strong>{Math.round((currentProgress.length / sections.length) * 100)}%</strong>
                  </div>
                  <ProgressBar 
                    now={(currentProgress.length / sections.length) * 100}
                    variant="info"
                    style={{height: '8px'}}
                  />
                </div>

                <div className="stat-item mb-3">
                  <div className="d-flex justify-content-between">
                    <span>النقاط الإجمالية:</span>
                    <strong style={{color: 'var(--primary-color)'}}>{stats.totalPoints}</strong>
                  </div>
                </div>

                <div className="stat-item mb-3">
                  <div className="d-flex justify-content-between">
                    <span>الدروس المكتملة:</span>
                    <strong>{stats.completedSections} من {sections.length}</strong>
                  </div>
                </div>

                <div className="stat-item mb-3">
                  <div className="d-flex justify-content-between">
                    <span>الإنجازات:</span>
                    <strong>{stats.achievements.length}</strong>
                  </div>
                </div>

                <hr />

                <div className="sync-info">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>حالة المزامنة:</span>
                    <Badge bg={syncStatus === 'success' ? 'success' : syncStatus === 'error' ? 'danger' : 'warning'}>
                      {syncStatus === 'success' && '✓ محدث'}
                      {syncStatus === 'error' && '✗ خطأ'}
                      {syncStatus === 'syncing' && '⏳ جاري المزامنة'}
                      {syncStatus === 'idle' && '⏸ في الانتظار'}
                    </Badge>
                  </div>
                  
                  {lastSync && (
                    <small className="text-muted">
                      آخر مزامنة: {new Date(lastSync).toLocaleString('ar-SA')}
                    </small>
                  )}
                  
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="w-100 mt-2"
                    onClick={handleSyncNow}
                    disabled={syncStatus === 'syncing'}
                  >
                    <span className="material-icons me-1">sync</span>
                    مزامنة الآن
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* تقدم الدروس */}
          <Col lg={8} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body>
                <h4 style={{color: 'var(--primary-color)'}}>📚 تقدم الدروس</h4>
                
                <div className="lessons-progress">
                  {sections.map((section, index) => {
                    const isCompleted = currentProgress.includes(section.id);
                    return (
                      <div key={section.id} className="lesson-item mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div 
                              className={`rounded-circle d-flex align-items-center justify-content-center me-3`}
                              style={{
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: isCompleted ? '#28a745' : 'var(--border-color)',
                                color: isCompleted ? 'white' : 'var(--text-secondary)'
                              }}
                            >
                              {isCompleted ? (
                                <span className="material-icons">check</span>
                              ) : (
                                <strong>{index + 1}</strong>
                              )}
                            </div>
                            <div>
                              <h6 className="mb-1">{section.title}</h6>
                              <small className="text-muted">
                                {isCompleted ? 'مكتمل ✓' : 'لم يكتمل بعد'}
                              </small>
                            </div>
                          </div>
                          
                          <Link 
                            to={section.path} 
                            className={`btn ${isCompleted ? 'btn-outline-success' : 'btn-primary'} btn-sm`}
                          >
                            {isCompleted ? 'مراجعة' : 'ابدأ'}
                            <span className="material-icons ms-1">arrow_back</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <hr />

                <div className="quick-actions d-flex gap-2 flex-wrap">
                  <Link to="/frontend-basics" className="btn btn-primary">
                    <span className="material-icons me-1">play_arrow</span>
                    متابعة التعلم
                  </Link>
                  <Link to="/" className="btn btn-outline-light">
                    <span className="material-icons me-1">home</span>
                    الرئيسية
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* الإنجازات */}
        {stats.achievements.length > 0 && (
          <Row className="mb-4">
            <Col>
              <Card className="feature-card">
                <Card.Body>
                  <h4 style={{color: 'var(--primary-color)'}}>🏆 إنجازاتك</h4>
                  <div className="achievements-list">
                    {stats.achievements.map((achievement, index) => (
                      <Badge key={index} bg="warning" className="me-2 mb-2 p-2">
                        <span className="material-icons me-1">star</span>
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* خيارات الحساب */}
        <Row>
          <Col>
            <Card className="feature-card">
              <Card.Body>
                <h4 style={{color: 'var(--primary-color)'}}>⚙️ إعدادات الحساب</h4>
                
                <div className="d-flex gap-3 flex-wrap">
                  <Button variant="outline-light">
                    <span className="material-icons me-1">person</span>
                    تعديل الملف الشخصي
                  </Button>
                  
                  <Button variant="outline-light">
                    <span className="material-icons me-1">settings</span>
                    الإعدادات
                  </Button>
                  
                  <Button variant="outline-danger" onClick={handleLogout}>
                    <span className="material-icons me-1">logout</span>
                    تسجيل الخروج
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;