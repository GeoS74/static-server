import {
  createServer, IncomingMessage, Server, ServerResponse,
} from 'http';

const server: Server = createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse): void => {
  response.end('hello');
});

// const regexp: RegExp = getRegexp(new RegExp('foo'))

// function getRegexp(template: RegExp): RegExp{
//   return new RegExp(template)
// }

// const foo: boolean = regexp.test('foo bar')
// console.log(foo)
