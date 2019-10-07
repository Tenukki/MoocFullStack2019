import React, { useState } from 'react'
import Blogloader from '../services/blogs'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, setBlogs, user }) => {
  const [click,setClick] = useState(true)

  const handleLike = async () => {
    const copyblog = { ...blog }
    const newBlog = {
      ...copyblog,
      userId: copyblog.userId.id,
      likes: copyblog.likes+1
    }
    delete newBlog.id
    const responseBlog = await Blogloader.update(blog.id,newBlog)
    console.log('put response',responseBlog)
    const updateBlogs = await Blogloader.getAll()
    setBlogs(updateBlogs)
  }

  const handleBlogRemove = async () => {
    try {
      if(window.confirm('remove blog ' + blog.title+' by '+blog.author)){
        const response = await Blogloader.remove(blog.id)
        console.log('repsonse',response)
        const updateBlogs = await Blogloader.getAll()
        setBlogs(updateBlogs)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(click){
    return(
      <div className="notClicked" onClick={ () => setClick(!click)}>
        {blog.title} {blog.author}
      </div>
    )
  }else{
    console.log(user)
    console.log(blog.userId.username)
    console.log(user.username)
    return(
      <div className="clicked">
        <p  onClick={() => setClick(!click)}>{blog.title} {blog.author} </p>
        <a href={blog.url}>{blog.url}</a>
        <p></p>
        <span> {blog.likes} likes </span>
        <Button onClick={() => handleLike()}>like</Button>
        <p>added by {blog.userId.name}</p>
        {blog.userId.username===user.username && <Button onClick={() => handleBlogRemove()}>remove</Button>}
      </div>
    )
  }
}

export default Blog