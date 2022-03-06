//server
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'aprendendo_mongo'


app.use(express.static('public'))
// MongoClient.connect(url, {
//     useUnifiedTopology: true
//   }, (err, client) => {
//     if (err) return console.log(err)

//     // Storing a reference to the database so you can use it later
//     db = client.db(dbName)
//     console.log(`Connected MongoDB: ${url}`)
//     console.log(`Database: ${dbName}`)
//   })

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db(dbName)
    console.log('Connected to Database')
    const quotesCollection = db.collection('quotes')

    const updatePosts = (res)=>{
      db.collection('quotes').find().toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs', {quotes:results})
      }).catch(err=>{
        console.log(err)
      })
    }

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
      .then((result) => {
        console.log(result)
      }).then(()=>{
        updatePosts(res)
      })
    })

    

    app.put('/quotes',(req,res)=>{
      quotesCollection.findOneAndUpdate(
        {name:"Yoda"},
        {
        $set: {
          name: req.body.name,
          quote:req.body.quote
        },
      },
        // options , can be {upsert : true } to create the thing, if the thing does not exist
      )
      .then(result=>{
        res.json('Sucess')
      })
      .catch(error => console.error(error))
        console.log(req.body)
    })
    
    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          res.json(`Deleted Darth Vadar's quote`)
        })
        .catch(error => console.error(error))
      
      // console.log(cursor)
    })




    app.get('/',(req,res)=>{
      
      // const cursor = 
      db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', {quotes:results})
      }).catch(err=>{
        console.log(err)
      })
      
      // console.log(cursor)
    })

    //     app.use(/* ... */)
    //     app.get(/* ... */)
    //     app.post(/* ... */)
    
    app.listen(3000, function () {
      console.log('listening on 3000')
    })
  })
  .catch((error) => console.error(error))


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   // Note: __dirname is the current directory you're in. Try logging it and see what you get!
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })
