import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

const ProgressProvider = ({ children }) => {
  const [completedSections, setCompletedSections] = useState(() => {
    // Try to get from localStorage, fallback to empty array
    try {
      const saved = localStorage.getItem('motawer-progress');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Could not load progress from localStorage:', error);
      return [];
    }
  });

  const sections = [
    { id: 'frontend-basics', title: 'أساسيات تطوير الواجهات', path: '/frontend-basics' },
    { id: 'react-introduction', title: 'مقدمة عن React', path: '/react-introduction' },
    { id: 'environment-setup', title: 'إعداد بيئة التطوير', path: '/environment-setup' },
    { id: 'core-concepts', title: 'المفاهيم الأساسية', path: '/core-concepts' },
    { id: 'todo-project', title: 'مشروع قائمة المهام', path: '/todo-project' },
    { id: 'next-steps', title: 'الخطوات التالية', path: '/next-steps' }
  ];

  useEffect(() => {
    try {
      localStorage.setItem('motawer-progress', JSON.stringify(completedSections));
    } catch (error) {
      console.warn('Could not save progress to localStorage:', error);
    }
  }, [completedSections]);

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
    getPreviousSection
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;