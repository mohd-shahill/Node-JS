import pool from "../database/db.js";

export const createOrder = (req, res) => {
    let body='';
    req.on("data", (chunk) =>{
        body += chunk.toString();
    });
 
    req.on("end", async () => {
        try{
            
            const data = JSON.parse(body);
            const { order_id, order_name } = data;
            const order_started = data.order_started || Math.floor(Date.now() / 1000);

            if( !order_id || !order_name ){
                res.writeHead(400, {"Content-Type" : "application/json"});
                res.end(JSON.stringify("Please provide boooooooooth order_id and order_name."));
                return;
            }

            const check = /^[a-zA-Z0-9]+$/;

            if (!check.test(order_id)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "only alphanum is allowed in order_id" }));
                return;
            }

            if (!check.test(order_name)) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "only alphanum is allowed in order_name" }));
                return;
            }

            const query = "INSERT INTO orders (order_id, order_name, order_started) VALUES ($1, $2, $3) RETURNING *";
            const values = [order_id, order_name, order_started];

            const result = await pool.query(query, values);

            res.writeHead(201, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({
                message: "Yayyyy its finally working!",
                order: result.rows[0]
            }));

        } catch (error) {
            console.log("Error", error);
            res.writeHead(500, {"Content-Type" : "application/json"});
            res.end(JSON.stringify("This api sucks."));
        }
    })
}

export const seeOrder = async (req, res) => {
    try {
        const query = "SELECT * FROM orders";
        const result = await pool.query(query);
        
        res.writeHead(201, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({
            message: "Yayyy this works!",
            orders: result.rows
        }));

    } catch (error) {
        console.log("Error", error);
        res.writeHead(500, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({
            message: "This api sucks."
        }));
    };
}