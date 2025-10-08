import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { request } from 'http';

dotenv.config();

function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, { "Content-Type" : "application/json" });
    response.end(JSON.stringify(data));
}

export const authenticationToken = (request, response, handler) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token) {
        return sendJson(response, 401, { error: "Access token is missing." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if(error) {
            const message = error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
            return sendJson(response, 401, { message });
        }

        request.user = user;
        handler(request, response);
    })
}