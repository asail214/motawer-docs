import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const AchievementNotification = ({ achievement, points, show, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // إخفاء التوست بعد 4 ثوانٍ
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // انتظار انتهاء الأنيميشن
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <ToastContainer 
      position="top-start" 
      className="p-3"
      style={{zIndex: 9999}}
    >
      <Toast 
        show={isVisible} 
        onClose={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="achievement-toast"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderLeft: '4px solid var(--primary-color)',
          boxShadow: '0 4px 12px rgba(97, 218, 251, 0.3)'
        }}
      >
        <Toast.Header style={{backgroundColor: 'var(--darker-bg)', color: 'var(--text-primary)'}}>
          <span className="material-icons me-2" style={{color: '#ffc107'}}>
            emoji_events
          </span>
          <strong className="me-auto">إنجاز جديد!</strong>
        </Toast.Header>
        
        <Toast.Body style={{color: 'var(--text-primary)'}}>
          <div className="d-flex align-items-center">
            <div className="achievement-icon me-3">
              <span className="material-icons" style={{fontSize: '2rem', color: '#ffc107'}}>
                star
              </span>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1" style={{color: 'var(--primary-color)'}}>
                {achievement}
              </h6>
              {points > 0 && (
                <small className="text-muted">
                  +{points} نقطة
                </small>
              )}
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

// Hook لإدارة الإنجازات
export const useAchievements = () => {
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const showAchievement = (achievement, points = 0) => {
    setCurrentAchievement({ achievement, points, show: true });
  };

  const hideAchievement = () => {
    setCurrentAchievement(null);
  };

  return {
    currentAchievement,
    showAchievement,
    hideAchievement
  };
};

export default AchievementNotification;