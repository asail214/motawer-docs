// src/components/ui/ProgressStatus.js - مكون لعرض حالة المزامنة
import React from 'react';
import { Alert, Badge, Button } from 'react-bootstrap';
import { useProgress } from '../../context/ProgressContext';

const ProgressStatus = () => {
  const { 
    syncing, 
    lastSync, 
    error, 
    isOnline, 
    manualSync,
    progressPercentage,
    completedCount,
    totalSections
  } = useProgress();

  const getStatusVariant = () => {
    if (error) return 'danger';
    if (syncing) return 'warning';
    if (isOnline && lastSync) return 'success';
    return 'secondary';
  };

  const getStatusText = () => {
    if (error) return 'خطأ في المزامنة';
    if (syncing) return 'جاري المزامنة...';
    if (isOnline && lastSync) return 'متزامن';
    if (!isOnline) return 'غير متصل';
    return 'غير متزامن';
  };

  const formatLastSync = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'الآن';
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <div className="progress-status mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <strong>التقدم: {progressPercentage}%</strong>
          <Badge bg={getStatusVariant()}>{getStatusText()}</Badge>
          {!isOnline && (
            <Badge bg="secondary">
              <span className="material-icons me-1" style={{fontSize: '12px'}}>wifi_off</span>
              غير متصل
            </Badge>
          )}
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <small className="text-muted">
            {completedCount}/{totalSections} دروس
          </small>
          
          {isOnline && !syncing && (
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={manualSync}
              title="مزامنة يدوية"
            >
              <span className="material-icons" style={{fontSize: '16px'}}>sync</span>
            </Button>
          )}
        </div>
      </div>
      
      {error && (
        <Alert variant="danger" className="py-2 mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <span>{error}</span>
            <Button variant="outline-danger" size="sm" onClick={manualSync}>
              إعادة المحاولة
            </Button>
          </div>
        </Alert>
      )}
      
      {lastSync && (
        <small className="text-muted">
          آخر مزامنة: {formatLastSync(lastSync)}
        </small>
      )}
    </div>
  );
};

export default ProgressStatus;