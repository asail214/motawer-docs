//import apiService from './api';

// Offline-only learning service - no API calls
export const learningService = {
  // Progress APIs - localStorage only
  async saveProgress(userId, progress) {
    try {
      // Save to localStorage
      localStorage.setItem('motawer-progress', JSON.stringify(progress));
      localStorage.setItem('motawer-last-sync', new Date().toISOString());
      localStorage.setItem('motawer-user-id', userId);
      
      console.log('Progress saved to localStorage:', progress);
      return { success: true, source: 'localStorage' };
    } catch (error) {
      console.error('Failed to save progress:', error);
      return { success: false, error: error.message };
    }
  },

  async getProgress(userId) {
    try {
      const saved = localStorage.getItem('motawer-progress');
      const progress = saved ? JSON.parse(saved) : [];
      console.log('Progress loaded from localStorage:', progress);
      return progress;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return [];
    }
  },

  // Learning Statistics - localStorage only
  async saveStats(userId, stats) {
    try {
      const existingStats = JSON.parse(localStorage.getItem('motawer-stats') || '{}');
      const updatedStats = {
        ...existingStats,
        ...stats,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('motawer-stats', JSON.stringify(updatedStats));
      console.log('Stats saved to localStorage:', updatedStats);
      return { success: true, source: 'localStorage' };
    } catch (error) {
      console.error('Failed to save stats:', error);
      return { success: false, error: error.message };
    }
  },

  async getStats(userId) {
    try {
      const stats = localStorage.getItem('motawer-stats');
      return stats ? JSON.parse(stats) : {};
    } catch (error) {
      console.error('Failed to load stats:', error);
      return {};
    }
  },

  // Content APIs - return null (no backend needed)
  async getContent(sectionId) {
    console.log('getContent called for:', sectionId);
    return null; // No content from API needed
  },

  // Feedback - save locally
  async submitFeedback(feedback) {
    try {
      const existingFeedback = JSON.parse(localStorage.getItem('motawer-feedback') || '[]');
      const newFeedback = {
        ...feedback,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      
      existingFeedback.push(newFeedback);
      localStorage.setItem('motawer-feedback', JSON.stringify(existingFeedback));
      
      console.log('Feedback saved locally:', newFeedback);
      return { success: true, source: 'localStorage' };
    } catch (error) {
      console.error('Failed to save feedback:', error);
      return { success: false, error: error.message };
    }
  },

  // No sync needed - everything is local
  async syncOfflineData(userId) {
    console.log('Sync not needed - working offline only');
    return { success: true, message: 'Working offline only' };
  }
};