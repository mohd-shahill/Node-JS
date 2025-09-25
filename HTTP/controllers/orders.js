import pool from "../database/db.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const createOrder = (request, response) => {
    let body='';
    request.on("data", (chunk) =>{
        body += chunk.toString();
    });
 
    request.on("end", async () => {
        try{
            
            const data = JSON.parse(body);
            const { order_id, order_name } = data;
            const order_started = data.order_started || Math.floor(Date.now() / 1000);

            if( !order_id || !order_name ){
                response.writeHead(400, {"Content-Type" : "application/json"});
                response.end(JSON.stringify({
                    error: "Please provide both order_id and order_name."
                }));
                return;
            }

            const check = /^[a-zA-Z0-9]+$/;

            if (!check.test(order_id)) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Only alphanum is allowed in order_id" }));
                return;
            }

            if (!check.test(order_name)) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Only alphanum is allowed in order_name" }));
                return;
            }

            const order_exist_query = "SELECT order_id FROM orders WHERE order_id = $1";
            const order_exist_result = await pool.query(order_exist_query, [order_id]);

            if (order_exist_result.rowCount > 0) {
            response.writeHead(409, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ error: "Order_id already exists." }));
                return;
            }

            const query = "INSERT INTO orders (order_id, order_name, order_started) VALUES ($1, $2, $3) RETURNING *";
            const values = [order_id, order_name, order_started];

            const result = await pool.query(query, values);

            response.writeHead(201, {"Content-Type" : "application/json"});
            response.end(JSON.stringify({
                message: "Order created successfully",
                order: result.rows[0]
            }));

        } catch (error) {
            console.log("Error", error);
            response.writeHead(500, {"Content-Type" : "application/json"});
            response.end(JSON.stringify({
                error: "This api is not working."
            }));
        }
    })
}

export const seeOrder = async (request, response) => {
    try {
        const query = "SELECT * FROM orders";
        const result = await pool.query(query);
        
        // console.log(result.rows.length);
        response.writeHead(200, {"Content-Type" : "application/json"});
        response.end(JSON.stringify({
            message: "All orders detail.",
            orders: result.rows
        }));

    } catch (error) {
        console.log("Error", error);
        response.writeHead(500, {"Content-Type" : "application/json"});
        response.end(JSON.stringify({
            error: "This api is not working."
        }));
    };
}

export const seeOrderById = async (request, response) => {
    try{

        const get_id_from_url = request.url.split('/').filter(Boolean);
        const id = get_id_from_url[3];

        const query = 'SELECT * FROM orders WHERE order_id = $1';
        const values = [id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
                response.writeHead(404, { "Content-Type" : "application/json" });
                response.end(JSON.stringify({
                error: "The order's not present.",
            }))
        } else {
            response.writeHead(200, { "Content-Type" : "application/json" });
            response.end(JSON.stringify({
                message: "Data fetched by order_id.",
                order: result.rows
            }))
        }

    } catch (error) {
        console.log("Error", error);
        response.writeHead(500, {"Content-Type" : "application/json"});
        response.end(JSON.stringify({
            error: "This api is not working."
        }));
    }
}

export const deleteOrderById = async (request, response) => {
    try {

        const get_id_from_url = request.url.split('/').filter(Boolean);
        const id = get_id_from_url[3];

        const query = 'DELETE FROM orders WHERE order_id = $1';
        const values = [id];

        const result = await pool.query(query, values);

        response.writeHead(200, { "Content-Type" : "application/json" });
        response.end(JSON.stringify({
            message: "Order deleted.",
            order: result.rows[0]
        }))

    } catch (error) {
        console.log("Error", error);
        response.writeHead(500, { "Content-Type" : "application/json" })
        response.end(JSON.stringify({
            error: "Error"
        }))
    }
}

export const editOrderById = (request, response) => {
    let body ='';
    request.on("data", (chunk) => {
        body += chunk.toString();
    })

    request.on("end", async () => {
        try {
            // console.log(body);
            const get_id_from_url = request.url.split('/').filter(Boolean);
            const id = get_id_from_url[3];
            
            const data = JSON.parse(body);
            const { order_name, order_started } = data;
            
            // console.log(id, data);

            const query = "UPDATE orders SET order_name = $1, order_started = $2 WHERE order_id = $3 RETURNING *";
            const values = [order_name, order_started, id];

            const result = await pool.query(query, values);
            
            if (result.rows.length === 0) {
                response.writeHead(418, { "Content-Type" : "application/json"});
                response.end(JSON.stringify({
                    error: "order_id is either wrong or not present."
                }))
            } else {
                response.writeHead(200, { "Content-Type" : "application/json"});
                response.end(JSON.stringify({
                    message: "order updated successfully.",
                    updated_order: result.rows[0]
                }))
            }

        } catch (error) {
            console.log("Error", error);
            response.writeHead(500, { "Content-Type" : "application/json" })
            response.end(JSON.stringify({
            error: "Error."
        }))
        }
    })
}

export const fileUpload = (request, response) => {
    const chunks = [];
    const boundry = request.headers['content-type'].split("=")[1];
    request.on("data", (chunk) => {
        chunks.push(chunk);
    })

    request.on('end', async () => {
        try{

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            const body_buffer = Buffer.concat(chunks);
            const body_string = body_buffer.toString('binary');

            const parts = body_string.split(`--${boundry}`);
            const file_part = parts.find((part) => part.includes('Content-Disposition'));

            const header_end_index = file_part.indexOf('\r\n\r\n') + 4;
            const file_data = file_part.substring(header_end_index, file_part.lastIndexOf('\r\n'));

            const file_buffer = Buffer.from(file_data, 'binary');

            const content_disposition_line = file_part.split('\r\n')[1];
            const match = content_disposition_line.match(/filename="(.+)"/);
            if (!match) throw new Error('Filename not found');

            const original_file_name = match[1];

            const ext = path.extname(original_file_name);

            const file_name = Date.now() + ext;


            fs.writeFile(path.join(__dirname, ".." ,"uploads", file_name), file_buffer, (error) =>{
                if(error){
                    response.writeHead(500, { "Content-Type" : "application/json" });
                    response.end(JSON.stringify({
                        error: "Error while saving the file."
                    }))
                } else {
                    response.writeHead(200, { "Content-Type" : "application/json" });
                    response.end(JSON.stringify({
                        message: "file uploaded successfully."
                    }))
                }
            })

            const uploadDir = path.join(__dirname, ".." ,'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            const file_path = path.join("uploads", file_name);

            const query = "INSERT INTO upload (path) VALUES ($1) RETURNING *";
            const values = [file_path];

            await pool.query(query, values);

        } catch (error) {
            console.log("Error", error);
            response.writeHead(500, {"Content-Type" : "application/json"});
            response.end(JSON.stringify({
                error: "This api is not working."
            }));
        }
    })
}