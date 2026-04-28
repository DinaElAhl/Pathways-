// Progress Tracking Service
// Manages learning progress, analytics, and achievement tracking

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('authToken');

// Record module completion
export const recordModuleCompletion = async (pathwayId, moduleId, timeSpent) => {
    try {
          const response = await fetch(`${API_URL}/progress/module-complete`, {
                  method: 'POST',
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getAuthToken()}`
                  },
                  body: JSON.stringify({ pathwayId, moduleId, timeSpent, completedAt: new Date() })
          });
          return await response.json();
    } catch (error) {
          console.error('Error recording module completion:', error);
          throw error;
    }
};

// Get user progress for pathway
export const getPathwayProgress = async (userId, pathwayId) => {
    try {
          const response = await fetch(`${API_URL}/progress/pathway/${userId}/${pathwayId}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching pathway progress:', error);
          throw error;
    }
};

// Get overall user statistics
export const getUserStatistics = async (userId) => {
    try {
          const response = await fetch(`${API_URL}/progress/statistics/${userId}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching user statistics:', error);
          throw error;
    }
};

// Get learning history
export const getLearningHistory = async (userId, limit = 20) => {
    try {
          const response = await fetch(`${API_URL}/progress/history/${userId}?limit=${limit}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching learning history:', error);
          throw error;
    }
};

// Track time spent on module (real-time)
export const trackTimeSpent = async (pathwayId, moduleId, seconds) => {
    try {
          const response = await fetch(`${API_URL}/progress/time-tracking`, {
                  method: 'POST',
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getAuthToken()}`
                  },
                  body: JSON.stringify({ pathwayId, moduleId, seconds, timestamp: new Date() })
          });
          return await response.json();
    } catch (error) {
          console.error('Error tracking time:', error);
          throw error;
    }
};

// Get achievements/badges earned
export const getUserAchievements = async (userId) => {
    try {
          const response = await fetch(`${API_URL}/achievements/${userId}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching achievements:', error);
          throw error;
    }
};

// Unlock achievement
export const unlockAchievement = async (userId, achievementId) => {
    try {
          const response = await fetch(`${API_URL}/achievements/unlock`, {
                  method: 'POST',
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getAuthToken()}`
                  },
                  body: JSON.stringify({ userId, achievementId })
          });
          return await response.json();
    } catch (error) {
          console.error('Error unlocking achievement:', error);
          throw error;
    }
};

// Get user points/score
export const getUserPoints = async (userId) => {
    try {
          const response = await fetch(`${API_URL}/points/${userId}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching user points:', error);
          throw error;
    }
};

// Add points to user
export const addUserPoints = async (userId, points, reason) => {
    try {
          const response = await fetch(`${API_URL}/points/add`, {
                  method: 'POST',
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getAuthToken()}`
                  },
                  body: JSON.stringify({ userId, points, reason, timestamp: new Date() })
          });
          return await response.json();
    } catch (error) {
          console.error('Error adding points:', error);
          throw error;
    }
};

// Get learning streak
export const getLearningStreak = async (userId) => {
    try {
          const response = await fetch(`${API_URL}/progress/streak/${userId}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching learning streak:', error);
          throw error;
    }
};

// Get completion certificate
export const getCompletionCertificate = async (userId, pathwayId) => {
    try {
          const response = await fetch(`${API_URL}/certificates/${userId}/${pathwayId}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching certificate:', error);
          throw error;
    }
};

// Get leaderboard
export const getLeaderboard = async (type = 'global', limit = 50) => {
    try {
          const response = await fetch(`${API_URL}/leaderboard/${type}?limit=${limit}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching leaderboard:', error);
          throw error;
    }
};

// Get weekly summary
export const getWeeklySummary = async (userId) => {
    try {
          const response = await fetch(`${API_URL}/progress/weekly-summary/${userId}`, {
                  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
          });
          return await response.json();
    } catch (error) {
          console.error('Error fetching weekly summary:', error);
          throw error;
    }
};

// Get analytics report
export const getAnalyticsReport = async (userId, startDate, endDate) => {
    try {
          const response = await fetch(
                  `${API_URL}/analytics/report/${userId}?start=${startDate}&end=${endDate}`,
            { headers: { 'Authorization': `Bearer ${getAuthToken()}` } }
                );
          return await response.json();
    } catch (error) {
          console.error('Error fetching analytics:', error);
          throw error;
    }
};
