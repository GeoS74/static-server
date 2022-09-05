import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';

import { execFile, ExecFileException } from 'node:child_process';
import { config } from './config';
import { Converter } from './class/Converter';

const server: http.Server = http.createServer();
const converter: Converter = new Converter();

switch(process.platform){
  case 'win32': sync('../util/sync.bat'); break;
  case 'linux': sync('../util/sync'); break;
  default: 
    console.log(`platform ${process.platform} not supported`);
    process.exit();
}

function sync(pathScript: string): void {
  execFile(
    path.join(__dirname, pathScript),
    [config.repository.url, path.join(__dirname, '../', config.repository.path)],
    (error: ExecFileException | null, stdout: string, stderr: string): string | void => {
      if (error) {
        console.log(`error sync: ${error.message}`);
      }
      setTimeout((): void => sync(pathScript), config.repository.syncDelay);
    });
}

server.on('request', async (request: http.IncomingMessage, response: http.ServerResponse): Promise<void> => {
  try {
    if (request.method !== 'GET') {
      response.statusCode = 404;
      response.end('not found');
      return;
    }

    if (request?.url) {
      const fname: string = _getFileName(request.url);
      const html: string | void = await _readFile(fname);

      response.setHeader('content-type', 'text/html; charset=utf-8');
      response.end(html);
    }
  } catch (error) {
    response.setHeader('content-type', 'application/json');

    if (_isNodeError(error) && error.code === 'ENOENT') {
      response.statusCode = 404;
      response.end(_errorToJSON('file not found'));
      return;
    }

    if (error instanceof Error) {
      console.log(error.message);
    }
    response.statusCode = 500;
    response.end(_errorToJSON('internal server error'));
  }
});

server.listen(config.server.port, (): void => console.log(`server run at ${config.server.port} port`));

function _readFile(fname: string): Promise<string | void> {
  return new Promise((
    resolve: (value: string) => void,
    reject: (error: NodeJS.ErrnoException) => void,
  ): void => {
    fs.readFile(_getFilePath(fname), (error: NodeJS.ErrnoException | null, buff: Buffer): void => {
      if (error) {
        reject(error);
        return;
      }
      resolve(buff.toString());
    });
  })
    .then((markdown: string): string => converter.markdownToHTML(markdown))
    .catch((error: NodeJS.ErrnoException): void => {
      throw error;
    });
}

function _getFilePath(fname: string): string {
  return path.join(__dirname, `../${config.repository.path}/${fname}`);
}

function _getFileName(path: string): string {
  return `${decodeURI(path).split('/')[1] || 'main'}.md`;
}

function _isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error;
}

function _errorToJSON(message: string): string {
  return JSON.stringify({
    error: message,
  });
}
