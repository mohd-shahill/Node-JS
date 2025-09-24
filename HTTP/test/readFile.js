import http from "http";
import fs from 'node:fs';

const PORT = 5000;

const server =  http.createServer((request, response) => {

    if (request.url == "/api/create/order" && request.method == "POST"){
        createOrder(request, response);
    } else {
        response.writeHead(404);
        response.end("Wrong URL? or Not Found");
    }
});

fs.readFile('C:/Users/amita/Desktop/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});


server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is connected to port - ${PORT}`);
});