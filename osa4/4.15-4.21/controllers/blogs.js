const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    //populate katsoo kenttää johon se linkkaa
    const blogs = await Blog.find({}).populate("userId",{username:1,name:1,id:1})

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.delete('/:id', async (request, response,next) => {
    const r = await Blog.findById(request.params.id)
    console.log(r)
    if(!r){
      response.status(404).json({error: "id couldn't be found"}).end()
    }else{
      try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        console.log(decodedToken)
        if (!request.token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }
        if(decodedToken.id.toString() !== r.userId.toString()){
          return response.status(401).json({error: "the user id did not match the blog id"})
        }

        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).json({response: "item was deleted"}).end()
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
      likes: body.likes,
      userId: body.userId

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
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      
      const user = await User.findById(decodedToken.id)

      if(!request.body.hasOwnProperty('url') && !request.body.hasOwnProperty('title')){
          response.status(400).end()
      }else{

        //jos object ei sisällä kenttää likes
        if(!request.body.hasOwnProperty('likes')){
          console.log(request.body)
          let a = request.body
          let uusi = {
            title: a.title,
            author: a.author,
            url: a.url,
            likes: 0,
            userId: user._id
          }
          console.log(uusi)
          const newBlog = new Blog(uusi)
          const savedblog = await newBlog.save()

          user.blogs = user.blogs.concat(savedblog._id)
          await user.save()

          response.status(201).json(newBlog.toJSON()).end()
        }else{
            console.log("hellou")
            let a = request.body
            let newObject = {
              title: a.title,
              author: a.author,
              url: a.url,
              likes: a.likes,
              userId: user._id
            }
            const blog = new Blog(newObject)
            const savedblog = await blog.save()

            user.blogs = user.blogs.concat(savedblog._id)
            await user.save()

            response.status(201).json(savedblog.toJSON()).end()
        }
      }
    } catch (error) {
      
    }
  
})


module.exports = blogsRouter