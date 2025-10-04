**City of Gold Backend**

Backend service for the City of Gold project.
Built with Node.js, Express, TypeScript, and MySQL, with JWT-based authentication, audit logging, and Docker support.

-----

## Table of Contents

  * **Features**
  * **Prerequisites**
  * **Environment Variables**
  * **Installation & Startup**
  * **API Routes**
  * **Database**
  * **Docker Setup**
  * **Running the Full Stack**
  * **Testing**
  * **Logs**

-----

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
| **Transaction Management** | Atomicity | Profile updates + audit log insertion run in a single transaction. |
| **Dockerized** | Deployment | Backend + MySQL + (optional) Frontend run together with Docker Compose. |

-----

## Prerequisites

  * **Node.js** 18+
  * **Docker** & **Docker Compose** (for containerized setup)
  * **MySQL** (if running locally without Docker)

-----

## Environment Variables

Create a `.env` file in the `city-of-gold-be` directory:

```env
PORT=4000
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=city_of_gold
DB_PORT=3306
JWT_SECRET=supersecret
```

-----

## Installation & Startup (Local without Docker)

Configure MySQL Database and User:

Log into your local MySQL server as the root user:

Bash
```
mysql -u root -p
```
# Enter your root password when prompted.
Inside the MySQL shell, run the following SQL commands to create the database and the user expected by the application:

SQL

```CREATE DATABASE IF NOT EXISTS city_of_gold;
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON city_of_gold.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

```
Note: This uses the default password (password) and username (user) from the provided .env file. Change this if you are using different credentials.

Install Dependencies:

Navigate into the backend directory and install the necessary packages:

Bash
```
cd city-of-gold-be
npm install
```
Start the Backend:

Run the development script to start the server:

Bash
```
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
      * `users`: Stores user credentials.
      * `audit_logs`: Records login & profile updates.
  * **Schema:** Managed via migration scripts (e.g., Sequelize, Knex).

-----

## Docker Setup

Example `docker-compose.yml`:

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

1.  Start all services:

    ```bash
    docker-compose up -d
    ```

    > `-d` runs containers in detached mode. Services started: `backend`, `frontend`, `MySQL`.

2.  Check running containers:

    ```bash
    docker ps
    ```

    | Container Name | Image | Status | Ports |
    | :--- | :--- | :--- | :--- |
    | `city-of-gold-city_of_gold_db` | `mysql:8.0` | Up | `3306:3306` |
    | `city_of_gold_backend` | `city-of-gold-be` | Up | `4000:4000` |
    | `city_of_gold_phpmyadmin` | `phpmyadmin/phpmyadmin` | Up | `8080:80` |

3.  Access Backend:

      * **URL:** `http://localhost:4000`
      * **Example endpoints:**
          * `POST /api/auth/register`
          * `POST /api/auth/login`
          * `GET /api/profile` (JWT required)

4.  Access Frontend:

      * **URL:** `http://localhost:5176`

5.  Access MySQL (without phpMyAdmin):

      * **Option 1: Exec into container**

        ```bash
        docker exec -it city-of-gold-db mysql -u user -p
        # Enter password from .env (e.g., 'password')
        ```

      * **Option 2: Use a local MySQL client**

        | Property | Value |
        | :--- | :--- |
        | Host | `localhost` |
        | Port | `3306` |
        | User | `user` (from `.env`) |
        | Password | `password` (from `.env`) |
        | Database | `city_of-gold` |

6.  Stop all containers:

    ```bash
    docker-compose down
    ```

-----

## Testing

Backend unit tests:

```bash
npm run test
```

> Test critical endpoints: login, profile update, registration.

-----

## Logs

View Docker container logs:

```bash
docker logs -f city_of_gold_backend
docker logs -f city_of_gold_db
docker logs -f city_of_gold_phpmyadmin
```