import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'

import {Parser} from './class/Parser'

// const server: http.Server = http.createServer();

// server.on('request', (request: http.IncomingMessage, response: http.ServerResponse): void => {
//   response.end('hello');
// });

const filePath: string = path.join(__dirname, '../../wiki/testpage.md');

new Promise((resolve: (value: string) => void, reject: (error: NodeJS.ErrnoException) => void): void => {
  fs.readFile(filePath, (error: NodeJS.ErrnoException|null, buff: Buffer) => {
    if(error){
      reject(error);
      return;
    }
    resolve(buff.toString())
  })
})
.then((md: string): void => {
  const parser: Parser = new Parser();
  parser.sayHi()
})
.catch((error: NodeJS.ErrnoException): void => {
  console.log(error.message);
});
