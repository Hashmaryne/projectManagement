Overview
This project is a web application designed for managing properties and leads, with distinct user roles and authentication. The backend is developed using Node.js and Express, while the frontend is built with React and Next.js. The state management is handled using Redux, Zustand, React Query, hooks, or Context API. The application features a clean code architecture and includes unit tests for the frontend code.

Features
Authentication for admin users with form validation and token storage
Views to display and manage property cards and leads
State management using Redux, Zustand, React Query, hooks, or Context API
Unit tests for frontend code
Clean code architecture
User roles and authentication
Frontend-backend integration using Node/Express or Nest/Express
Database management with PostgreSQL (using Prisma) or MongoDB (using Mongoose)
Tech Stack
Frontend: React, Next.js
Backend: Node.js, Express (or Nest/Express)
Database: PostgreSQL (with Prisma) or MongoDB (with Mongoose)
State Management: Redux, Zustand, React Query, hooks, or Context API
Testing: Jest, React Testing Library
Getting Started
Prerequisites
Node.js (v14 or later)
npm or yarn
PostgreSQL or MongoDB
Installation
Clone the repository:

git clone https://github.com/your-username/your-repo.git
Navigate to the project directory:


cd your-repo
Install the dependencies:
npm install
Set up the environment variables:
Create a .env file in the root directory and add the necessary environment variables. Example:
env
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
Database Setup

Ensure MongoDB is installed and running.
Update the DATABASE_URL in the .env file with your MongoDB connection string.
Running the Application
Start the backend server:

npm run dev

cd client
Install the frontend dependencies:

npm install

Start the frontend server:

npm run dev

The application ould now be running at http://localhost:3000.

Running Tests
To run the unit tests for the frontend code, use the following command:

npm run test