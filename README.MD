I will correct the formatting errors in the Table of Contents (removing the Google search links and replacing them with correct internal Markdown anchor links) and integrate the provided external link for the live phpMyAdmin server under the **Live Demo & Repository** section and the **Running the Full Stack (Docker)** section.

Here is the corrected and finalized Markdown file:

````markdown
# City of Gold Backend

Backend service for the City of Gold project. Built with **Node.js**, **Express**, **TypeScript**, and **MySQL**, with JWT-based authentication, audit logging, and Docker support.

## 🚀 Live Demo & Repository

| Resource | Link |
| :--- | :--- |
| **Live Frontend** | [https://city-of-gold-app.vercel.app/](https://city-of-gold-app.vercel.app/) |
| **API Documentation** | [https://documenter.getpostman.com/view/38221780/2sB3QGuX1B](https://documenter.getpostman.com/view/38221780/2sB3QGuX1B) |
| **Live phpMyAdmin** | [https://city-of-gold-phpmyadmin-server.onrender.com/](https://city-of-gold-phpmyadmin-server.onrender.com/) |
| **GitHub Repository** | [https://github.com/JericoDj/city-of-gold-app](https://github.com/JericoDj/city-of-gold-app) |

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Startup (Local without Docker)](#installation--startup-local-without-docker)
- [API Routes](#api-routes)
- [Database](#database)
- [Docker Setup](#docker-setup)
- [Running the Full Stack (Docker)](#running-the-full-stack-docker)
- [Testing](#testing)
- [Logs](#logs)

---

## Features

| Category | Feature | Details |
| :--- | :--- | :--- |
| **User Authentication** | Register | `POST /api/auth/register` |
| | Login | `POST /api/auth/login` |
| | Security | Passwords hashed with `bcrypt` |
| | Authentication | JWT-based stateless authentication |
| **Profile Management** | View Profile | `GET /api/profile` (Requires JWT) |
| | Update Profile | `PUT /api/profile` (Triggers audit log) |
| **Audit Logging** | Recording | Records user actions (login, profile updates) |
| | Storage | Stored in `audit_logs` table |
| | Fields | `user_id`, `action`, `timestamp` |
| **Transaction Management** | Atomicity | Profile updates + audit log insertion run in a single transaction |
| **Dockerized** | Deployment | Backend + MySQL + (optional) Frontend run together with Docker Compose |

---

## Prerequisites

- **Node.js** 18+
- **Docker** & **Docker Compose** (for containerized setup)
- **MySQL** (if running locally without Docker)

---

## Environment Variables

Create a `.env` file in the `city-of-gold-be` directory. (Note: Use `DB_HOST=localhost` if running locally without Docker.)

```env
PORT=4000
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=city_of_gold
DB_PORT=3306
JWT_SECRET=supersecret
````

-----

## Installation & Startup (Local without Docker)

1.  **Configure MySQL Database and User:**

      * Log into your local MySQL server as the root user:
        ```bash
        mysql -u root -p
        # Enter your root password when prompted.
        ```
      * Inside the MySQL shell, run the following SQL commands:
        ```sql
        CREATE DATABASE IF NOT EXISTS city_of_gold;
        CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'password';
        GRANT ALL PRIVILEGES ON city_of_gold.* TO 'user'@'localhost';
        FLUSH PRIVILEGES;
        EXIT;
        ```
        > **Note:** This uses the default user/password from the `.env` file.

2.  **Install Dependencies:**

      * Navigate into the backend directory and install packages:
        ```bash
        cd city-of-gold-be
        npm install
        ```

3.  **Start the Backend:**

      * Run the development script:
        ```bash
        npm run dev
        ```

-----

## API Routes

### Authentication

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Register new user |
| `/api/auth/login` | `POST` | Login user |

### Profile

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/profile` | `GET` | View authenticated user profile (JWT required) |
| `/api/profile` | `PUT` | Update profile (triggers audit log) |

-----

## Database

  * **Database:** MySQL database named `city_of_gold`
  * **Tables:**
      * `users`: Stores user credentials
      * `audit_logs`: Records login & profile updates
  * **Schema:** Managed via migration scripts (e.g., Sequelize, Knex)

-----

## Docker Setup

Example `docker-compose.yml` (includes MySQL, Backend, and phpMyAdmin for easy database access):

```yaml
version: '3.8'

services:
  db:
    image: mysql:8.0
    container_name: city_of_gold_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: supersecret
      MYSQL_DATABASE: city_of_gold
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build:
      context: ./city-of-gold-be
    container_name: city_of_gold_backend
    restart: always
    ports:
      - "4000:4000"
    environment:
      DB_HOST: db
      DB_USER: user
      DB_PASSWORD: password
      DB_NAME: city_of_gold
      DB_PORT: 3306
      JWT_SECRET: supersecret
    depends_on:
      - db

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: city_of_gold_phpmyadmin
    restart: always
    ports:
      - "8080:80"
    environment:
      PMA_HOST: db
      PMA_USER: user
      PMA_PASSWORD: password
    depends_on:
      - db

volumes:
  db_data:
```

-----

## Running the Full Stack (Docker)

1.  **Start Services:**

    ```bash
    docker-compose up -d
    ```

2.  **Check Status:**

    ```bash
    docker ps
    ```

    > Expected containers: `city_of_gold_db`, `city_of_gold_backend`, `city_of_gold_phpmyadmin`.

3.  **Access URLs:**

      * **Backend URL:** `http://localhost:4000`
      * **Frontend URL (Demo):** [https://city-of-gold-app.vercel.app/](https://city-of-gold-app.vercel.app/)
      * **MySQL (via local phpMyAdmin):** `http://localhost:8080` (Login with user: `user`, pass: `password`)
      * **MySQL (Live via Render):** [https://city-of-gold-phpmyadmin-server.onrender.com/](https://city-of-gold-phpmyadmin-server.onrender.com/)

4.  **Stop Containers:**

    ```bash
    docker-compose down
    ```

-----

## Testing

Run backend unit tests:

```bash
npm run test
```

> Tests critical endpoints: login, profile update, registration.

-----

## Logs

View live logs for any container:

```bash
docker logs -f city_of_gold_backend
docker logs -f city_of_gold_db
docker logs -f city_of_gold_phpmyadmin
```

```
```