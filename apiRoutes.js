const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const personController = require('./Controllers/personController')
const Person = require('./models/Person')
const { json } = require('body-parser')

const url = 'mongodb://127.0.0.1:27017/aprendendo_mongo'
// const dbName = 'aprendendo_mongo'

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
  // console.log('oi');
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
  personController.criaPessoas(req.body).then((result) => {
    personController
      .getAllPessoas()
      .then((results) => {
        // console.log(results)
        // res.render('index.ejs', { quotes: results })
      })
      .catch((err) => {
        console.log('erro:', err)
      })
  })

  //   criaPessoas(req.body).then((result) => {
  //     getAllPeople().then((results) => {
  //
  //     })
  //   })
})

// app.delete('/quotes', (req, res) => {
//   deletePersonByName(req.body)
//     .then((result) => {
//       res.json(`Deleted Darth Vadar's quote`)
//     })
//     .catch((error) => console.error(error))

//   // console.log(cursor)
// })

app.delete('/quotesDelAll', (req, res) => {
  const del = async () => {
    return await Person.deleteMany({})
  }
  del()
    .then((resp) => {
      console.log(resp)
      if (resp) {
        res.json('tudo ok')
      } else {
        res.json('??')
      }
    })
    .catch((error) => console.error(error))
  // console.log(cursor)
})
