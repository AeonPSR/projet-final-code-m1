# Project Management Application

A full-stack project management application built with Vue.js frontend and Node.js backend, designed for collaborative project and task management.

## Features

### Authentication
- **User Registration**: Create new user accounts with name, email, and password
- **User Login**: Secure authentication with JWT tokens
- **Session Management**: Persistent login state with automatic logout functionality
- **User Profile Display**: Show logged-in user's name and email in the navigation

### Project Management
- **Create Projects**: Add new projects with title and description
- **View Projects**: Dashboard displaying all user projects in a responsive card layout
- **Edit Projects**: Inline editing of project details
- **Delete Projects**: Remove projects with confirmation dialog
- **Project Details**: Dedicated view for individual projects

### Task Management
- **Create Tasks**: Add tasks to projects with title, description, and status
- **Task Status Tracking**: Three status levels (To Do, In Progress, Done)
- **Edit Tasks**: Modify task details and status
- **Delete Tasks**: Remove tasks from projects
- **Visual Status Indicators**: Color-coded badges for different task statuses

### Collaboration
- **Add Collaborators**: Invite users to projects by email
- **Remove Collaborators**: Manage project team members
- **Collaborator Display**: View all project collaborators with user information

### User Interface
- **Responsive Design**: Modern, clean interface that works on all devices
- **Left Navigation Panel**: Fixed sidebar with adaptive width
- **Material Icons**: Google Material Icons for consistent iconography
- **Hover Effects**: Interactive elements with visual feedback
- **Form Validation**: Client-side validation for all input forms
- **Loading States**: User feedback during API operations

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Well-structured backend API endpoints
- **Vue 3 Composition API**: Modern Vue.js development patterns
- **Reactive State Management**: Real-time UI updates
- **Route Protection**: Authentication-based route access
- **Error Handling**: User-friendly error messages and validation

## Technology Stack

### Frontend
- **Vue.js 3**: Progressive JavaScript framework
- **Vue Router**: Client-side routing
- **Composition API**: Modern Vue development approach
- **CSS3**: Custom styling with modern layout techniques
- **Google Material Icons**: Icon library

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd projet-final-code-m1
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
node server.js
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173` (frontend) with the backend API running on `http://localhost:5000`.

## Project Structure

```
projet-final-code-m1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.vue
│   │   ├── views/
│   │   │   ├── Dashboard.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   └── ProjectDetail.vue
│   │   ├── composables/
│   │   │   └── auth.js
│   │   └── services/
│   │       └── api.js
│   └── index.html
├── backend/
│   └── server.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Projects
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id` - Get project details

### Tasks
- `POST /api/projects/:id/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Collaboration
- `POST /api/projects/:id/collaborators` - Add collaborator
- `DELETE /api/projects/:id/collaborators/:userId` - Remove collaborator

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.