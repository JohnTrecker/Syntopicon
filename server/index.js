let fs = require('fs')
let utils = require('../utility/utils.js')
let express = require('express')
let app = express()

let topics = []
let subtopics = {}

fs.readFile('../data/subtopics.json', {encoding: 'utf8'}, (err, data) => {
  if (err) throw err
  let d = JSON.parse(data)
  topics = d.topics
});

fs.readFile('../data/refs.json', {encoding: 'utf8'}, (err, data) => {
    if (err) throw err
    subtopics = JSON.parse(data)
});

app.get('/', (req, res) => {
  let buffer = ''
  topics.forEach( topic => {
    buffer += `<a href="/${topic.number}">${topic.topic}</a><br>`
  });
  res.send(buffer);
});

app.get('/:topic', (req, res) => {
  let topic = req.params.topic
  let buffer = ''
  topics[topic - 1].subtopics.forEach( subtopic => {
    buffer += `<a href="${topic}/${subtopic.number}">${subtopic.subtopic}</a><br>`
  });
  res.send(buffer)
});

app.get('/:topic/:subtopic', (req, res) => {
  let {topic, subtopic} = req.params
  let buffer = ''
  let refs = subtopics[topic][subtopic]

  refs.forEach( ref => {
    let [author, vol, alpha, omega, passage, notes] = ref
    if (omega === '') omega = alpha
    buffer += `<a href="/api/${vol}/${alpha}/${omega}">${author}</a><br>`
  });
  res.send(buffer)
});

app.get('/api/:vol/:alpha/:omega', (req, res) => {
  let {vol, alpha, omega} = req.params
  buffer = `${vol}, ${alpha}, ${omega},`
  console.log('getting ', vol, alpha)
  utils.get(vol, alpha, omega, function(text){
    try {
      let prev = `<a href="/api/${vol}/${Number(alpha)-1}/${omega}">Page ${Number(alpha)-1}</a>&emsp;&emsp;`
      let next = `<a href="/api/${vol}/${Number(alpha)+1}/${omega}">Page ${Number(alpha)+1}</a>`
      res.send( prev.concat(next, '<br><br><br>', JSON.parse(text)) );
    } catch(err) {
      console.log('error fetching reference: ', err)
      throw err
    }

  });
});

app.listen(3000, () => {
  console.log(`server listening on localhost:3000`);
});
