import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Provider = {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  clinic: string;
  address: string;
  rating: number;
  yearsExperience: number;
  avatarInitials: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: {email: string} | null;
  provider: Provider | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  provider: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{email: string}>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Mock provider data loaded on login
      state.provider = {
        id: 'PRV-10234',
        name: 'Dr. Sarah Mitchell',
        specialty: 'General Practitioner',
        email: action.payload.email,
        phone: '+1 (555) 234-5678',
        clinic: 'Sunrise Health Clinic',
        address: '142 Wellness Ave, Suite 3, Austin, TX 78701',
        rating: 4.8,
        yearsExperience: 12,
        avatarInitials: 'SM',
      };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.provider = null;
    },
  },
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
