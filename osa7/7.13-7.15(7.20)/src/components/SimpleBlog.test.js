import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from '../components/SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  let blog = { title: 'Testi',author: 'Santeri',likes: 0 }

  const onClick = (event) => {
    console.log(event.target.value)
    blog = { ...blog,likes:blog.likes+1 }
  }

  const component = render(
    <SimpleBlog onClick={onClick} blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'Santeri'
  )
  expect(component.container).toHaveTextContent(
    'Testi'
  )

  const div = component.container.querySelector('.likes')
  expect(div).toHaveTextContent(`blog has ${blog.likes} likes`)
})

test('Test if buton clicked', () => {
  let blog = { title: 'Testi',author: 'Santeri',likes: 0 }
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog onClick={mockHandler} blog={blog}/>
  )
  const button = component.container.querySelector('.nappi')

  console.log(prettyDOM(button))
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)


})
/*
test('Test if div has test Test1 Santeri1', () => {
  const Data = {
    title: 'Testi1',
    author: 'Santeri1',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 5,
    userId: {
      username: 'testi',
      name: 'Santeri.T',
      id: '5d3dea6016bafe0ddcb0bac5'
    },
    id: '5d3dfa7112e0340244139875'
  }

  const user = {
    username: 'testi',
    name: 'Santeri.T',
    id: '5d3dea6016bafe0ddcb0bac5'
  }

  const component = render(
    <Blog blog={Data} key={1} setBlogs={''} user={user}/>
  )
  const div = component.container.querySelector('.notClicked')
  console.log(prettyDOM(div))
  expect(div).toHaveTextContent('Testi1 Santeri1')
  fireEvent.click(div)
  console.log(prettyDOM(div))
  expect(div).toHaveTextContent('added by Santeri.T')
  expect(div).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
})

*/