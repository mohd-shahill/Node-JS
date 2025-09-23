import http from "http";
import dotenv from 'dotenv';
import pool from './database/db.js';
import { createOrder, deleteOrderById, editOrderById, seeOrder, seeOrderById } from "./controllers/orders.js";
dotenv.config();

const PORT = process.env.PORT;


const server =  http.createServer((request, response) => {

    if (request.url == "/api/create/order" && request.method == "POST"){
        createOrder(request, response);
    } else if (request.url == "/api/see/order/all" && request.method == "GET"){
        seeOrder(request, response);
    } else if (request.url.startsWith("/api/see/order/") && request.method == "GET") {
        seeOrderById(request, response);
    } else if (request.url.startsWith("/api/see/order/") && request.method == "DELETE") {
        deleteOrderById(request, response);
    } else if (request.url.startsWith("/api/edit/order/") && request.method == "PUT"){
        editOrderById(request, response);
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