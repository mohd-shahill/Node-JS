import http from "http";
import dotenv from 'dotenv';
import pool from './database/db.js';
import { createOrder, seeOrder } from "./controllers/orders.js";
dotenv.config();

const PORT = process.env.PORT;

const server =  http.createServer((req, res) => {
    if (req.url == "/api/create-order" && req.method == "POST"){
        createOrder(req, res);
    } else if (req.url == "/api/see-orders" && req.method == "GET"){
        seeOrder(req, res);
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

pool.connect((error) => {
    if (error){
        console.log("Error connecting to the db.", error.stack)
    } else {
        console.log("DB connected successfully.")
    }
})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running at ${PORT}`);
});