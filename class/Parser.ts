// import {readFile} from 'fs'
// import {join} from 'path'

import fs from 'fs'
import path from 'path'

const filePath: string = path.join(__dirname, '../../../../wiki/main.md');
const reader: void = fs.readFile(filePath, (error: NodeJS.ErrnoException|null, data: Buffer) => {
  if(error){
    console.log(error.message);
    return;
  }
  console.log(data.toString())
});
// reader.on('close', () => {

// })
console.log(reader)
