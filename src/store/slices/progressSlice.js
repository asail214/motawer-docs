import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  localProgress: [],
  cloudProgress: [],
  syncStatus: 'idle', // idle, syncing, success, error
  lastSync: null,
  isOnline: navigator.onLine,
};

// Async thunks
export const syncProgressToCloud = createAsyncThunk(
  'progress/syncToCloud',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth, progress } = getState();
      
      if (!auth.isAuthenticated) {
        throw new Error('المستخدم غير مسجل الدخول');
      }
      
      // محاكاة sync مع الخادم
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const progressToSync = progress.localProgress;
      
      // حفظ التقدم في localStorage كـ cloud progress
      localStorage.setItem('motawer-cloud-progress', JSON.stringify(progressToSync));
      localStorage.setItem('motawer-last-sync', new Date().toISOString());
      
      return {
        cloudProgress: progressToSync,
        lastSync: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadCloudProgress = createAsyncThunk(
  'progress/loadFromCloud',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      if (!auth.isAuthenticated) {
        return { cloudProgress: [], lastSync: null };
      }
      
      // تحميل من localStorage
      const cloudProgress = JSON.parse(localStorage.getItem('motawer-cloud-progress') || '[]');
      const lastSync = localStorage.getItem('motawer-last-sync');
      
      return {
        cloudProgress,
        lastSync,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const migrateLocalToCloud = createAsyncThunk(
  'progress/migrateToCloud',
  async (_, { getState, dispatch }) => {
    const { progress } = getState();
    
    if (progress.localProgress.length > 0) {
      // دمج التقدم المحلي مع السحابي
      const merged = [...new Set([...progress.cloudProgress, ...progress.localProgress])];
      
      // حفظ التقدم المدمج
      localStorage.setItem('motawer-cloud-progress', JSON.stringify(merged));
      
      // مزامنة مع الخادم
      await dispatch(syncProgressToCloud());
      
      return merged;
    }
    
    return progress.cloudProgress;
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markSectionCompleted: (state, action) => {
      const sectionId = action.payload;
      
      // إضافة للتقدم المحلي
      if (!state.localProgress.includes(sectionId)) {
        state.localProgress.push(sectionId);
        localStorage.setItem('motawer-progress', JSON.stringify(state.localProgress));
      }
    },
    markSectionIncomplete: (state, action) => {
      const sectionId = action.payload;
      
      state.localProgress = state.localProgress.filter(id => id !== sectionId);
      localStorage.setItem('motawer-progress', JSON.stringify(state.localProgress));
    },
    loadLocalProgress: (state) => {
      const saved = localStorage.getItem('motawer-progress');
      if (saved) {
        state.localProgress = JSON.parse(saved);
      }
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    resetProgress: (state) => {
      state.localProgress = [];
      state.cloudProgress = [];
      localStorage.removeItem('motawer-progress');
      localStorage.removeItem('motawer-cloud-progress');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncProgressToCloud.pending, (state) => {
        state.syncStatus = 'syncing';
      })
      .addCase(syncProgressToCloud.fulfilled, (state, action) => {
        state.syncStatus = 'success';
        state.cloudProgress = action.payload.cloudProgress;
        state.lastSync = action.payload.lastSync;
      })
      .addCase(syncProgressToCloud.rejected, (state) => {
        state.syncStatus = 'error';
      })
      .addCase(loadCloudProgress.fulfilled, (state, action) => {
        state.cloudProgress = action.payload.cloudProgress;
        state.lastSync = action.payload.lastSync;
      })
      .addCase(migrateLocalToCloud.fulfilled, (state, action) => {
        state.cloudProgress = action.payload;
      });
  },
});

export const {
  markSectionCompleted,
  markSectionIncomplete,
  loadLocalProgress,
  setOnlineStatus,
  resetProgress,
} = progressSlice.actions;

export default progressSlice.reducer;