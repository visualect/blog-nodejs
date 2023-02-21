const path = require('path');

const getPath = (page) => path.resolve(__dirname, '../views', `${page}.ejs`);

module.exports = getPath;