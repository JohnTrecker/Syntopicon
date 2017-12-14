'use strict';

const fs = require('fs');
const textract = require('textract');
const sourcePath = '../data/input2'
const outputPath = '../data/output2'
const errorPath = '../data/output/error_log.txt'

fs.writeFileSync(errorPath, 'ERROR LOG\n\n', 'utf8', (err) => {
  if (err) throw err
});

const writeError = (msg, err) => {
  fs.appendFileSync(errorPath, `${msg}: ${err}\n`, 'utf8', (error) => {
    if (error) throw error
  });
  throw err
} 

fs.readdir(sourcePath, (err, files) => {
  if (err) writeError('error reading sourcePath', err)

  files.forEach( file => {

    let vol = file.split('.docx')[0]
    let path = `${sourcePath}/${file}`
    let newDir = `${outputPath}/${vol}`
    
    if (fs.existsSync(newDir)) {
      writeError('directory already exists', `${newDir} already exists`)
      return
    }
    else {
      fs.mkdirSync(newDir, err => {if (err) writeError('error making new directory') });
    }

    const type = 'text/plain'
    const config = {
      'preserveLineBreaks': true,
      'exec': {'maxBuffer': 500000}
    }

    textract.fromFileWithMimeAndPath(type, path, config, function( error, text ) {
      if (error) writeError('Error using textract', error);
      text.split('__PAGE__NUMBER ').slice(1).forEach( page => {

        let num = page.split(/\s/, 1)[0];
        let text = page.slice(num.length + 1)
        let newFile = `${outputPath}/${vol}/${num}`

        if (fs.existsSync(newFile)) {
          fs.appendFileSync(newFile, text, 'utf8', (err) => {
            if (err) writeError('error appending to file ${newFile}', err)
          });          
        } 
        else {
          fs.writeFileSync(newFile, text, 'utf8', (err) => {
            if (err) writeError('error writing to new file ${newFile}', err)
          });
        }
      });
    });
  });
});
