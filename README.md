# STPK

STPK is a forum web application with a React frontend and Express.js backend that allows users to manage themes, posts, and comments.

## Project Structure

```
STPK/
├── README.md
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── entity/          # TypeORM entities (Theme, Post, Comment)
│   │   ├── middleware/      # Express middleware
│   │   ├── validationUtils/ # Request validation utilities
│   │   ├── index.ts         # Application entry point
│   │   ├── router.ts        # API routes definition
│   │   └── swagger.ts       # API documentation setup
│   ├── docker-compose.yaml  # MySQL database container
│   └── package.json
└── frontend/                # React application (coming soon)
```

## Features

- **Themes Management**: Create, read, update, and delete discussion themes
- **Posts Management**: Create and manage posts within themes
- **Comments System**: Add comments to posts
- **RESTful API**: Full CRUD operations with proper HTTP status codes
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database Relations**: Proper foreign key relationships between entities
- **Request Validation**: Comprehensive input validation with class-validator
- **Pagination**: Paginated responses for list endpoints
- **Error Handling**: Centralized error handling with custom error types

## Technology Stack

### Backend

- **Node.js** with **TypeScript**
- **Express.js** - Web framework
- **TypeORM** - Database ORM
- **MySQL** - Database
- **class-validator** - Request validation
- **Swagger/OpenAPI** - API documentation
- **Docker** - Database containerization

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd STPK/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `backend` directory with the following variables:

   ```env
   # Server Configuration
   SERVER_PORT=3000

   # MySQL Database Configuration
   MYSQL_DATABASE=stpk_forum
   MYSQL_USERNAME=stpk_user
   MYSQL_PASSWORD=your_password_here
   MYSQL_ROOT_PASSWORD=root_password_here
   MYSQL_PORT=3306
   MYSQL_URL=localhost
   MYSQL_SHOULD_SYNC=true
   ```

4. **Start the MySQL Database**

   ```bash
   docker-compose up -d
   ```

   This will start a MySQL container with the configuration from your `.env` file.

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

6. **Access the Application**
   - API Server: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs
   - OpenAPI Spec: http://localhost:3000/api-docs.json

## API Endpoints

### Themes

- `GET /api/themes` - Get all themes (paginated)
- `GET /api/themes/:id` - Get theme by ID
- `POST /api/themes` - Create new theme
- `PUT /api/themes/:id` - Update theme (full)
- `PATCH /api/themes/:id` - Update theme (partial)
- `DELETE /api/themes/:id` - Delete theme

### Posts

- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post (full)
- `PATCH /api/posts/:id` - Update post (partial)
- `DELETE /api/posts/:id` - Delete post

### Comments

- `GET /api/comments` - Get all comments (paginated)
- `GET /api/comments/:id` - Get comment by ID
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment (full)
- `PATCH /api/comments/:id` - Update comment (partial)
- `DELETE /api/comments/:id` - Delete comment

## API Documentation

The API includes comprehensive Swagger/OpenAPI documentation available at `/api-docs` when the server is running. This includes:

- Interactive API explorer
- Request/response schemas
- Example payloads
- Error response formats
- Pagination details

## Error Handling

The API uses standardized error responses:

- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `422` - Unprocessable Entity (empty request body)
- `500` - Internal Server Error
