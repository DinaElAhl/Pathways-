# Services

Client-side service helper modules used by Pathways React pages/components to talk to
the backend and manage authentication and learning progress. Each module wraps `fetch`
calls and exports plain async functions.

## Configuration

Both modules read the API base URL from the environment:

```
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

These call a live REST API (no mock/static data). Endpoints are expected to live under
that base URL. Note: this base differs from the repo's serverless functions in `api/`
and the standalone `pathways-api/`, so it may need to point at one of those (or a proxy).

## Auth state

The JWT auth token is stored in `localStorage` under `authToken`, and the current user
object under `user`. Authenticated requests send `Authorization: Bearer <token>`.

## authService.js

Handles registration, login, and profile management.

- `registerUser(userData)` — POST `/auth/register`; stores token + user on success.
- `loginUser(email, password)` — POST `/auth/login`; stores token + user on success.
- `logoutUser()` — clears `authToken` and `user` from localStorage.
- `getCurrentUser()` — returns parsed `user` from localStorage (or null).
- `getAuthToken()` — returns the stored `authToken`.
- `updateUserProfile(userId, profileData)` — PUT `/users/:id`; updates stored user.
- `getUserProfile(userId)` — GET `/users/:id`.
- `changePassword(userId, oldPassword, newPassword)` — POST `/users/:id/change-password`.
- `googleLogin(tokenId)` — POST `/auth/google`; stores token + user on success.
- `isAuthenticated()` — true if an auth token is present.
- `verifyEmail(email, code)` — POST `/auth/verify-email`.
- `requestPasswordReset(email)` — POST `/auth/forgot-password`.

## progressService.js

Manages learning progress, points, achievements, and analytics. Reads `authToken` from
localStorage for every request.

- `recordModuleCompletion(pathwayId, moduleId, timeSpent)` — POST `/progress/module-complete`.
- `getPathwayProgress(userId, pathwayId)` — GET `/progress/pathway/:userId/:pathwayId`.
- `getUserStatistics(userId)` — GET `/progress/statistics/:userId`.
- `getLearningHistory(userId, limit=20)` — GET `/progress/history/:userId`.
- `trackTimeSpent(pathwayId, moduleId, seconds)` — POST `/progress/time-tracking`.
- `getUserAchievements(userId)` — GET `/achievements/:userId`.
- `unlockAchievement(userId, achievementId)` — POST `/achievements/unlock`.
- `getUserPoints(userId)` — GET `/points/:userId`.
- `addUserPoints(userId, points, reason)` — POST `/points/add`.
- `getLearningStreak(userId)` — GET `/progress/streak/:userId`.
- `getCompletionCertificate(userId, pathwayId)` — GET `/certificates/:userId/:pathwayId`.
- `getLeaderboard(type='global', limit=50)` — GET `/leaderboard/:type`.
- `getWeeklySummary(userId)` — GET `/progress/weekly-summary/:userId`.
- `getAnalyticsReport(userId, startDate, endDate)` — GET `/analytics/report/:userId`.
