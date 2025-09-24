// @noErrors
import http from "http";
 
const server = http.createServer((req, res) => {
  // @log: Request received. Scheduling 2-second 'work'...
  console.log("Request received. Scheduling 2-second 'work'...");
 
  // This is NON-BLOCKING. It schedules the work and returns immediately.
  setTimeout(() => {
    // @log: Work finished. Sending response.
    console.log("Work finished. Sending response.");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<p>Hello from the non-blocking server!</p>");
  }, 2000);
});
 
server.listen(5001, () => {
  // @log: Server running on http://localhost:5001/
  console.log("Server running on http://localhost:5001/");
});