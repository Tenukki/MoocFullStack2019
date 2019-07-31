
import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Toggable'
const Info = ({ msg }) => {
  return(
    <h1> {msg} </h1>
  )
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [infoMessage,setInfoMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blog => {
        setBlogs(blog)
        console.log(blog)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(blogs)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut =(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const postNewBlog = async (event) => {
    event.preventDefault()
    let blog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    try {
      const response = await blogService.create(blog)
      setInfoMessage('A new blog '+blog.title+' by '+blog.author)
      const blogi = await blogService.getAll()
      setBlogs(blogi)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => (
    <div className='App'>
      <h2>Log in to application</h2>
      {errorMessage !== null && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const userBlogs =( user ) => {
    let filteredBlogs = [...blogs]
    //filteredBlogs = filteredBlogs.filter(blogi => blogi.userId.username == user.username)
    filteredBlogs.sort((a,b) => b.likes-a.likes )
    return(
      <div>
        <h1>blogs</h1>
        {infoMessage !== null && <Info msg={infoMessage}/>}
        <span>{user.name} logged in</span><button onClick={handleLogOut}>logout</button>
        <p></p>
        <Togglable label={'new blog'}>
          <AddNewBlog
            title={title}
            author={author}
            url={url}
            setAuthor={setAuthor}
            setTitle={setTitle}
            setUrl={setUrl}
            postNewBlog={postNewBlog}
          />
        </Togglable>
        {filteredBlogs
          .map(userblog =>
            <Blog blog={userblog} key={userblog.id} blogs={blogs} setBlogs={setBlogs} user={user}/>
          )}
      </div>
    )
  }
  return (
    <div>
      {user === null && loginForm()}
      {user !== null && userBlogs(user)}
    </div>
  )
}

export default App
