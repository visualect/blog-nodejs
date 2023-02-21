const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-routes.js')
const postApiRoutes = require('./routes/api-post-routes.js');
const contactRoutes = require('./routes/contact-routes.js')
const getPath = require('./helpers/get-path.js')
require('dotenv').config();

const errMsg = chalk.bgKeyword('red').black;
const successMsg = chalk.bgKeyword('green').white;

const PORT = process.env.PORT;
const db = process.env.MONGO_URL;

mongoose.set('strictQuery', false)

mongoose
  .connect(db)
  .then(res => console.log(successMsg('Connected to DB')))
  .catch(err => console.log(errMsg(err)))

const app = express()
app.set('view engine', 'ejs');

app.listen(PORT, (err) => {
  err ? console.log(errMsg(err)) : console.log(successMsg(`listening on port http://localhost:${PORT}`));
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public/'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'About';
  const style = '/index.css'
  res.render(getPath('index'), { title, style })
})

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  const style = '/error.css';
  const title = 'Error';
  res
    .status(404)
    .render(getPath('error'), { style, title })
})