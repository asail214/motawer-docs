// src/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return {
    data,
    loading,
    error,
    execute,
    setData
  };
};

// Custom hook للتقدم مع API
export const useProgressSync = (userId) => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const syncProgress = useCallback(async (progress) => {
    setSyncing(true);
    try {
      await learningService.saveProgress(userId, progress);
      setLastSync(new Date().toISOString());
      return { success: true };
    } catch (error) {
      console.error('Progress sync failed:', error);
      return { success: false, error: error.message };
    } finally {
      setSyncing(false);
    }
  }, [userId]);

  const loadProgress = useCallback(async () => {
    try {
      const progress = await learningService.getProgress(userId);
      return progress;
    } catch (error) {
      console.error('Progress load failed:', error);
      throw error;
    }
  }, [userId]);

  return {
    syncing,
    lastSync,
    syncProgress,
    loadProgress
  };
};

// Hook للاتصال بالإنترنت
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// مثال على استخدام الـ hooks في المكون
/*
import React, { useEffect } from 'react';
import { useApi, useProgressSync, useOnlineStatus } from '../hooks/useApi';
import { learningService } from '../services/learningService';

function ExampleComponent() {
  const isOnline = useOnlineStatus();
  const { syncing, syncProgress } = useProgressSync('user123');
  const { data: stats, loading, execute: loadStats } = useApi(learningService.getStats);

  useEffect(() => {
    loadStats('user123');
  }, [loadStats]);

  const handleProgressUpdate = async (newProgress) => {
    const result = await syncProgress(newProgress);
    if (result.success) {
      console.log('Progress saved successfully');
    }
  };

  return (
    <div>
      <div>
        Status: {isOnline ? 'متصل' : 'غير متصل'}
        {syncing && ' - جاري المزامنة...'}
      </div>
      
      {loading && <div>جاري التحميل...</div>}
      
      {stats && (
        <div>
          <h3>الإحصائيات</h3>
          <p>الدروس المكتملة: {stats.lessonsCompleted || 0}</p>
          <p>الوقت المستغرق: {stats.timeSpent || 0} دقيقة</p>
        </div>
      )}
      
      <button onClick={() => handleProgressUpdate(['lesson1', 'lesson2'])}>
        تحديث التقدم
      </button>
    </div>
  );
}

export default ExampleComponent;
*/