// const server = require('http').createServer();

// server.on('request', (request, response) => {
//   response.end('ok');
// });


const fs = require('fs');
const path = require('path');



const reader = fs.readFile(path.join(__dirname, './text.txt'), (err, data) => {
  console.log(data.toString())
});
// reader.on('data', (chunk) => {
//   // console.log(chunk.toString('utf-8'))
// })

// reader.on('end', () => {
//   console.log('-------------')
// })



// const emit = reader.emit;
// reader.emit = function(event){
//   console.log(event) //вывод в консоль названия события
//   emit.apply(this, arguments)
// }

// reader.on('data', () => {
//   console.log('close')
// })
// console.log(reader)