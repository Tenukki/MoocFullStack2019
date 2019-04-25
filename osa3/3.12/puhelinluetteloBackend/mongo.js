const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nimi = process.argv[3]
const puh = process.argv[4]
//console.log(process.argv.length)
const url =`mongodb+srv://santeri:${password}@tietokanta-fcyxi.mongodb.net/Person?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  nimip: String,
  puhp: String
  
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  nimip: nimi,
  puhp: puh
})

if(process.argv.length == 5){
    person.save().then(response => {
    console.log("lisätään" + response.nimip +" numero " + response.puhp +" luetteloon");
    mongoose.connection.close();
    })
}else{
    Person.find({}).then(result => {
        console.log("puhelinluettelo:")
        result.forEach(henkilo => {
            console.log(henkilo.nimip + " "+ henkilo.puhp)
        })
        mongoose.connection.close()
    })
}




