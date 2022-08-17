import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';

import { Converter } from './class/Converter';

const server: http.Server = http.createServer();

function _getFileName(path: string): string {
  return `${path.split('/')[1] || 'main'}.md`;
}

server.on('request', (request: http.IncomingMessage, response: http.ServerResponse): void => {
  try {
    if (request.method !== 'GET') {
      response.statusCode = 404;
      response.end('not found');
      return;
    }
  
    if (!request?.url) {
      return;
    }
  
    const url = new URL(request.url, 'http://localhost:3500');
    response.end(_getFileName(url.pathname));
    
  } catch(error: unknown){
    if(error instanceof Error){
      console.log(error.message)
    }
  }
});

server.listen(3500, (): void => {
  console.log('server run at 3500 port');
});

// const converter: Converter = new Converter();
// const filePath: string = path.join(__dirname, '../../wiki/testpage.md');

// new Promise((resolve: (value: string) => void, reject: (error: NodeJS.ErrnoException) => void): void => {
//   fs.readFile(filePath, (error: NodeJS.ErrnoException | null, buff: Buffer) => {
//     if (error) {
//       reject(error);
//       return;
//     }
//     resolve(buff.toString())
//   })
// })
//   .then((markdown: string): string => {
//     return converter.markdownToHTML(markdown)
//   })
//   .catch((error: NodeJS.ErrnoException): void => {
//     console.log(error.message);
//   });
