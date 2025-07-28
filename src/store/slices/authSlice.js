import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastLoginTime: null,
};

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // محاكاة API call - سنستبدلها لاحقاً بـ API حقيقي
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // محاكاة تسجيل دخول ناجح
      if (email && password) {
        const user = {
          id: Date.now(),
          name: email.split('@')[0],
          email: email,
          joinDate: new Date().toISOString(),
          points: 0,
          achievements: [],
        };
        
        // حفظ في localStorage
        localStorage.setItem('motawer-user', JSON.stringify(user));
        localStorage.setItem('motawer-auth-token', 'mock-token-' + user.id);
        
        return user;
      } else {
        throw new Error('البريد الإلكتروني وكلمة المرور مطلوبان');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        const user = {
          id: Date.now(),
          name: name,
          email: email,
          joinDate: new Date().toISOString(),
          points: 20, // مكافأة الانضمام
          achievements: ['مرحباً بك!'],
        };
        
        localStorage.setItem('motawer-user', JSON.stringify(user));
        localStorage.setItem('motawer-auth-token', 'mock-token-' + user.id);
        
        return user;
      } else {
        throw new Error('جميع الحقول مطلوبة');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('motawer-user');
      localStorage.removeItem('motawer-auth-token');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const user = localStorage.getItem('motawer-user');
      const token = localStorage.getItem('motawer-auth-token');
      
      if (user && token) {
        return JSON.parse(user);
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserPoints: (state, action) => {
      if (state.user) {
        state.user.points += action.payload;
        // حفظ في localStorage
        localStorage.setItem('motawer-user', JSON.stringify(state.user));
      }
    },
    addAchievement: (state, action) => {
      if (state.user) {
        state.user.achievements.push(action.payload);
        localStorage.setItem('motawer-user', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.lastLoginTime = new Date().toISOString();
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.lastLoginTime = new Date().toISOString();
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.lastLoginTime = null;
        state.error = null;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { clearError, updateUserPoints, addAchievement } = authSlice.actions;
export default authSlice.reducer;