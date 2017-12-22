'use strict';

let {retrieve} = require('./utils')

retrieve(3,100,103, text => {
  console.log(text)
})