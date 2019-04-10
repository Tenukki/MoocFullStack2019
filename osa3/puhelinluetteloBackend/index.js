const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

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
    res.json(persons)
  })

  app.get('/api/info', (req, res) => {
    res.send(
        `<p>Puhelinluettelossa ${persons.length} henkilön tiedot<p/>`+
        `<p>${new Date()}<p/>`
        
        
    )
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(persons => {
      return persons.id == id
    })
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    person = persons.filter(person => person.id !== id);
    response.status(204).end();
  });

  const generateId = () => {
    return Math.random() * 100000000000
  }

  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'nimi tai numero puuttuu' 
      })
    }

    totuus = persons.find(asia => asia.name === body.name)

    if(totuus){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
  
    const perss = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    person = persons.concat(perss)
    response.json(person)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })