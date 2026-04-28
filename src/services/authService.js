// Authentication Service
// Handles user registration, login, and profile management

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Register new user
export const registerUser = async (userData) => {
    try {
          const response = await fetch(`${API_URL}/auth/register`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(userData)
          });
          const data = await response.json();
          if (data.token) {
                  localStorage.setItem('authToken', data.token);
                  localStorage.setItem('user', JSON.stringify(data.user));
          }
          return data;
    } catch (error) {
          console.error('Registration error:', error);
          throw error;
    }
};

// Login user
export const loginUser = async (email, password) => {
    try {
          const response = await fetch(`${API_URL}/auth/login`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password })
          });
          const data = await response.json();
          if (data.token) {
                  localStorage.setItem('authToken', data.token);
                  localStorage.setItem('user', JSON.stringify(data.user));
          }
          return data;
    } catch (error) {
          console.error('Login error:', error);
          throw error;
    }
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Get auth token
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
    try {
          const token = getAuthToken();
          const response = await fetch(`${API_URL}/users/${userId}`, {
                  method: 'PUT',
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(profileData)
          });
          const data = await response.json();
          if (data.user) {
                  localStorage.setItem('user', JSON.stringify(data.user));
          }
          return data;
    } catch (error) {
          console.error('Profile update error:', error);
          throw error;
    }
};

// Get user profile
export const getUserProfile = async (userId) => {
    try {
          const token = getAuthToken();
          const response = await fetch(`${API_URL}/users/${userId}`, {
                  headers: {
                            'Authorization': `Bearer ${token}`
                  }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching profile:', error);
          throw error;
    }
};

// Change password
export const changePassword = async (userId, oldPassword, newPassword) => {
    try {
          const token = getAuthToken();
          const response = await fetch(`${API_URL}/users/${userId}/change-password`, {
                  method: 'POST',
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({ oldPassword, newPassword })
          });
          return await response.json();
    } catch (error) {
          console.error('Password change error:', error);
          throw error;
    }
};

// Google OAuth login
export const googleLogin = async (tokenId) => {
    try {
          const response = await fetch(`${API_URL}/auth/google`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ tokenId })
          });
          const data = await response.json();
          if (data.token) {
                  localStorage.setItem('authToken', data.token);
                  localStorage.setItem('user', JSON.stringify(data.user));
          }
          return data;
    } catch (error) {
          console.error('Google login error:', error);
          throw error;
    }
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getAuthToken();
};

// Verify email
export const verifyEmail = async (email, code) => {
    try {
          const response = await fetch(`${API_URL}/auth/verify-email`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, code })
          });
          return await response.json();
    } catch (error) {
          console.error('Email verification error:', error);
          throw error;
    }
};

// Request password reset
export const requestPasswordReset = async (email) => {
    try {
          const response = await fetch(`${API_URL}/auth/forgot-password`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
          });
          return await response.json();
    } catch (error) {
          console.error('Password reset request error:', error);
          throw error;
    }
};
