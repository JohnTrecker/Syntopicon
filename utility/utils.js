'use strict';

let fs = require('fs');

module.exports = {

  get: (vol, page) => {
    const path = `${output}/${vol}/${page}`
    fs.readFile(path, 'utf8', (err, text) => {
      if (err) throw err
      if (text) return text
      console.log(`text from ${path} retrieved:\n${text.slice(0, 50)}\n`)
    })
  },

  addProp: (obj) => {
    let subs = obj.subtopics.map( topic => {
      topic.subtopics.map( subtopic => {
        subtopic['subtopics'] = []
        return subtopic
      })
      return topic
    })

    return {'subtopics': subs}
  },

  nest: (obj) => {
    let temp = {}
    let subs = obj.subtopics.map( topic => {
      temp[topic.topic] = {}
      topic.subtopics.map( (subtopic, i, collection) => {
        let [first, second, third] = subtopic.number.split('.')  
        if (second) {
          if (!temp[topic.topic][first]) temp[topic.topic][first] = []
          temp[first].push(subtopic)
          collection[i] = null
        }
        return subtopic
      })

      for (let [key, value] of Object.entries(temp)) {
        console.log(topic.subtopics[key-1])
      }
      return topic
    });

    return {'subtopics': subs}
  }, 


  setDepthValue: (num, depth) => {
    return num.split('.', depth).join(".")
  },

  serialize: (str) => {
      const replacer = (match, s1, s2, s3, offset, string) => [s1, s2, s3].filter(val => val !== '').join('.')
      const regex = /(^[\d]+)([\D?]?)\(?([\d]?)\)?/;
      return str.replace(regex, replacer)
  },

  serializeData :(obj) => {
    let iterator = obj.topics.entries();
    for (let [index, topic] of iterator) {
        let serialized = topic['subtopics'].map((s, i) => {
            let n = s.number;
            s.number = serialize(n);
            return s;
        })
        obj.topics[index].subtopics = serialized;
    }
    return obj
  },

  numerize: (obj) => {
    let arr = obj.subtopics.map( (topic, index) => {
      topic.number = topic.number.toString()
      return topic
    });

    return {'subtopics': arr}
  },

  createPages: () => {
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

  },

  IOjson: (input, output, cb) => {
    fs.readFile(input, 'utf8', (err, json) => {
      if (err) throw err
      let output = JSON.parse(json)
      let result = cb(output)

      fs.writeFile(output, JSON.stringify(result, null, 2), 'utf8', (err) => {if (err) throw err;});
    });
    
  }
};
