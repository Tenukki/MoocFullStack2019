require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())


let persons =  [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms ' + JSON.stringify(persons)))
  app.get('/', (req, res) => {
    res.send('')
  })
  
  //toimii
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(henkilo => {
      persons = henkilo;
      res.json(henkilo.map(person => person.toJSON()))
    })
  })

  //toimii
  app.get('/api/info', (req, res) => {
    Person.find({}).then(henkilo => {
      console.log(henkilo.length)
      res.send(
        `<p>Puhelinluettelossa ${henkilo.length} henkilön tiedot<p/>`+
        `<p>${new Date()}<p/>`
      )
    })
  })

  //toimii
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(henkilo => {
      response.json(henkilo.toJSON())
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  });

  const generateId = () => {
    return Math.random() * 100000000000
  }

  //toimii
  app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (body.name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
  })

  //
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
    console.log(person)
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatePerson => {
        console.log("mitä plauttaa")
        console.log(updatePerson.toJSON())
        response.json(updatePerson.toJSON())
      })
      .catch(error => next(error))
  })
  

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })