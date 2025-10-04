import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "bdgx8znj66odcc022qtw-mysql.services.clever-cloud.com",        
  user: process.env.DB_USER || "u8mpaehh5lm24bzn",      
  password: process.env.DB_PASSWORD || "4tBnzDNUzh3bIuYYaAoj",
  database: process.env.DB_NAME || "bdgx8znj66odcc022qtw",
  port: Number(process.env.DB_PORT) || 3306, 
  timezone: "+08:00",
});