const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const personController = require('./Controllers/personController')
const Person = require('./models/Person')
//const { json } = require('body-parser')

const url = 'mongodb://127.0.0.1:27017/aprendendo_mongo'

mongoose.connect(url, { useNewUrlParser: true })
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.listen(3000, function () {
  console.log('listening on 3000')
})

const db = mongoose.connection

db.once('open', (_) => {
  console.log('Database connected:', url)
})

db.on('error', (err) => {
  console.error('connection error:', err)
})

app.get('/', (req, res) => {
  personController
    .getAllPessoas()
    .then((result) => {
      res.render('index.ejs', { quotes: result })
    })
    .catch((err) => {
      console.log('erro:', err)
    })
})

//rota postPeople
app.post('/quotes', (req, res) => {
  const create = async () =>
  {
    return await personController.criaPessoas(req.body)
  }
  create().then((resp)=>{
    res.redirect('/');
  }).catch((error) => console.error(error))
})

app.delete('/quotesDelAll', (req, res) => {
  const del = async () => {
    return await personController.deleteAll()
  }
  del()
    .then((resp) => {
      if (resp) {
        res.json('tudo ok')
      } else {
        res.json('Erro ao deletar tudo')
      }
    })
    .catch((error) => console.error(error))
})
