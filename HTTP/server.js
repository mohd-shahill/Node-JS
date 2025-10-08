import http from "http";
import dotenv from 'dotenv';
import pool from './database/db.js';
import { createOrder, deleteOrderById, editOrderById, seeOrder, seeOrderById, fileUpload, deleteUploadById } from "./controllers/orders.js";

import { authenticationToken } from "./middlewares/authVerification.js";

dotenv.config();

const PORT = process.env.PORT;


const server =  http.createServer((request, response) => {

    if (request.url == "/api/create/order" && request.method == "POST"){
        authenticationToken(request, response, createOrder);
    } else if (request.url == "/api/see/order/all" && request.method == "GET"){
        authenticationToken(request, response, seeOrder);
    } else if (request.url.startsWith("/api/see/order/") && request.method == "GET"){
        authenticationToken(request, response, seeOrderById);
    } else if (request.url.startsWith("/api/see/order/") && request.method == "DELETE"){
        authenticationToken(request, response, deleteOrderById);
    } else if (request.url.startsWith("/api/edit/order/") && request.method == "PUT"){
        authenticationToken(request, response, editOrderById);
    } else if (request.url == "/api/upload" && request.method == "POST"){
        authenticationToken(request, response, fileUpload);
    } else if (request.url.startsWith("/api/upload") && request.method == "DELETE"){
        authenticationToken(request, response, deleteUploadById);
    } else {
        response.writeHead(404);
        response.end("Wrong URL? or Not Found");
    }
});

pool.connect((error) => {
    if (error){
        console.log("Got an error with db connection.", error.stack)
    } else {
        console.log("DB connected")
    }
})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is connected to port - ${PORT}`);
});