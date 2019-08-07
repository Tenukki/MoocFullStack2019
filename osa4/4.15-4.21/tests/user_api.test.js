const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require("../models/user")

const user = [
    {
      username: "Santeri98",
      name: "Santeri",
      passowrd: "12345"
    },
    {
        username: "Sirpa61",
        name: "Sirpa",
        passowrd: "abcde",
    } 
  ]

beforeEach(async () => {

    await User.deleteMany({})
  
    let blogObject = new User(user[0])
    await blogObject.save()
  
    let blogObject2 = new User(user[1])
    await blogObject2.save()

})

describe("check if user is in databse", () => {
    
    test('there are 2 blogs', async () => {
        const response = await api.get('/api/users')
        //console.log(response.body.length)
        expect(response.body.length).toBe(user.length)
    })


    test('check if /get worked', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('User will not be added if there is under 3 charters', async () => {
        newuser = {
            username: "ab",
            name: "heikki",
            passowrd: "heikki23"
          }

        await api
            .post("/api/users")
            .send(newuser)
            .expect(400)
        
        const kayttajat = await api
          .get("/api/users")

        expect(kayttajat.body.length).toBe(2)
    })
})