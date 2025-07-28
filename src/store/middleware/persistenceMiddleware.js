import { markSectionCompleted, syncProgressToCloud } from '../slices/progressSlice';
import { updateUserPoints } from '../slices/authSlice';

// Middleware للحفظ التلقائي
export const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // عند إكمال قسم جديد
  if (markSectionCompleted.match(action)) {
    const state = store.getState();
    
    // إذا كان المستخدم مسجل الدخول
    if (state.auth.isAuthenticated) {
      // إضافة نقاط
      store.dispatch(updateUserPoints(10));
      
      // مزامنة مع السحابة بعد 3 ثوانٍ
      setTimeout(() => {
        if (state.progress.isOnline) {
          store.dispatch(syncProgressToCloud());
        }
      }, 3000);
    }
  }
  
  return result;
};

// مراقبة حالة الاتصال
export const setupOnlineStatusMonitoring = (store) => {
  const handleOnline = () => {
    store.dispatch({ type: 'progress/setOnlineStatus', payload: true });
    // مزامنة عند العودة للاتصال
    const state = store.getState();
    if (state.auth.isAuthenticated) {
      store.dispatch(syncProgressToCloud());
    }
  };
  
  const handleOffline = () => {
    store.dispatch({ type: 'progress/setOnlineStatus', payload: false });
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};
