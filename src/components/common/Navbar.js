import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth, useReduxProgress } from '../../hooks/useRedux';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { progressPercentage, syncStatus } = useReduxProgress();

  const handleLogout = async () => {
    try {
      await logout();
      // سيتم توجيه المستخدم تلقائياً في صفحة Dashboard
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="custom-navbar" 
      fixed="top"
      variant="dark"
    >
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand className="d-flex align-items-center">
            {/* Logo Image */}
            <img 
              src="/logo-dark.png" 
              alt="مطور" 
              style={{
                height: '40px',
                width: 'auto',
                marginLeft: '0.5rem'
              }}
            />
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>الرئيسية</Nav.Link>
            </LinkContainer>
            
            <NavDropdown title="التعلم" id="learning-dropdown">
              <LinkContainer to="/frontend-basics">
                <NavDropdown.Item>أساسيات تطوير الواجهات</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/react-introduction">
                <NavDropdown.Item>مقدمة عن React</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/environment-setup">
                <NavDropdown.Item>إعداد بيئة التطوير</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/core-concepts">
                <NavDropdown.Item>المفاهيم الأساسية</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/todo-project">
                <NavDropdown.Item>مشروع قائمة المهام</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/next-steps">
                <NavDropdown.Item>الخطوات التالية</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            
            <LinkContainer to="/contact">
              <Nav.Link>تواصل معي</Nav.Link>
            </LinkContainer>
          </Nav>

          {/* الجزء الأيسر من Navbar - حالة المصادقة */}
          <Nav className="ms-auto">
            {/* عرض التقدم للجميع */}
            {progressPercentage > 0 && (
              <Nav.Item className="d-flex align-items-center me-3">
                <span className="me-2 small">التقدم: {progressPercentage}%</span>
                <div 
                  style={{
                    width: '60px',
                    height: '6px',
                    backgroundColor: 'var(--border-color)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercentage}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary-color)',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </Nav.Item>
            )}

            {isAuthenticated ? (
              // المستخدم مسجل الدخول
              <>
                {/* حالة المزامنة */}
                {syncStatus !== 'idle' && (
                  <Nav.Item className="d-flex align-items-center me-2">
                    <Badge 
                      bg={syncStatus === 'success' ? 'success' : syncStatus === 'error' ? 'danger' : 'warning'}
                      className="small"
                    >
                      {syncStatus === 'success' && '☁️ محفوظ'}
                      {syncStatus === 'error' && '⚠️ خطأ'}
                      {syncStatus === 'syncing' && '⏳ مزامنة'}
                    </Badge>
                  </Nav.Item>
                )}

                {/* معلومات المستخدم */}
                <NavDropdown 
                  title={
                    <span className="d-flex align-items-center">
                      <span className="material-icons me-1">person</span>
                      {user?.name || 'المستخدم'}
                      {user?.points > 0 && (
                        <Badge bg="warning" className="ms-2 small">
                          {user.points} نقطة
                        </Badge>
                      )}
                    </span>
                  } 
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Header>
                    <div className="text-center">
                      <strong>{user?.name}</strong>
                      <br />
                      <small className="text-muted">{user?.email}</small>
                      {user?.points > 0 && (
                        <div className="mt-1">
                          <Badge bg="warning">{user.points} نقطة</Badge>
                        </div>
                      )}
                    </div>
                  </NavDropdown.Header>
                  
                  <NavDropdown.Divider />
                  
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>
                      <span className="material-icons me-2">dashboard</span>
                      لوحة التحكم
                    </NavDropdown.Item>
                  </LinkContainer>
                  
                  <NavDropdown.Item>
                    <span className="material-icons me-2">person</span>
                    الملف الشخصي
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item>
                    <span className="material-icons me-2">analytics</span>
                    الإحصائيات
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item>
                    <span className="material-icons me-2">settings</span>
                    الإعدادات
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item onClick={handleLogout}>
                    <span className="material-icons me-2">logout</span>
                    تسجيل الخروج
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              // المستخدم غير مسجل الدخول
              <>
                {/* رسالة تشجيعية للتسجيل */}
                {progressPercentage > 0 && (
                  <Nav.Item className="d-flex align-items-center me-3">
                    <small className="text-muted">
                      💡 سجل دخولك لحفظ تقدمك
                    </small>
                  </Nav.Item>
                )}

                <LinkContainer to="/login">
                  <Nav.Link className="btn btn-outline-light btn-sm me-2">
                    <span className="material-icons me-1" style={{fontSize: '16px'}}>login</span>
                    تسجيل الدخول
                  </Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/register">
                  <Nav.Link className="btn btn-primary btn-sm">
                    <span className="material-icons me-1" style={{fontSize: '16px'}}>person_add</span>
                    إنشاء حساب
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;