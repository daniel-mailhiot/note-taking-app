# Note-Taking App (In Progress)

A full-stack note-taking web app built for a school assignment using Node.js, Express, MongoDB, and EJS.

## Project Status

This project is currently **in progress**.

- Core notes CRUD is implemented with server-rendered EJS pages
- MongoDB + Mongoose integration is working
- Authentication is not fully implemented yet (currently using a temporary user id in code)
- README will be updated as features and milestones are completed

## Assignment Goals

This project is designed to practice:

- Express.js server setup and route handling
- CRUD operations for notes
- MongoDB data modeling and persistence
- Front-end + back-end integration
- Authentication and per-user data ownership
- Validation, error handling, and documentation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS (with partials)
- Bootstrap
- method-override
- dotenv
- cors
- bcrypt (planned for authentication)

## Current Features

- Create, read, update, and delete notes through EJS views
- Notes stored in MongoDB using a Mongoose model
- Basic server-side required-field validation
- Shared EJS partials for reusable layout components
- Method override support for PUT/DELETE form actions

## Features In Progress

- Real authentication flow (planned: local auth with bcrypt)
- True per-user note isolation using authenticated user identity
- More polished error feedback to users

## Project Structure

```text
note-taking-app/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── noteController.js
├── models/
│   └── Note.js
├── routes/
│   └── noteRoutes.js
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── scripts.ejs
│   ├── notes/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── delete.ejs
│   └── index.ejs
├── public/
│   └── styles.css
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

`PORT=3000`  
`MONGO_URI=mongodb://127.0.0.1:27017/noteAppDB`

### 4) Run the app

Development mode: `npm run dev`  
Standard mode: `npm start`

### 5) Open in browser

`http://localhost:3000`

## Current Routes (Server-rendered)

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Redirect to notes list |
| GET | `/notes` | Show all notes |
| GET | `/notes/new` | Show create note form |
| POST | `/notes` | Create note |
| GET | `/notes/:id/edit` | Show edit form |
| PUT | `/notes/:id` | Update note |
| GET | `/notes/:id/delete` | Show delete confirmation |
| DELETE | `/notes/:id` | Delete note |


## Known Limitations (Current Version)

- Authentication is incomplete
- Hardcoded temporary user id is still used in note queries
- README will be expanded as milestones are completed
- There are probably bugs that need to be addressed as development continues
- UI/UX design is a placeholder for now and will be improved in future versions

## Roadmap

Done:
- Express app and MongoDB connection
- Notes model and CRUD controllers
- EJS pages with partials

TODO:
- Authentication (local auth + bcrypt)
- Per-user authorization checks
- Validation and error handling improvements
- Testing, bug fixes, polish
- UI/UX improvements (current is temporary), css styling