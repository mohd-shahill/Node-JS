// // @noErrors
// import http from "http";
 
// const server = http.createServer((req, res) => {
//   // @log: Request received. Scheduling 2-second 'work'...
//   console.log("Request received. Scheduling 2-second 'work'...");
 
//   // This is NON-BLOCKING. It schedules the work and returns immediately.
//   setTimeout(() => {
//     // @log: Work finished. Sending response.
//     console.log("Work finished. Sending response.");
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<p>Hello from the non-blocking server!</p>");
//   }, 2000);
// });
 
// server.listen(5001, () => {
//   // @log: Server running on http://localhost:5001/
//   console.log("Server running on http://localhost:5001/");
// });

// import { Buffer } from 'node:buffer';

// // const buf = Buffer.from('hello world', 'utf8');

// // console.log(buf.toString('hex'));
// const buf1 = Buffer.from("Geeks");

// // Returns another buffer with
// // copy of the passed string
// const buf2 = Buffer.from("for");

// const buf3 = Buffer.from("Geeks");

// // Creates an array of buffers
// const list = [buf1, buf2, buf3];

// console.log(list);
// // Concatenates all buffer objects into one buffer
// const newbuff = Buffer.concat(list);

// console.log("The concatenated buffer:");

// // Displays the concatenated buffer
// console.log(newbuff);
// console.log(newbuff.toString()); // GeeksforGeeks

// function printBufferDetails(buf) {
//   buf.forEach(byte => {
//     console.log(`hex: ${byte.toString(16)} dec: ${byte} char: ${String.fromCharCode(byte)}`);
//   });
// }

// printBufferDetails(newbuff);

import http from 'http';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];
    
    req.on('data', chunk => chunks.push(chunk));
    
    req.on('end', () => {
      // Full request body as Buffer
      const bodyBuffer = Buffer.concat(chunks);

      // Convert to string for headers inspection
      // Warning: binary files may be messy in console
      const bodyString = bodyBuffer.toString('binary');

      console.log('RAW MULTIPART BODY');
      console.log(bodyString);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Received');
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Send a POST request');
  }
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
