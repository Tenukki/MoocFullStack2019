import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

afterEach(cleanup)

test('Blog Tes file Test1 Santeri1', () => {
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