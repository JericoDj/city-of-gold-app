import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",        
  user: process.env.DB_USER || "user",      
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "city_of_gold",
  port: Number(process.env.DB_PORT) || 3306, 
  timezone: "+08:00",
});