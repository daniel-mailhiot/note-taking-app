# Note-Taking App

A full-stack note-taking web app built for a school assignment using Node.js, Express, MongoDB, and EJS.

## Current Features

- User registration, login, and logout
- Password hashing with bcrypt
- Session-based authentication
- Notes stored in MongoDB using a Mongoose model
- User-specific notes CRUD (create, read, update, delete)
- Server-rendered UI with EJS partials and Bootstrap

## Project Goals

This project implements:

- Express.js server setup and route handling
- REST-style notes endpoints (GET, POST, PUT, DELETE)
- MongoDB + Mongoose data modeling and persistence
- Front-end + back-end integration
- Authentication and per-user data ownership
- Server-side validation and error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap
- express-session
- bcrypt
- method-override
- dotenv
- cors

## Project Structure

```text
note-taking-app/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── noteController.js
├── models/
│   ├── Note.js
│   └── User.js
├── public/
│   └── styles.css
├── routes/
│   ├── authRoutes.js
│   └── noteRoutes.js
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── notes/
│   │   ├── delete.ejs
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   └── new.ejs
│   └── partials/
│       ├── footer.ejs
│       ├── head.ejs
│       ├── header.ejs
│       └── scripts.ejs
├── .env
├── .gitattributes
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

## Getting Started (Local Setup)

### 1) Prerequisites

- Node.js
- MongoDB running locally

### 2) Install dependencies

Run: `npm install`

### 3) Configure environment variables

Create a `.env` file in the project root with:

```env
# Express server port
PORT=3000

# Local MongoDB connection
MONGO_URI=mongodb://127.0.0.1:27017/noteAppDB

# Session cookie signing secret
SESSION_SECRET=enter_a_random_session_secret_here

# bcrypt hashing rounds
BCRYPT_SALT_ROUNDS=10
```

For the `SESSION_SECRET` value, replace with any long random string.

### 4) Run the app

Development mode: `npm run dev`  
Standard mode: `npm start`

### 5) Open in browser

`http://localhost:3000`

## Routes

### Base Route

| Method | Route | Auth Required | Behavior |
|---|---|---|---|
| GET | `/` | No | Redirects to `/notes` |

### Auth Routes

| Method | Route | Auth Required | Request Body | Success Response | Error Response |
|---|---|---|---|---|---|
| GET | `/auth/register` | No | None | Renders register page | 500 if rendering fails |
| POST | `/auth/register` | No | `username`, `password` | Creates user, sets session, redirects to `/notes` | 400 (missing fields / short password), 409 (duplicate username), 500 |
| GET | `/auth/login` | No | None | Renders login page | 500 if rendering fails |
| POST | `/auth/login` | No | `username`, `password` | Sets session, redirects to `/notes` | 400 (missing fields), 401 (invalid credentials), 500 |
| POST | `/auth/logout` | No (but only affects logged-in users) | None | Destroys session, clears cookie, redirects to `/auth/login` | 500 |

### Notes Routes

All `/notes` routes require login. If no session, user is redirected to `/auth/login`.

| Method | Route | Auth Required | Request Body | Success Response | Error Response |
|---|---|---|---|---|---|
| GET | `/notes` | Yes | None | Renders notes list for logged-in user | 500 |
| GET | `/notes/new` | Yes | None | Renders create form | 500 |
| POST | `/notes` | Yes | `title`, `content` | Creates note for logged-in user, re-renders notes list | 400 (missing fields), 500 |
| GET | `/notes/:id/edit` | Yes | None | Renders edit form for owned note | 404 (not found/not owned), 500 |
| PUT | `/notes/:id` | Yes | `title`, `content` | Updates owned note, re-renders notes list | 400, 404, 500 |
| GET | `/notes/:id/delete` | Yes | None | Renders delete confirmation for owned note | 404, 500 |
| DELETE | `/notes/:id` | Yes | None | Deletes owned note, redirects to `/notes` | 404, 500 |


## Data Models

### User Model (`models/User.js`)

- `username`: String, required, unique, trim, min 3, max 30
- `passwordHash`: String, required
- `timestamps`: enabled (`createdAt`, `updatedAt`)

### Note Model (`models/Note.js`)

- `title`: String, required, trim, max 40
- `content`: String, required, trim, max 2000
- `userId`: String, required (stores owner user id)
- `timestamps`: enabled (`createdAt`, `updatedAt`)

## Validation and Error Handling

- Server-side required-field validation is handled in the auth and note controllers.
- Password minimum length is enforced during registration.
- Duplicate usernames return HTTP `409 Conflict`.
- Invalid login credentials return HTTP `401 Unauthorized`.
- Missing note fields return HTTP `400 Bad Request`.
- Unauthorized note access is prevented by filtering queries with both `_id` and `userId`.
- Missing/non-owned notes return HTTP `404 Not Found`.
- Server/database failures return HTTP `500 Internal Server Error`.

## Authentication and Authorization

- Authentication uses `express-session`.
- Passwords are hashed with bcrypt before storage.
- `req.session.userId` and `req.session.username` are stored on login/register.
- Notes routes are protected by middleware (`requireAuth` in `routes/noteRoutes.js:`).
- Each note query is scoped to the logged-in user to prevent cross-user access. ({ _id: id, userId: req.session.userId })

## Front-End

- Views rendered using EJS templates
- Reusable layout sections handled with EJS partials
- Bootstrap for layout and components
- `method-override` enables PUT/DELETE from HTML forms via (`?_method=PUT`, `?_method=DELETE`)

## Plan to implement
- Create middleware folder to better organize middleware logic (eg, auth middleware currently mixed into route file)
- Add ability to view and read notes individually (currently can only view all notes from dashboard)
- More testing is needed for edge cases and bugs

## Known issues
- Refreshing the page after creating a note causes the note to duplicate
