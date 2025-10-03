# City of Gold Backend

Backend service for the **City of Gold** project.  
Built with **Node.js**, **Express**, **TypeScript**, and **MySQL**, with JWT-based authentication, audit logging, and Docker support.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Startup](#installation--startup)
- [API Routes](#api-routes)
- [Database](#database)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [Logs](#logs)

---

## Features

- **User Authentication**
  - Register (`/api/auth/register`)
  - Login (`/api/auth/login`)
  - Passwords hashed with `bcrypt`
  - JWT-based stateless authentication

- **Profile Management**
  - View & update authenticated user profile (`/api/profile`)
  - Profile update triggers **audit logs**

- **Audit Logging**
  - Records user actions such as login and profile update
  - Stored in `audit_logs` table
  - Fields: `user_id`, `action`, `timestamp`

- **Transaction Management**
  - Profile updates + audit log insertion run in a single transaction to ensure atomicity

- **Dockerized**
  - Backend + MySQL run together with Docker Compose

---

## Prerequisites

- Node.js 18+  
- Docker & Docker Compose (for containerized setup)  
- MySQL (if running locally without Docker)

---

## Environment Variables

Create a `.env` file in `city-of-gold-be`:

```dotenv
PORT=4000
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=city_of_gold
DB_PORT=3306
JWT_SECRET=supersecret
