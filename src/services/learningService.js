import apiService from './api';

export const learningService = {
  // Progress APIs
  async saveProgress(userId, progress) {
    try {
      // في بيئة حقيقية، ستكون هذه API خاصة بك
      // الآن سنستخدم localStorage كـ fallback
      const response = await apiService.post('/users/progress', {
        userId,
        completedSections: progress,
        timestamp: new Date().toISOString()
      });
      
      // حفظ في localStorage أيضاً كنسخة احتياطية
      localStorage.setItem('motawer-progress', JSON.stringify(progress));
      localStorage.setItem('motawer-last-sync', new Date().toISOString());
      
      return response;
    } catch (error) {
      console.warn('API save failed, using localStorage:', error);
      localStorage.setItem('motawer-progress', JSON.stringify(progress));
      return { success: true, source: 'localStorage' };
    }
  },

  async getProgress(userId) {
    try {
      const response = await apiService.get(`/users/${userId}/progress`);
      return response.completedSections || [];
    } catch (error) {
      console.warn('API load failed, using localStorage:', error);
      const saved = localStorage.getItem('motawer-progress');
      return saved ? JSON.parse(saved) : [];
    }
  },

  // Learning Statistics
  async saveStats(userId, stats) {
    try {
      return await apiService.post('/users/stats', {
        userId,
        ...stats,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.warn('Stats save failed:', error);
      // حفظ الإحصائيات محلياً
      const localStats = JSON.parse(localStorage.getItem('motawer-stats') || '{}');
      localStorage.setItem('motawer-stats', JSON.stringify({ ...localStats, ...stats }));
      return { success: true, source: 'localStorage' };
    }
  },

  async getStats(userId) {
    try {
      return await apiService.get(`/users/${userId}/stats`);
    } catch (error) {
      console.warn('Stats load failed, using localStorage:', error);
      return JSON.parse(localStorage.getItem('motawer-stats') || '{}');
    }
  },

  // Content APIs (for future features)
  async getContent(sectionId) {
    try {
      return await apiService.get(`/content/${sectionId}`);
    } catch (error) {
      console.warn('Content load failed:', error);
      // يمكن إرجاع محتوى افتراضي هنا
      return null;
    }
  },

  async submitFeedback(feedback) {
    try {
      return await apiService.post('/feedback', {
        ...feedback,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.warn('Feedback submission failed:', error);
      // حفظ التعليقات محلياً للإرسال لاحقاً
      const localFeedback = JSON.parse(localStorage.getItem('motawer-pending-feedback') || '[]');
      localFeedback.push({ ...feedback, timestamp: new Date().toISOString() });
      localStorage.setItem('motawer-pending-feedback', JSON.stringify(localFeedback));
      return { success: true, source: 'localStorage' };
    }
  },

  // Sync offline data when online
  async syncOfflineData(userId) {
    try {
      const pendingFeedback = JSON.parse(localStorage.getItem('motawer-pending-feedback') || '[]');
      
      if (pendingFeedback.length > 0) {
        for (const feedback of pendingFeedback) {
          await this.submitFeedback(feedback);
        }
        localStorage.removeItem('motawer-pending-feedback');
      }

      // يمكن إضافة المزيد من عمليات المزامنة هنا
      return { success: true, syncedItems: pendingFeedback.length };
    } catch (error) {
      console.error('Sync failed:', error);
      return { success: false, error: error.message };
    }
  }
};
