# Pathways API Documentation

## Overview
The Pathways platform uses Vercel serverless functions as the backend API. All endpoints are deployed on Vercel and connected to MongoDB Atlas for data persistence.

## Base URL
https://pathways-learn-gamma.vercel.app/api

## Authentication API
### Endpoint: /api/auth

#### Register a New User
POST /api/auth
```json
{"action": "register", "name": "John Doe", "email": "john@example.com", "password": "securePassword123"}
```
Response (200):
```json
{"success": true, "message": "User registered successfully", "user": {"_id": "user_id", "name": "John Doe", "email": "john@example.com"}}
```

#### Login User
POST /api/auth
```json
{"action": "login", "email": "john@example.com", "password": "securePassword123"}
```
Response (200):
```json
{"success": true, "message": "Login successful", "user": {"_id": "user_id", "name": "John Doe", "email": "john@example.com"}}
```

#### Get User Profile
GET /api/auth?userId=user_id
Response (200):
```json
{"success": true, "user": {"_id": "user_id", "name": "John Doe", "email": "john@example.com", "createdAt": "2024-04-28T00:00:00Z"}}
```

## Progress Tracking API
### Endpoint: /api/progress

#### Save User Progress
POST /api/progress
```json
{"userId": "user_id", "pathwayId": "pathway_id", "courseId": "course_id", "progress": 75, "status": "in-progress"}
```

## Search & Discovery API
### Endpoint: /api/search

GET /api/search?q=learning&category=technology&limit=10

## Pathways API
### Endpoint: /api/pathways

GET /api/pathways
GET /api/pathways?id=pathway_id
POST /api/pathways

## Reviews API
### Endpoint: /api/reviews

POST /api/reviews
GET /api/reviews?pathwayId=pathway_id

## Environment Variables Required

MONGODB_URI=mongodb+srv://dinaelahi_do_user:d4VhLoG9R4c8JohS@pathway.6a3bzu2pj.mongodb.net/?appName=Pathway
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production

## API Deployment

All APIs are deployed on Vercel as serverless functions in the /api directory.

## Support

For API issues, create an issue in: https://github.com/DinaElAhl/Pathways-/issues

## Version History

v1.0 (2024-04-28): Initial API release with auth, progress, search, pathways, and reviews endpoints
