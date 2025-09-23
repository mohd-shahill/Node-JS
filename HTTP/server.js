import http from "http";
import dotenv from 'dotenv';
import pool from './database/db.js';
import { createOrder, seeOrder } from "./controllers/orders.js";
dotenv.config();

const PORT = process.env.PORT;

const server =  http.createServer((request, response) => {
    if (request.url == "/api/create-order" && request.method == "POST"){
        createOrder(request, response);
    } else if (request.url == "/api/see-orders" && request.method == "GET"){
        seeOrder(request, response);
    } else {
        response.writeHead(404);
        response.end("mmhm are you sure you are on right url?");
    }
});

pool.connect((error) => {
    if (error){
        console.log("Lol got an error with db connection.", error.stack)
    } else {
        console.log("DB connected - Well done :)")
    }
})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Can you see which port it is connected to - ${PORT}`);
});