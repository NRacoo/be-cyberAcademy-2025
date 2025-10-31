# CyberAcademy API Documentation

## Authentication Endpoints

### User Registration
```http
POST /api/v1/auth/register
```
Request Body:
```json
{
  "name": "string",
  "nim": "string",
  "className": "string", 
  "email": "string",
  "noHp": "string",
  "gender": "string",
  "faculty": "string",
  "year": "string",
  "topik": "WebDev|IoT|ML|NetSec",
  "major": "string",
  "document": "string"
}
```

### User Login 
```http
POST /api/v1/auth/login
```
Request Body:
```json
{
  "nim": "string",
  "password": "string"
}
```

### Admin Login
```http
POST /api/v1/auth/admin/login
```
Request Body:
```json
{
  "username": "string", 
  "password": "string"
}
```

## User Management Endpoints

### Change Password
```http
PATCH /api/v1/service/change-password
```
Request Headers:
```
Authorization: Bearer <token>
```
Request Body:
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

### Reset Password
```http
POST /api/v1/service/reset-password
```
Request Body:
```json
{
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

## Module Endpoints

### Get Modules by User
```http
GET /api/v1/modul/:id
```
Request Headers:
```
Authorization: Bearer <token>
```

## Admin Module Management

### Upload Module
```http
POST /api/v1/admin/upload-module
```
Request Headers:
```
Authorization: Bearer <token>
```
Request Body:
```json
{
  "name": "string",
  "fileUrl": "string",
  "topik": "WebDev|IoT|ML|NetSec",
  "status": "COMINGSOON|ONGOING|COMPLETED",
  "description": "string",
  "imageUrl": "string",
  "available_at": "datetime",
  "is_clicked": "boolean"
}
```

### Upload Task
```http
POST /api/v1/admin/upload-task
```
Request Headers:
```
Authorization: Bearer <token>
```
Request Body:
```json
{
  "title": "string",
  "description": "string", 
  "fileUrl": "string",
  "topik": "WebDev|IoT|ML|NetSec",
  "deadline": "datetime",
  "modul_id": "string"
}
```

## Task Endpoints

### Get Task by ID
```http
GET /api/v1/task/:id
```
Request Headers:
```
Authorization: Bearer <token>
```

### Get Tasks by Topic
```http
GET /api/v1/task/by-topik?topik=<topic>
```
Request Headers:
```
Authorization: Bearer <token>
```

## Submission Endpoints

### Upload Submission
```http
POST /api/v1/submission/upload-submission
```
Request Headers:
```
Authorization: Bearer <token>
```
Request Body:
```json
{
  "file": "string",
  "taskId": "string"
}
```

## Response Format

Success Response:
```json
{
  "status": true,
  "message": "string",
  "data": {} 
}
```

Error Response:
```json
{
  "status": false,
  "message": "error message",
  "error": {} 
}
```

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

- User endpoints require user token
- Admin endpoints require admin token