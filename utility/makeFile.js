let fs = require('fs');
let topics = require('../data/topics');
let refs = require('../data/refs.txt')

/*
Data Structure
- 1.
  - 1a.
  - 1b.
    - 1b(1)
    - 1b(2)
      - Old Testament: Genesis, 3 / 1 Samuel, 16:14-23 / 1 Kings, 22:20-23
      - Apocrypha: Judith, 7:8-31 / I Maccabees / II Maccabees
      - New Testament: Matthew, 20:29-34 / Mark, 1:29-34, 40-44; 2:3-12; 4:34-41 / Luke, 1:5-66; 4:31-5:26
      - 18 Aquinas, 7-9, 114-115, 169, 196, 235-239, 282
      - 19 Dante, 369-370, 372, 384-390 passim, 403-404
      ...
- 2.
...
- 8.
- 1.
*/

// for each line of refs
  // if the line begins with a number(1 or 2), and THEN a period, its a child topic
  // if the line begins with a number(1 or 2), a letter (1) and THEN a period, its a grandchild topic
  // if the line begins with a number(1 or 2), a letter (1) and THEN (number), its a great-grandchild topic
  // else its a reference



fs.writeFile('../data/refs.json', JSON.stringify(result, null, 2), function(err){
  if (err) throw err;
  console.log("new file generated");
