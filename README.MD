# The Data Hub 🚀

A RESTful API server built with Node.js and Express, featuring full CRUD operations on a Blog resource, request logging middleware, and mock JWT authentication scaffolding.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Middleware](#middleware)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Development Notes](#development-notes)

---

## Overview

The Data Hub is a backend REST API server designed as a learning sprint to transition from API consumer to API provider. It implements standard REST architecture patterns including route/controller separation, in-memory data persistence, custom middleware, and auth endpoint scaffolding.

**Key engineering decisions:**
- Routes and controllers are fully separated — routes handle mapping, controllers handle logic
- Shared application state managed via `app.locals`
- All responses follow a consistent JSON envelope (`status`, `data`, `message`)
- HTTP status codes are semantically correct throughout

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js v18+ | JavaScript runtime |
| Express.js | HTTP server and routing framework |
| Nodemon | Development auto-restart |

No database — data is persisted in-memory for the duration of the server session.

---

## Project Structure

```
the-data-hub/
├── controllers/
│   ├── postController.js     # CRUD logic for Blog posts
│   └── authController.js     # Login and token logic
├── middleware/
│   └── logger.js             # Request logging middleware
├── routes/
│   ├── posts.js              # POST resource route definitions
│   └── auth.js               # Auth route definitions
├── server.js                 # Entry point — app config, middleware, server start
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yogesh2002kashyap/the-data-hub.git

# Navigate into the project
cd the-data-hub

# Install dependencies
npm install
```

### Running the Server

```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## API Reference

### Base URL

```
http://localhost:5000/api
```

### Response Envelope

All responses follow this consistent structure:

```json
{
  "status": "success" | "error",
  "message": "Human-readable description",
  "data": { } | [ ]
}
```

---

### Health Check

```
GET /
```

**Response:**
```json
{
  "status": "success",
  "message": "Welcome to The Data Hub"
}
```

---

### Blog Posts

#### Get all posts

```
GET /api/posts
```

**Response `200 OK`:**
```json
{
  "status": "success",
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Getting Started with Node.js",
      "content": "Node.js lets you run JavaScript on the server.",
      "author": "Alex",
      "createdAt": "2026-05-13T10:05:00.000Z"
    }
  ]
}
```

---

#### Get post by ID

```
GET /api/posts/:id
```

**Response `200 OK`:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Getting Started with Node.js",
    "content": "Node.js lets you run JavaScript on the server.",
    "author": "Alex",
    "createdAt": "2026-05-13T10:05:00.000Z"
  }
}
```

**Response `404 Not Found`:**
```json
{
  "status": "error",
  "message": "Post with id 99 not found"
}
```

---

#### Create a post

```
POST /api/posts
```

**Request body:**
```json
{
  "title": "My New Post",
  "content": "Post content goes here.",
  "author": "Jordan"
}
```

**Response `201 Created`:**
```json
{
  "status": "success",
  "message": "Post created successfully",
  "data": {
    "id": 2,
    "title": "My New Post",
    "content": "Post content goes here.",
    "author": "Jordan",
    "createdAt": "2026-05-13T10:10:00.000Z"
  }
}
```

**Response `400 Bad Request`** (missing fields):
```json
{
  "status": "error",
  "message": "title, content, and author are required fields"
}
```

---

#### Update a post

```
PUT /api/posts/:id
```

**Request body** (any subset of fields):
```json
{
  "title": "Updated Title"
}
```

**Response `200 OK`:**
```json
{
  "status": "success",
  "message": "Post updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "content": "Original content preserved.",
    "author": "Alex",
    "createdAt": "2026-05-13T10:05:00.000Z",
    "updatedAt": "2026-05-13T10:15:00.000Z"
  }
}
```

---

#### Delete a post

```
DELETE /api/posts/:id
```

**Response `200 OK`:**
```json
{
  "status": "success",
  "message": "Post 1 deleted successfully"
}
```

---

### Authentication

#### Login

```
POST /api/login
```

**Request body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response `200 OK`:**
```json
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.bW9ja1NpZ25hdHVyZUhlcmU",
  "user": {
    "username": "admin"
  }
}
```

**Response `401 Unauthorized`:**
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

**Mock credentials available:**

| Username | Password |
|----------|----------|
| admin | admin123 |
| user | user123 |

> **Note:** This is a mock auth implementation. Tokens are static strings and are not cryptographically signed. In production, use `jsonwebtoken` and `bcrypt`.

---

## Middleware

### Request Logger

Every incoming request is logged to the server console:

```
[GET] /api/posts - 10:05 AM
[POST] /api/posts - 10:06 AM
[DELETE] /api/posts/1 - 10:07 AM
```

The logger runs globally before all route handlers, implemented as a custom Express middleware function in `middleware/logger.js`.

---

## Error Handling

| Status Code | Meaning | When |
|------------|---------|------|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST |
| `400` | Bad Request | Missing or invalid request body fields |
| `401` | Unauthorized | Invalid login credentials |
| `404` | Not Found | Resource with given ID does not exist |
| `500` | Internal Server Error | Unhandled server exception |

---

## Development Notes

### Data Persistence

All data lives in memory via a `blogPosts` array mounted on `app.locals`. Data resets on every server restart. This is intentional for this phase — a production version would connect to MongoDB or PostgreSQL.

### ID Generation

Post IDs are auto-incremented server-side using a counter function on `app.locals.getNextId()`. Clients never send or control IDs.

### Partial Updates

`PUT /api/posts/:id` supports partial updates using the object spread pattern `{ ...existingPost, ...req.body }`. Only fields present in the request body are updated. The `id` field is protected from client modification.

---

## Author

**Yogesh**
Built as part of a Node.js & Express backend engineering sprint.

---

## License

MIT