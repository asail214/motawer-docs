import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

// Auth hooks
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  checkAuthStatus,
  clearError,
  updateUserPoints,
  addAchievement 
} from '../store/slices/authSlice';

// Progress hooks
import {
  markSectionCompleted,
  markSectionIncomplete,
  loadLocalProgress,
  syncProgressToCloud,
  loadCloudProgress,
  migrateLocalToCloud,
  resetProgress
} from '../store/slices/progressSlice';

// Custom hook للمصادقة
export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  
  // دوال المصادقة
  const login = useCallback((credentials) => {
    return dispatch(loginUser(credentials));
  }, [dispatch]);
  
  const register = useCallback((userData) => {
    return dispatch(registerUser(userData));
  }, [dispatch]);
  
  const logout = useCallback(() => {
    return dispatch(logoutUser());
  }, [dispatch]);
  
  const checkAuth = useCallback(() => {
    return dispatch(checkAuthStatus());
  }, [dispatch]);
  
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);
  
  const addPoints = useCallback((points) => {
    dispatch(updateUserPoints(points));
  }, [dispatch]);
  
  const addUserAchievement = useCallback((achievement) => {
    dispatch(addAchievement(achievement));
  }, [dispatch]);
  
  // فحص المصادقة عند التحميل
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return {
    // البيانات
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    lastLoginTime: authState.lastLoginTime,
    
    // الدوال
    login,
    register,
    logout,
    checkAuth,
    clearAuthError,
    addPoints,
    addUserAchievement,
  };
};

// Custom hook للتقدم
export const useReduxProgress = () => {
  const dispatch = useDispatch();
  const progressState = useSelector((state) => state.progress);
  const authState = useSelector((state) => state.auth);
  
  // دوال التقدم
  const markCompleted = useCallback((sectionId) => {
    dispatch(markSectionCompleted(sectionId));
  }, [dispatch]);
  
  const markIncomplete = useCallback((sectionId) => {
    dispatch(markSectionIncomplete(sectionId));
  }, [dispatch]);
  
  const syncToCloud = useCallback(() => {
    if (authState.isAuthenticated) {
      return dispatch(syncProgressToCloud());
    }
  }, [dispatch, authState.isAuthenticated]);
  
  const loadFromCloud = useCallback(() => {
    return dispatch(loadCloudProgress());
  }, [dispatch]);
  
  const migrateToCloud = useCallback(() => {
    return dispatch(migrateLocalToCloud());
  }, [dispatch]);
  
  const resetAllProgress = useCallback(() => {
    dispatch(resetProgress());
  }, [dispatch]);
  
  // تحميل التقدم المحلي عند البداية
  useEffect(() => {
    dispatch(loadLocalProgress());
  }, [dispatch]);
  
  // تحميل التقدم السحابي عند تسجيل الدخول
  useEffect(() => {
    if (authState.isAuthenticated) {
      loadFromCloud();
    }
  }, [authState.isAuthenticated, loadFromCloud]);
  
  // حساب التقدم الحالي (محلي + سحابي)
  const getCurrentProgress = useCallback(() => {
    const allProgress = authState.isAuthenticated 
      ? [...new Set([...progressState.localProgress, ...progressState.cloudProgress])]
      : progressState.localProgress;
    
    return allProgress;
  }, [progressState.localProgress, progressState.cloudProgress, authState.isAuthenticated]);
  
  // فحص إذا كان القسم مكتمل
  const isCompleted = useCallback((sectionId) => {
    const currentProgress = getCurrentProgress();
    return currentProgress.includes(sectionId);
  }, [getCurrentProgress]);
  
  // حساب النسبة المئوية
  const getProgressPercentage = useCallback(() => {
    const sections = [
      'frontend-basics',
      'react-introduction', 
      'environment-setup',
      'core-concepts',
      'todo-project',
      'next-steps'
    ];
    
    const currentProgress = getCurrentProgress();
    return Math.round((currentProgress.length / sections.length) * 100);
  }, [getCurrentProgress]);
  
  return {
    // البيانات
    localProgress: progressState.localProgress,
    cloudProgress: progressState.cloudProgress,
    currentProgress: getCurrentProgress(),
    syncStatus: progressState.syncStatus,
    lastSync: progressState.lastSync,
    isOnline: progressState.isOnline,
    progressPercentage: getProgressPercentage(),
    
    // الدوال
    markCompleted,
    markIncomplete,
    isCompleted,
    syncToCloud,
    loadFromCloud,
    migrateToCloud,
    resetAllProgress,
  };
};

// Hook للإحصائيات
export const useUserStats = () => {
  const { user, isAuthenticated } = useAuth();
  const { currentProgress } = useReduxProgress();
  
  const stats = {
    totalPoints: user?.points || 0,
    completedSections: currentProgress.length,
    achievements: user?.achievements || [],
    joinDate: user?.joinDate,
    streakDays: 0, // سنحسبها لاحقاً
    totalTime: 0, // سنحسبها لاحقاً
  };
  
  return {
    isAuthenticated,
    stats,
  };
};

// Hook لحالة التطبيق العامة
export const useAppState = () => {
  const auth = useAuth();
  const progress = useReduxProgress();
  const stats = useUserStats();
  
  return {
    auth,
    progress,
    stats,
  };
};