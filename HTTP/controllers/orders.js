import pool from "../database/db.js";

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
                response.end(JSON.stringify("Please provide boooooooooth order_id and order_name."));
                return;
            }

            const check = /^[a-zA-Z0-9]+$/;

            if (!check.test(order_id)) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "only alphanum is allowed in order_id" }));
                return;
            }

            if (!check.test(order_name)) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "only alphanum is allowed in order_name" }));
                return;
            }

            const query = "INSERT INTO orders (order_id, order_name, order_started) VALUES ($1, $2, $3) RETURNING *";
            const values = [order_id, order_name, order_started];

            const result = await pool.query(query, values);

            response.writeHead(201, {"Content-Type" : "application/json"});
            response.end(JSON.stringify({
                message: "Yayyyy its finally working!",
                order: result.rows[0]
            }));

        } catch (error) {
            console.log("Error", error);
            response.writeHead(500, {"Content-Type" : "application/json"});
            response.end(JSON.stringify("This api sucks."));
        }
    })
}

export const seeOrder = async (request, response) => {
    try {
        const query = "SELECT * FROM orders";
        const result = await pool.query(query);
        
        // console.log(result.rows.length);
        response.writeHead(201, {"Content-Type" : "application/json"});
        response.end(JSON.stringify({
            message: "Yayyy this works!",
            orders: result.rows
        }));

    } catch (error) {
        console.log("Error", error);
        response.writeHead(500, {"Content-Type" : "application/json"});
        response.end(JSON.stringify({
            message: "This api sucks."
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
                message: "Hehe the order's not present here",
            }))
        } else {
            response.writeHead(200, { "Content-Type" : "application/json" });
            response.end(JSON.stringify({
                message: "See that data using order_id",
                order: result.rows
            }))
        }


    } catch (error) {
        console.log("Error", error);
        response.writeHead(500, {"Content-Type" : "application/json"});
        response.end(JSON.stringify({
            message: "This api sucks."
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
            message: "Oh no its deleted.",
            order: result.rows[0]
        }))

    } catch (error) {
        console.log("Error", error);
        response.writeHead(500, { "Content-Type" : "application/json" })
        response.end(JSON.stringify({
            message: "Error error error"
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
                response.writeHead(404, { "Content-Type" : "application/json"});
                response.end(JSON.stringify({
                    message: "EMPTY EMPTY EMPTY."
                }))
            } else {
                response.writeHead(200, { "Content-Type" : "application/json"});
                response.end(JSON.stringify({
                    message: "Woah its actually updated.",
                    updated_order: result.rows[0]
                }))
            }

        } catch (error) {
            console.log("Error", error);
            response.writeHead(500, { "Content-Type" : "application/json" })
            response.end(JSON.stringify({
            message: "Error error error"
        }))
        }
    })
}