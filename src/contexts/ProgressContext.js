// src/context/ProgressContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { learningService } from '../services/learningService';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

const ProgressProvider = ({ children }) => {
  const [completedSections, setCompletedSections] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Generate or get user ID
  const [userId] = useState(() => {
    let id = localStorage.getItem('motawer-user-id');
    if (!id) {
      id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('motawer-user-id', id);
    }
    return id;
  });

  const sections = [
    { id: 'frontend-basics', title: 'أساسيات تطوير الواجهات', path: '/frontend-basics' },
    { id: 'react-introduction', title: 'مقدمة عن React', path: '/react-introduction' },
    { id: 'environment-setup', title: 'إعداد بيئة التطوير', path: '/environment-setup' },
    { id: 'core-concepts', title: 'المفاهيم الأساسية', path: '/core-concepts' },
    { id: 'todo-project', title: 'مشروع قائمة المهام', path: '/todo-project' },
    { id: 'next-steps', title: 'الخطوات التالية', path: '/next-steps' }
  ];

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-sync when coming back online
      syncProgressToServer();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, [userId]);

  // Auto-save progress when it changes
  useEffect(() => {
    if (completedSections.length > 0) {
      syncProgressToServer();
    }
  }, [completedSections]);

  const loadProgress = useCallback(async () => {
    try {
      const progress = await learningService.getProgress(userId);
      setCompletedSections(progress);
      setError(null);
    } catch (error) {
      console.error('Error loading progress:', error);
      setError('فشل في تحميل التقدم');
      
      // Fallback to localStorage
      try {
        const saved = localStorage.getItem('motawer-progress');
        if (saved) {
          setCompletedSections(JSON.parse(saved));
        }
      } catch (localError) {
        console.error('Error loading from localStorage:', localError);
      }
    }
  }, [userId]);

  const syncProgressToServer = useCallback(async () => {
    if (!isOnline || syncing) return;

    setSyncing(true);
    try {
      await learningService.saveProgress(userId, completedSections);
      setLastSync(new Date().toISOString());
      setError(null);
      
      // Also save to localStorage as backup
      localStorage.setItem('motawer-progress', JSON.stringify(completedSections));
      localStorage.setItem('motawer-last-sync', new Date().toISOString());
      
    } catch (error) {
      console.error('Error syncing progress:', error);
      setError('فشل في مزامنة التقدم');
      
      // Still save to localStorage
      localStorage.setItem('motawer-progress', JSON.stringify(completedSections));
    } finally {
      setSyncing(false);
    }
  }, [userId, completedSections, isOnline, syncing]);

  const markAsCompleted = useCallback((sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => {
        const newProgress = [...prev, sectionId];
        return newProgress;
      });
      
      // Save stats
      saveCompletionStats(sectionId);
    }
  }, [completedSections]);

  const markAsIncomplete = useCallback((sectionId) => {
    setCompletedSections(prev => prev.filter(id => id !== sectionId));
  }, []);

  const saveCompletionStats = useCallback(async (sectionId) => {
    try {
      const section = sections.find(s => s.id === sectionId);
      await learningService.saveStats(userId, {
        sectionCompleted: sectionId,
        sectionTitle: section?.title,
        completedAt: new Date().toISOString(),
        totalCompleted: completedSections.length + 1
      });
    } catch (error) {
      console.error('Error saving completion stats:', error);
    }
  }, [userId, completedSections.length, sections]);

  const getProgress = useCallback(() => {
    return Math.round((completedSections.length / sections.length) * 100);
  }, [completedSections.length, sections.length]);

  const isCompleted = useCallback((sectionId) => {
    return completedSections.includes(sectionId);
  }, [completedSections]);

  const getNextSection = useCallback((currentSectionId) => {
    const currentIndex = sections.findIndex(section => section.id === currentSectionId);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  }, [sections]);

  const getPreviousSection = useCallback((currentSectionId) => {
    const currentIndex = sections.findIndex(section => section.id === currentSectionId);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
  }, [sections]);

  const resetProgress = useCallback(async () => {
    try {
      setCompletedSections([]);
      await learningService.saveProgress(userId, []);
      localStorage.removeItem('motawer-progress');
      setError(null);
    } catch (error) {
      console.error('Error resetting progress:', error);
      setError('فشل في إعادة تعيين التقدم');
    }
  }, [userId]);

  const manualSync = useCallback(async () => {
    await syncProgressToServer();
  }, [syncProgressToServer]);

  const value = {
    // Progress data
    sections,
    completedSections,
    userId,
    
    // Progress functions
    markAsCompleted,
    markAsIncomplete,
    getProgress,
    isCompleted,
    getNextSection,
    getPreviousSection,
    resetProgress,
    
    // Sync functions
    manualSync,
    loadProgress,
    
    // Status
    syncing,
    lastSync,
    error,
    isOnline,
    
    // Computed values
    totalSections: sections.length,
    progressPercentage: getProgress(),
    completedCount: completedSections.length,
    remainingCount: sections.length - completedSections.length
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;