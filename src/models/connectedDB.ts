// Get the client
import mysql, {Connection} from 'mysql2/promise';
import { DB } from '../config';
let connection: Connection
export const connectDB =  async () => {
// Create the connection to database
    connection = await mysql.createConnection({
    host: DB.DB_HOST,
    user: DB.DB_USER,
    database: DB.DB_NAME,
    password: DB.DB_PASS,
    port: Number(DB.DB_PORT)
  })
 
  connection.connect().then((db) => console.log(`database connected to ${db.config.host} by user ${db.config.user}`))
}

export{connection}