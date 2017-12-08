'use strict';
// TODO: fix for 10, 13, 32, 42, 53, 55, 56, Aristotle, Aquinas, Shakespeare, Gibbon,
  // replace `p. xxx` with `__PAGE__NUMBER xxx` ...  ` V [1-2], p [!p]{1,15}p`
  // print errors to log file

// TODO: Fix 8, 15, 26

const fs = require('fs');
// const WordExtractor = require("word-extractor");
const textract = require('textract');
const sourcePath = '../data/input'
const outputPath = '../data/output'
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

    const type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
          // open newFile and append to it.
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
