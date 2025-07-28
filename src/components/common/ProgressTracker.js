import React from 'react';
import { ProgressBar, Badge, Alert } from 'react-bootstrap';
import { useAuth, useReduxProgress } from '../../hooks/useRedux';

const ProgressTracker = ({ className = "" }) => {
  const { isAuthenticated, user } = useAuth();
  const { progressPercentage, syncStatus, currentProgress } = useReduxProgress();

  if (progressPercentage === 0) {
    return null; // لا نعرض شيء إذا لم يكن هناك تقدم
  }

  return (
    <div className={`progress-section ${className}`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">
          {isAuthenticated ? (
            <>
              مرحباً، {user?.name} - تقدم التعلم
              {user?.points > 0 && (
                <Badge bg="warning" className="ms-2">
                  {user.points} نقطة
                </Badge>
              )}
            </>
          ) : (
            'تقدم التعلم'
          )}
        </h6>
        <div className="d-flex align-items-center gap-2">
          <small>{progressPercentage}% مكتمل</small>
          {isAuthenticated && (
            <Badge 
              bg={syncStatus === 'success' ? 'success' : syncStatus === 'error' ? 'danger' : 'warning'}
              className="small"
            >
              {syncStatus === 'success' && '☁️'}
              {syncStatus === 'error' && '⚠️'}
              {syncStatus === 'syncing' && '⏳'}
            </Badge>
          )}
        </div>
      </div>
      
      <ProgressBar 
        now={progressPercentage} 
        variant="info" 
        style={{backgroundColor: 'var(--card-bg)'}}
        className="mb-2"
      />

      <div className="d-flex justify-content-between align-items-center">
        <small className="text-muted">
          {currentProgress.length} من 6 دروس مكتملة
        </small>
        
        {!isAuthenticated && progressPercentage > 0 && (
          <small className="text-muted">
            💡 <a href="/register" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>
              سجل حساب
            </a> لحفظ تقدمك
          </small>
        )}
      </div>

      {/* رسائل التشجيع */}
      {progressPercentage >= 50 && progressPercentage < 100 && (
        <Alert variant="info" className="mt-2 mb-0 small">
          <strong>ممتاز!</strong> أنت في منتصف الطريق. استمر! 🚀
        </Alert>
      )}

      {progressPercentage === 100 && (
        <Alert variant="success" className="mt-2 mb-0 small">
          <strong>تهانينا!</strong> 🎉 لقد أكملت جميع الدروس! 
          {isAuthenticated && ` حصلت على ${user?.points || 0} نقطة إجمالية.`}
        </Alert>
      )}
    </div>
  );
};

export default ProgressTracker;