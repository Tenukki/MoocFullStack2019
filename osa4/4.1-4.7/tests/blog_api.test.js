const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require("../models/blog")

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    } 
  ]

beforeEach(async () => {

    await Blog.deleteMany({})
  
    let blogObject = new Blog(blogs[0])
    await blogObject.save()
  
    let blogObject2 = new Blog(blogs[1])
    await blogObject2.save()

})

describe("Therea are 2 notes and they rae json", () => {
    test('there are 2 blogs', async () => {
        const response = await api.get('/api/blogs')
        //console.log(response.body.length)
        expect(response.body.length).toBe(blogs.length)
    })


    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('has a proeprty named "id" ', async () => {
        const blogs = await api.get("/api/blogs")
        blogs.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})


afterAll(() => {
  mongoose.connection.close()
})