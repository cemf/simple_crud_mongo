const Person = require('../models/Person')

class PersonController {
  async getAllPessoas() {
    const allPeople = await Person.find()
    return allPeople
  }

  async criaPessoas(pessoa) {
    try{
      await Person.create(pessoa)
      console.log("criou")
     return 'sucess'
    }catch(e){
      console.log("erro ao criar pessoa",e)
    }
    
  }

  async updateQuote(update){
    await Person.updateOne(update)
  }

  async deletePersonByName(pessoa){
    await Person.deleteOne(pessoa)
  }

  async deleteAll(){
    await Person.deleteMany({})
  }
}

module.exports = new PersonController()