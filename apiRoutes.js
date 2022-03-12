const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const personController = require('./Controllers/personController')
const Person = require('./models/Person')


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
  getAllPeople()
    .then((results) => {
      // console.log(results)
      res.render('index.ejs', { quotes: results })
    })
    .catch((err) => {
      console.log('erro:', err)
    })
})

//rota postPeople
app.post('/quotes', (req, res) => {

    personController.criaPessoas(req.body).then((result) => {
        getAllPeople()
            .then((results) => {
            // console.log(results)
            res.render('index.ejs', { quotes: results })
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
  delAll()
    .then((res) => {
        console.log(res)
      res.json(`Deleted all`)
    })
    .catch((error) => console.error(error))
  // console.log(cursor)
})

const delAll = async() => {
    await Person.deleteMany({})
}

const getAllPeople = async () => {
    const pessoas = await Person.find()
    return pessoas
  }