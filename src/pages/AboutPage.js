import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <Col lg={4} className="mb-4">
    <div className="feature-card">
      <div className="feature-icon material-icons">{icon}</div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </Col>
);

const AboutPage = () => {
  return (
    <div className="section">
      <Container className="py-5">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="section-title">من نحن</h1>
            <p className="text-muted">تعرف على مشروع مطور وأهدافنا</p>
          </Col>
        </Row>

        <Row className="align-items-center mb-5">
          <Col lg={6}>
            <h2 style={{color: 'var(--primary-color)'}}>رؤيتنا</h2>
            <p className="lead">
              نسعى لجعل تعلم تطوير الويب باستخدام React أكثر سهولة ووضوحًا للمطورين العرب 
              من خلال توفير محتوى عالي الجودة باللغة العربية.
            </p>
            
            <h3 style={{color: 'var(--primary-color)', marginTop: '2rem'}}>أهدافنا</h3>
            <ul>
              <li>توفير مصدر شامل لتعلم React باللغة العربية</li>
              <li>تبسيط المفاهيم المعقدة للمبتدئين</li>
              <li>بناء مجتمع قوي من المطورين العرب</li>
              <li>مواكبة أحدث التطورات في عالم React</li>
              <li>توفير أمثلة عملية وتطبيقات حقيقية</li>
            </ul>
          </Col>
          <Col lg={6}>
            <div className="feature-card">
              <h4>إحصائيات المشروع</h4>
              <Row className="text-center">
                <Col xs={4}>
                  <h2 style={{color: 'var(--primary-color)'}}>50+</h2>
                  <p>درس تفاعلي</p>
                </Col>
                <Col xs={4}>
                  <h2 style={{color: 'var(--primary-color)'}}>100+</h2>
                  <p>مثال عملي</p>
                </Col>
                <Col xs={4}>
                  <h2 style={{color: 'var(--primary-color)'}}>1000+</h2>
                  <p>طالب</p>
                </Col>
              </Row>
              <hr style={{borderColor: 'var(--border-color)'}} />
              <Row className="text-center">
                <Col xs={6}>
                  <h3 style={{color: 'var(--primary-color)'}}>24/7</h3>
                  <p>دعم فني</p>
                </Col>
                <Col xs={6}>
                  <h3 style={{color: 'var(--primary-color)'}}>5★</h3>
                  <p>تقييم المستخدمين</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={12}>
            <h2 className="text-center mb-4" style={{color: 'var(--primary-color)'}}>لماذا React؟</h2>
          </Col>
          <FeatureCard
            icon="speed"
            title="الأداء السريع"
            description="React تستخدم Virtual DOM مما يجعل التطبيقات سريعة ومتجاوبة"
          />
          <FeatureCard
            icon="build"
            title="قابلية إعادة الاستخدام"
            description="يمكن تقسيم الواجهة إلى مكونات صغيرة قابلة لإعادة الاستخدام"
          />
          <FeatureCard
            icon="group"
            title="مجتمع كبير"
            description="React لها مجتمع ضخم من المطورين والمكتبات المساعدة"
          />
        </Row>

        <Row className="mb-5">
          <Col xs={12}>
            <h2 className="text-center mb-4" style={{color: 'var(--primary-color)'}}>مميزات منصة مطور</h2>
          </Col>
          <FeatureCard
            icon="language"
            title="المحتوى العربي"
            description="أول منصة شاملة لتعلم React باللغة العربية مع أمثلة محلية"
          />
          <FeatureCard
            icon="play_circle_filled"
            title="تعلم تفاعلي"
            description="دروس تفاعلية مع إمكانية تجربة الكود مباشرة في المتصفح"
          />
          <FeatureCard
            icon="trending_up"
            title="مسار تعليمي متدرج"
            description="منهج مصمم بعناية ينقلك من المبتدئ إلى المحترف خطوة بخطوة"
          />
        </Row>

        <Row className="mb-5">
          <Col lg={6}>
            <div className="feature-card">
              <h3>مهمتنا</h3>
              <p>
                نؤمن بأن التعليم يجب أن يكون متاحًا للجميع بلغتهم الأم. لذلك قمنا بإنشاء 
                مطور لتكون المرجع الأول للمطورين العرب الراغبين في تعلم React والتطوير 
                الحديث للواجهات الأمامية.
              </p>
              <p>
                نسعى لبناء جيل جديد من المطورين العرب المتمكنين من أحدث التقنيات، 
                والقادرين على المنافسة في سوق العمل العالمي.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="feature-card">
              <h3>قيمنا</h3>
              <ul>
                <li><strong>الجودة:</strong> نقدم محتوى عالي الجودة ومراجع بدقة</li>
                <li><strong>البساطة:</strong> نبسط المفاهيم المعقدة لتكون مفهومة للجميع</li>
                <li><strong>العملية:</strong> نركز على التطبيق العملي والمشاريع الحقيقية</li>
                <li><strong>المجتمع:</strong> نؤمن بقوة التعلم الجماعي والمشاركة</li>
                <li><strong>الاستمرارية:</strong> نحدث المحتوى باستمرار ليواكب التطورات</li>
              </ul>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="text-center">
            <div className="feature-card">
              <h3>انضم إلى رحلة التعلم</h3>
              <p className="mb-4">
                ابدأ تعلم React الآن وكن جزءًا من مجتمع المطورين العرب. 
                معنا ستتعلم ليس فقط React، بل ستطور مهاراتك في البرمجة والتفكير المنطقي.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/home" className="btn btn-primary btn-lg">
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                    school
                  </span>
                  ابدأ التعلم الآن
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg">
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>
                    contact_support
                  </span>
                  تواصل معنا
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Timeline Section */}
        <Row className="mt-5">
          <Col xs={12}>
            <h2 className="text-center mb-4" style={{color: 'var(--primary-color)'}}>خارطة الطريق</h2>
            <div className="feature-card">
              <Row>
                <Col md={6}>
                  <h4 style={{color: 'var(--primary-color)'}}>المرحلة الحالية</h4>
                  <ul>
                    <li>✅ إطلاق الموقع والدروس الأساسية</li>
                    <li>✅ شرح مفاهيم React الأساسية</li>
                    <li>✅ أمثلة تطبيقية متنوعة</li>
                    <li>🔄 إضافة المزيد من الدروس المتقدمة</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h4 style={{color: 'var(--primary-color)'}}>الخطوات القادمة</h4>
                  <ul>
                    <li>📅 إضافة نظام الشهادات</li>
                    <li>📅 مشاريع تطبيقية شاملة</li>
                    <li>📅 منتدى للمجتمع</li>
                    <li>📅 فيديوهات تعليمية</li>
                    <li>📅 تطبيق موبايل</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;