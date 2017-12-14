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
};

// fs.readFile('../data/subtopics2.json', 'utf8', (err, json) => {
//   if (err) throw err
//   let output = JSON.parse(json)
//   let result = nest(output)

//   fs.writeFile('../data/test.json', JSON.stringify(result, null, 2), 'utf8', (err) => {if (err) throw err;});
// });