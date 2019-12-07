const axios = require('axios')
const archive, {getPage} = require('archive')

export default getPageImage = (vol, page) => {
  const archive = require('archive');
  const URI = archive[vol]['uri'];
  const index = getPage(page, archive[vol][start]);
  const url = `http://www.archive.org/download/${URI}/page/n${index}_large.jpg`;

  // e.g. http://www.archive.org/download/in.ernet.dli.2015.126325/page/n15_large.jpg

  axios(url)
    .then(res => res.blob())
    .then(img => img)
    .catch((error) => console.log(error.stack))
};