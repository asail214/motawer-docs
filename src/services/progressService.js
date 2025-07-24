import React, { createContext, useContext, useState, useEffect } from 'react';
import { progressService } from '../services/progressService';

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
  const [userId] = useState(() => {
    // Get or create user ID
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

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await progressService.getProgress(userId);
        setCompletedSections(progress);
      } catch (error) {
        console.error('Error loading progress:', error);
        // Fallback to localStorage
        const saved = localStorage.getItem('motawer-progress');
        if (saved) {
          setCompletedSections(JSON.parse(saved));
        }
      }
    };

    loadProgress();
  }, [userId]);

  // Sync progress when it changes
  useEffect(() => {
    const syncProgress = async () => {
      if (completedSections.length > 0) {
        setSyncing(true);
        try {
          await progressService.saveProgress(userId, completedSections);
          // Also save to localStorage as backup
          localStorage.setItem('motawer-progress', JSON.stringify(completedSections));
        } catch (error) {
          console.error('Error syncing progress:', error);
          // Still save to localStorage
          localStorage.setItem('motawer-progress', JSON.stringify(completedSections));
        } finally {
          setSyncing(false);
        }
      }
    };

    syncProgress();
  }, [completedSections, userId]);

  const markAsCompleted = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  const markAsIncomplete = (sectionId) => {
    setCompletedSections(prev => prev.filter(id => id !== sectionId));
  };

  const getProgress = () => {
    return Math.round((completedSections.length / sections.length) * 100);
  };

  const isCompleted = (sectionId) => {
    return completedSections.includes(sectionId);
  };

  const getNextSection = (currentSectionId) => {
    const currentIndex = sections.findIndex(section => section.id === currentSectionId);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  };

  const getPreviousSection = (currentSectionId) => {
    const currentIndex = sections.findIndex(section => section.id === currentSectionId);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
  };

  const value = {
    sections,
    completedSections,
    markAsCompleted,
    markAsIncomplete,
    getProgress,
    isCompleted,
    getNextSection,
    getPreviousSection,
    syncing,
    userId
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;