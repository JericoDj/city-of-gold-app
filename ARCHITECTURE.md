City of Gold App – Architecture Overview

This document outlines the key architectural decisions for the City of Gold project, covering security, data flow, database schema, and quality assurance.

1. Security Choices
Authentication & Authorization
Authentication: JWT (JSON Web Tokens) are used for stateless authentication.

Token Lifetime: Tokens expire in 1 hour to reduce the risk of compromise.

Transport: Tokens are sent in the Authorization header as Bearer <token> for all protected routes.

Password Security
Hashing: Passwords are never stored in plain text. They are hashed using bcrypt.

Complexity: Passwords are hashed using bcrypt with 10 salt rounds upon registration.

Verification: During login, bcrypt compares the stored hash with the supplied password.

Justification
JWT allows for scalable authentication without requiring server-side session storage.

bcrypt ensures passwords are securely stored, mitigating leaks from database compromise.

2. Data Flow
User Registration
Frontend sends: { username, email, password } to POST /api/auth/register.

Backend hashes the password.

Backend inserts the new user record into the users table.

Backend returns a success message.

User Login
Frontend sends: { email, password } to POST /api/auth/login.

Backend fetches the user record by email.

Backend compares the supplied password with the stored hash using bcrypt.

Backend issues a JWT upon successful validation and returns the token.

Protected Routes
Frontend includes the JWT in the Authorization: Bearer <token> header.

Backend Middleware verifies the JWT's signature and expiration time.

If valid, the request is processed. If invalid, the request is rejected (e.g., 401 Unauthorized).

Frontend Structure
Framework: React + TypeScript.

State Management: Utilizes React Hooks and Context API for state management.

Code Quality: Components are modular, reusable, and unit-tested.

3. Database Schema Design
The application uses a MySQL database with two main tables: users and audit_logs.

Table: users
Stores core user credentials.

id: INT (Primary Key, Unique user identifier)

username: VARCHAR(255) (Unique user display name)

email: VARCHAR(255) (Unique user login email)

password: VARCHAR(255) (Hashed password)

created_at: TIMESTAMP (Account creation timestamp)

updated_at: TIMESTAMP (Last account update timestamp)

Table: audit_logs
Stores a record of significant user actions.

id: INT (Primary Key, Unique log entry identifier)

user_id: INT (Foreign Key to users.id)

action: VARCHAR(255) (Description of the action, e.g., 'login')

timestamp: TIMESTAMP (Time the action occurred)

4. Testing & Code Quality
Backend (Node.js + Express + TypeScript)
Tooling: Jest.

Coverage: Includes unit tests and integration tests for key API endpoints (/login, /register, /profile).

Frontend (React + TypeScript)
Tooling: Jest and React Testing Library.

Coverage: Focuses on unit testing modular components and utility functions.

This strategy ensures code correctness, prevents regressions, and enforces architectural modularity.