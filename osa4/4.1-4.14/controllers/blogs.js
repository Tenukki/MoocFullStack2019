const blogsRouter = require('express').Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.delete('/:id', async (request, response,next) => {
    const r = await Blog.findById(request.params.id)
    console.log(r)
    if(!r){
      response.status(404).json({error: "id couldn't be found"}).end()
    }else{
      try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
      } catch (error) {
        next(error)
      }
    }
});

blogsRouter.put('/:id', async (req,res,next) => {
    const body = req.body
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    try {
      await Blog.findByIdAndUpdate(req.params.id,newBlog,{new: true})
      res.status(200).json(newBlog).end()
    } catch (error) {
      res.status(400).json({error: "id could not found"})
      next(error)
    }
    
})

blogsRouter.post('/', async (request, response) => {
  
    try {
      if(!request.body.hasOwnProperty('url') && !request.body.hasOwnProperty('title')){
          response.status(400).end()
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
          await newBlog.save()
          response.json(newBlog.toJSON())
          }else{
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