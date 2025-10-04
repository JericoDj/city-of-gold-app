import app from "./app";
import { db } from "./db/db";
import { initTables } from "./db/initTables";

const PORT = process.env.PORT || 4000;

db.getConnection()

  .then((conn) => {
    conn.query(`SET time_zone = '+08:00'`);

    initTables();
  
    
    console.log(`MySQL connected (host: ${process.env.DB_HOST}, port: ${process.env.DB_PORT})`);
    conn.release(); 
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
