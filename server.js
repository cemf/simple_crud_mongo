//server
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
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

const criaPessoas = async (pessoa) => {
  const newPeople = new Person({
    name: pessoa.name,
    quote: pessoa.quote,
  })
  const doc = await newPeople.save()
  console.log('await', doc)
}

const getAllPeople = async () => {
  const pessoas = await Person.find()
  return pessoas
}

// const updatePerson = async ()=>{

// }

const deletePersonByName = async (person) => {
  const pessoa = await Person.findOne({ name: person.name })
  const deletando = await pessoa.remove()
}

const delAll = async()=>{
  await Person.deleteMany({})
}

//rota getAllpeople
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
  criaPessoas(req.body).then((result) => {
    getAllPeople().then((results) => {
      res.render('index.ejs', { quotes: results })
    })
  })
})

app.delete('/quotes', (req, res) => {
  
  deletePersonByName(req.body)
    .then((result) => {
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch((error) => console.error(error))

  // console.log(cursor)
})

app.delete('/quotesDelAll', (req, res) => {
  delAll()
  .then(res=>{
    res.json(`Deleted all`)
  })
  .catch((error) => console.error(error))
  // console.log(cursor)
})

//

//   // console.log(cursor)
// })

// MongoClient.connect(url, { useUnifiedTopology: true })
//   .then((client) => {
//     const db = client.db(dbName)
//     console.log('Connected to Database')
//     const quotesCollection = db.collection('quotes')

//     const updatePosts = (res)=>{
//       db.collection('quotes').find().toArray()
//       .then(results => {
//         console.log(results)
//         res.render('index.ejs', {quotes:results})
//       }).catch(err=>{
//         console.log(err)
//       })
//     }

//     app.post('/quotes', (req, res) => {
//       const doc = await req.body.save()
//       // quotesCollection.insertOne(req.body)
//       .then((result) => {
//         console.log(result)
//       }).then(()=>{
//         updatePosts(res)
//       })
//     })

//     app.put('/quotes',(req,res)=>{
//       quotesCollection.findOneAndUpdate(
//         {name:"Yoda"},
//         {
//         $set: {
//           name: req.body.name,
//           quote:req.body.quote
//         },
//       },
//         // options , can be {upsert : true } to create the thing, if the thing does not exist
//       )
//       .then(result=>{
//         res.json('Sucess')
//       })
//       .catch(error => console.error(error))
//         console.log(req.body)
//     })

//     app.delete('/quotes', (req, res) => {
//       quotesCollection.deleteOne(
//         { name: req.body.name }
//       )
//         .then(result => {
//           if (result.deletedCount === 0){
//             return res.json("No quotes to delete")
//           }
//           res.json(`Deleted Darth Vadar's quote`)
//         })
//         .catch(error => console.error(error))

//       // console.log(cursor)
//     })

//     app.get('/',(req,res)=>{

//       // const cursor =
//       db.collection('quotes').find().toArray()
//       .then(results => {
//         res.render('index.ejs', {quotes:results})
//       }).catch(err=>{
//         console.log(err)
//       })

//       // console.log(cursor)
//     })

//     //     app.use(/* ... */)
//     //     app.get(/* ... */)
//     //     app.post(/* ... */)

//     app.listen(3000, function () {
//       console.log('listening on 3000')
//     })
//   })
//   .catch((error) => console.error(error))