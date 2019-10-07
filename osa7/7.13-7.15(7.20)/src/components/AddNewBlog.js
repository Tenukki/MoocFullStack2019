import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const AddNewBlog = ({ title,author,url,postNewBlog }) => {
  return (
    <div>
      <h1>create new</h1>
      <Form onSubmit={postNewBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control className="w-25 p-3"
            type="text"
            name="title"
            {...title}
            reset={''}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control className="w-25 p-3"
            type="text"
            name="author"
            {...author} reset={''}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control className="w-25 p-3"
            type="text"
            name="url"
            {...url} reset={''}
          />
          <Button type='submit'>Add</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
AddNewBlog.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  postNewBlog: PropTypes.func.isRequired,
}

export default AddNewBlog
