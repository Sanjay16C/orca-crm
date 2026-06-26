import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

export const pool = new Pool({
    host : process.env.PG_HOST,
    port : process.env.PG_PORT,
    user : process.env.PG_USER,
    password : process.env.PG_PASS,
    database : process.env.PG_DATABASE
});

export const connectPostgres = async() =>{
    try {
        const client = await pool.connect();
        console.log(`Postgresql connnected : ${client.database}`);
        const result = await client.query("SELECT NOW()");
        console.log(result.rows);
        client.release();
    } catch (error) {
        console.log(error);
    }
}

