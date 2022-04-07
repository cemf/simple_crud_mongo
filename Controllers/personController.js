const Person = require('../models/Person')

class PersonController {
  async getAllPessoas() {
    const allPeople = await Person.find()
    return allPeople
  }

  async criaPessoas(pessoa) {
    await Person.create(pessoa)
    //   ,err=>{
    //   if (err)
    //     return res.status(400).json({
    //       error: true,
    //       message: "Erro ao tentar inserir usuário no MongoDB",
    //     });

    //   return res.status(200).json({
    //     error: false,
    //     message: "Usuário com frase cadastrado com sucesso ",
    //   });
    // })
  }
}

module.exports = new PersonController()

// const updatePerson = async ()=>{

// }

const deletePersonByName = async (person) => {
  const pessoa = await Person.findOne({ name: person.name })
  const deletando = await pessoa.remove()
}

//rota getAllpeople

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
