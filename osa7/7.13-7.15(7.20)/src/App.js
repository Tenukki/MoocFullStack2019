
import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Toggable'
import { useField } from './hooks/'
import { Form, Button, ListGroup } from 'react-bootstrap'

const Info = ({ msg }) => {
  return(
    <h1> {msg} </h1>
  )
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user,setUser] = useState(null)
  const [infoMessage,setInfoMessage] = useState(null)
  const userLogin = useField('text','Username')
  const userPassword = useField('password','Password')
  const title = useField('text','Title')
  const author = useField('text','Author')
  const url = useField('text','Url')

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
      const user = await loginService.login({ username: userLogin.value, password:userPassword.value })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      userLogin.reset()
      userPassword.reset()
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
      title: title.value,
      author: author.value,
      url: url.value,
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
    <div >
      <h2>Log in to application</h2>
      {errorMessage !== null && <p>{errorMessage}</p>}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            { ...userLogin}
            reset={''}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...userPassword}
            reset={''}
          />
          <Button variant="primary" type='submit'>login</Button>
        </Form.Group>
      </Form>
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
        <span>{user.name} logged in</span><Button onClick={handleLogOut}>logout</Button>
        <p></p>
        <Togglable label={'new blog'}>
          <AddNewBlog
            title={title} url={url} author={author}
            postNewBlog={postNewBlog}
          />
        </Togglable>
        <ListGroup>
          {filteredBlogs
            .map(userblog =>
              // eslint-disable-next-line react/jsx-key
              <ListGroup.Item>
                <Blog blog={userblog} key={userblog.id} setBlogs={setBlogs} user={user}/>
              </ListGroup.Item>
            )}
        </ListGroup>
      </div>
    )
  }
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div class="container">
      {user === null && loginForm()}
      {user !== null && userBlogs(user)}
    </div>
  )
}



export default App
