const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
/*
blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
*/
/*
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  try {
    const savedblog = await blog.save()
    response.json(savedblog.toJSON())
  } catch (error) {
    next(error)
  }
  
})

module.exports = blogsRouter