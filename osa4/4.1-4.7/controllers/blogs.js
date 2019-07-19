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
  
    try {
      if(!request.body.hasOwnProperty('url') && !request.body.hasOwnProperty('title')){
        response.status(400)
      }else{

      

      if(!request.body.hasOwnProperty('likes')){
        console.log(request.body)

        let a = request.body
        let uusi = {
          title: a.title,
          author: a.author,
          url: a.url,
          likes: 0
        }
        console.log(uusi)
        
        const newBlog = new Blog(uusi)
        newBlog.save()
        response.json(uusi)
        }else{
            console.log("täällä jossa on likes")
            const blog = new Blog(request.body)
            const savedblog = await blog.save()
            response.json(savedblog.toJSON())
        }
    }
    } catch (error) {
      next(error)
    }
  
})

module.exports = blogsRouter