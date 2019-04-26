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
  
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(henkilo => {
      res.json(henkilo.map(person => person.toJSON()))
    })
  })

  app.get('/api/info', (req, res) => {
    Person.find({}).then(henkilo => {
      console.log(henkilo.length)
      res.send(
        `<p>Puhelinluettelossa ${henkilo.length} henkilön tiedot<p/>`+
        `<p>${new Date()}<p/>`
      )
    })
  })

  
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(henkilo => {
      response.json(henkilo.toJSON())
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
  });

  const generateId = () => {
    return Math.random() * 100000000000
  }

  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log("objection nimi " + body.name)
    console.log("obkection puh " + body.number)
    
    
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'nimi tai numero puuttuu' 
      })
    }
    console.log("nyt ollaan täällä")

    let totuus = persons.find(henkilo => henkilo.name == body.name)

    console.log("löytyykö nimi tietokannasta " + totuus)
    if(totuus){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
    
    const perss = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    
    persons.push(perss)
    response.json(persons)
  })
  

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })