const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require("../models/blog")

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
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

test('One more blog was added to the database ', async () => {
    const newblogs = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    }

    await api
        .post("/api/blogs")
        .send(newblogs)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogss = await Blog.find({})
    blogs2 = blogss.map(blogi => blogi.toJSON())
    //console.log(blogs2)

    expect(blogs2.length).toBe(blogs.length+1)
})

test('if likes is empty the number will be 0', async () => {
    testblog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    } 
    const response = await api
    .post("/api/blogs")
    .send(testblog)
    console.log(response.body)

    expect(response.body.likes).toBe(0)
})

test('if status is 400', async () => {
    testblog = {
        author: "Type wars",
    } 
    const response = await api
    .post("/api/blogs")
    .send(testblog)
    

    expect(response.status).toBe(400)
})

/*
test('Does not have field title or url', async () => {
    testblog3 = {
        _id: "5a422bc61b54a676234d17fc",
        author: "Robert C. Martin",
        likes: null,
        __v: 0
    } 

    await api
        .post("/ai/blogs")
        .send(testblog3)
        .expect(400)
    
})
*/

afterAll(() => {
  mongoose.connection.close()
})