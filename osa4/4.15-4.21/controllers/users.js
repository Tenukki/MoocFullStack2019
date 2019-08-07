const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{url: 1,title: 1,author: 1,_id:1})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if(body.username.length < 3 || body.username === null){
        response.status(400).json({erorr:"The username was too short minimum is 3 charters"}).end()
    }else{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter