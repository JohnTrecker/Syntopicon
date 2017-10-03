// TODO: fix for 10, 13, 32, 42, 53, 55, 56, Aristotle, Aquinas, Shakespeare, Gibbon,

const fs = require('fs');
const WordExtractor = require("word-extractor");
// const sourcePath = '../data/text'
const sourcePath = '../data/input'
const outputPath = '../data/output'

fs.readdir(sourcePath, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach( file => {

    let vol = file.slice(0,-4)
    let path = `${sourcePath}/${file}`
    let newDir = `${outputPath}/${vol}`


    let extractor = new WordExtractor();
    let extracted = extractor.extract(path);

    if (fs.existsSync(newDir)) {
      console.log(`directory ${newDir} already exists!!`)
      return
    }

    fs.mkdirSync(newDir, err => {
      if (err) throw err
    })

    extracted.then(function(doc) {

      doc.getBody().split(/\u{0}\sp\s/).slice(1).forEach( page => {

        let [num, text] = page.split(/\s\u{0}\s/)
        let newFile = `${outputPath}/${vol}/${num}`
        if (fs.existsSync(newFile)) console.log(`${newFile} already exists!!`)

        fs.writeFileSync(newFile, text, 'utf8', (err) => {
          if (err) throw err
        })

      })

    });


  })
})
