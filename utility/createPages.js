const fs = require('fs');
const WordExtractor = require("word-extractor");
const sourcePath = '../test'
const outputPath = '../output'

fs.readdir(sourcePath, (err, files) => {
  if (err) {
    throw err;
  }

  // 160, 32, 112, 32, 105, 105, 105, 160, 32,

  let regex = /\u{0}\sp\s/
  files.forEach( (file, vol) => {
    let path = `${sourcePath}/${file}`
    let extractor = new WordExtractor();
    let extracted = extractor.extract(path);
    extracted.then(function(doc) {

      doc.getBody().split(regex).slice(1).forEach( page => {

        let [num, text] = page.split(/\s\u{0}\s/)
        console.log(num.length, '\n\n\n', text, '\n\n\n')
      })

    });


  })
})


//     fs.readFile(path, (error, data) => {
//       if (error) throw error

//       data = data.toString()
//       console.log('data:', data)
//       const regex = /p\s(\w+)\s\s/
//       let text = data.split(regex)
//       console.log('text:', text)

//       let currentPage = '';
//       let currentString = '';

//       text.forEach( str => {
//         if (str.length < 8) {
//           console.log(str)
//         //   currentPage = str
//         //   let currentFile = `${outputPath}/${vol}.${currentPage}.txt`

//         //   fs.writeFile(currentFile, currentString, 'utf8', (err) => {
//         //     if (err) throw err;
//         //     console.log(`${currentFile} saved!`)
//         //   })
//         //   currentString = ''
//         // } else {
//         //   currentString = currentString.concat(str)
//         }

//       })


//     })
//   })
// })