let fs = require('fs')
let {retrieve} = require('../utility/utils.js')
let express = require('express')
let app = express()

let topics = []
let subtopics = {}

fs.readFile('../data/json/subtopics2.json', {encoding: 'utf8'}, (err, data) => {
  if (err) throw err
  let d = JSON.parse(data)
  topics = d.topics
});

fs.readFile('../data/json/refs2.json', {encoding: 'utf8'}, (err, data) => {
    if (err) throw err
    subtopics = JSON.parse(data)
});

app.get('/', (req, res) => {
  let buffer = ''
  topics.forEach( topic => {
    buffer += `&emsp;${topic.number}.&emsp;<a href="/${topic.number}">${topic.topic}</a><br>`
  });
  res.send(buffer);
});

app.get('/:topic', (req, res) => {
  let topic = req.params.topic
  let buffer = ''
  topics[topic - 1].subtopics.forEach( subtopic => {
    let spaces = subtopic.number.split('.').length - 1
    let indent = ''.concat('&emsp;&emsp;'.repeat(spaces))
    let link = subtopics[topic][subtopic.number] ? `href="${topic}/${subtopic.number}"` : ''
    buffer += `&emsp;${indent}<a ${link} >${subtopic.subtopic}</a><br>`
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
  vol = parseInt(vol);
  alpha = parseInt(alpha);
  omega = parseInt(omega);

  retrieve(vol, alpha, omega, text => {
    text = JSON.parse(text)
    let prev = `<a href="/api/${vol}/${Number(alpha)-1}/${omega}">Page ${Number(alpha)-1}</a>&emsp;&emsp;`
    let next = `<a href="/api/${vol}/${Number(alpha)+1}/${omega}">Page ${Number(alpha)+1}</a>`
    res.send( prev.concat(next, '<br><br><br>', text));
  });
});

app.listen(3000, () => {
  console.log(`server listening on localhost:3000`);
});
