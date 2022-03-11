import express from 'express'
import { engine } from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// configure Handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.set('views', './views');

// static files
app.use(express.static(__dirname + '/public'))

/* Route handlers */

// home page
app.get('/', (req, res) => res.render('home'))

// about page
app.get('/about', (req, res) => res.render('about'))

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
