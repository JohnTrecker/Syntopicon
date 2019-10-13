'use strict';

let fs = require('fs');

const utils = {

  getSummary: async (vol, alpha, omega, description) => {
    vol = parseInt(vol);
    alpha = parseInt(alpha);
    omega = parseInt(omega);
    let text
    await utils.retrieve(vol, alpha, omega, (json) => {
      text = json
    })
    let summary = utils.summarize(description, text)
    return summary.split('\n')[1]
  },

  summarize: (title, text) => {
    let result
    require('node-summary').summarize(title, text, (err, summary) => {
      if(err) {
        console.log("Something went wrong man!");
        throw err
      }
      result = summary
      // console.log("Original Length " + (title.length + content.length));
      // console.log("Summary Length " + summary.length);
      // console.log("Summary Ratio: " + (100 - (100 * (summary.length / (title.length + content.length)))));
    });
    return result;
  },

  addRefProp: (input, output, cb, pretty = true) => {

    fs.readFile(input, 'utf8', (err, json) => {
      if (err) throw err
        let obj = JSON.parse(json)
        let result = {}

        for ( let [topNum, value] of Object.entries(obj)) {
          result[topNum] = {}
          for (let [subNum, val] of Object.entries(value)) {

            // typeof refs = Array
            // typeof description = String
            let {refs, description} = val
            result[topNum][subNum] = cb(result, topNum, subNum, refs, description)

          }
        }

      let final = pretty === true ? JSON.stringify(result, null, 2) : JSON.stringify(result);
      fs.writeFile(output, final, 'utf8', (e) => {
        if (e) throw e
      })
    });

  },

  addDescription: () => {
    fs.readFile('../data/json/subtopics2.json', 'utf8', async (err, json) => {
      if (err) throw err
      let obj = JSON.parse(json)

      let result = obj.topics.reduce( (accum, topic) => {
        accum[topic.number] = {}
        topic.subtopics.forEach( (s) => {
          accum[topic.number][s.number] = s.subtopic
        })
        return accum
      }, {});

      fs.writeFile('../data/json/descriptions.json', JSON.stringify(result, null, 2), 'utf8', (err) => {
        if (err) throw err;
      });
    });
  },

  retrieve: async (vol, alpha, omega, cb = (x) => x) => {
    let array = [...Array(omega + 1).keys()].slice(alpha)

    const get = (vol, page) => {
      const path = `../data/output/${vol}/${page}`
      return new Promise( (resolve, reject) => {
        if ( page === '0' || page === undefined ) {
          console.log('vol and page returned: ', vol, page)
          reject('vol and page returned: ', vol, page)
        }

        fs.readFile(path, 'utf8', (err, text) => {
          if (err) {
            reject(err)
            throw err
          }
          resolve( text )
          return text
        });
      })
    };

    const getMany = async (volume, location) => {
      let t = await get(volume, location);
      return t;
    };

    // limiter
    if (array.length > 10) {
      let r = await get(vol, alpha)
      cb( JSON.stringify(r) )
      return
    }

    let result = ''
    for (const page of array){
      let text = await getMany(vol, page);
      result += text
    }
    cb( JSON.stringify(result) )
    return
  },

  get: (vol, page) => {
    const path = `../data/output/${vol}/${page}`
    return new Promise( (resolve, reject) => {
      fs.readFile(path, {encoding: 'utf8'}, (err, text) => {
        if (err) {
          reject(err)
          throw err
        }
        resolve( JSON.stringify(text) )
      });
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

  nest: (json) => {
    /**
     * folds flat subtopics.csv into a nested_subtopics.json
     */
    return json.topics.reduce((taxonomy, topic) => {
      const { topic: topicName, number: topicNum, subtopics } = topic

      const topicTaxonomy = []
      const alphaNumKey = {
        'a': 0,
        'b': 1,
        'c': 2,
        'd': 3,
        'e': 4,
        'f': 5,
        'g': 6,
        'h': 7,
        'i': 8,
      }

      for (let i = 0; i < subtopics.length; i++) {
        const { number, subtopic } = subtopics[i]
        let [ first, second, third ] = number.split('.')
        const subs = { ...subtopics[i], subtopics: [] }
        first = parseInt(first, 10) - 1

        if (third) {
          second = alphaNumKey[second]
          console.log(topicTaxonomy[first].subtopics)
          topicTaxonomy[first].subtopics[second].subtopics.push(subs)
        }
        else if (second) {
          topicTaxonomy[first].subtopics.push(subs)
        }
        else {
          topicTaxonomy.push(subs)
        }
      }

      taxonomy[topicNum] = { ...topic, subtopics: topicTaxonomy }
      return taxonomy
    }, {})
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
            s.number = utils.serialize(n);
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

  IOjson: (inputFile, outputFile, cb) => {
    fs.readFile(inputFile, 'utf8', (err, json) => {
      if (err) throw err
      let output = JSON.parse(json)
      let result = cb(output)

      fs.writeFile(outputFile, JSON.stringify(result, null, 2), 'utf8', (err) => {if (err) throw err;});
    });

  }
};

// func = (v, p) => utils.get(v,p)
module.exports = utils;