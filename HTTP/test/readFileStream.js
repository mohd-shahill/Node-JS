import fs from 'fs';
import http from 'http';
import { pipeline } from 'node:stream/promises';
import path from 'path';

const PORT = 5001;

const server =  http.createServer((request, response) => {

    if (request.url == "/api/create/order" && request.method == "POST"){
        createOrder(request, response);
    } else {
        response.writeHead(404);
        response.end("Wrong URL? or Not Found");
    }
});

const fileUrl = 'https://example-files.online-convert.com/document/txt/example.txt';
const outputFilePath = path.join(process.cwd(), 'moby.md');

async function downloadFile(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
  }

  const fileStream = fs.createWriteStream(outputPath);
  console.log(`Downloading file from ${url} to ${outputPath}`);

  await pipeline(response.body, fileStream);
  console.log('File downloaded successfully');
}

async function readFile(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  try {
    for await (const chunk of readStream) {
      console.log('--- File chunk start ---');
      console.log(chunk);
      console.log('--- File chunk end ---');
    }
    console.log('Finished reading the file.');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

try {
  await downloadFile(fileUrl, outputFilePath);
  await readFile(outputFilePath);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is connected to port - ${PORT}`);
});