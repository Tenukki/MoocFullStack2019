import React from 'react'
import PropTypes from 'prop-types'

const AddNewBlog = ({ title,author,url,postNewBlog,setTitle,setAuthor,setUrl }) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={postNewBlog}>
        <div>
            title:<input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            author:<input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            url:<input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}
AddNewBlog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  postNewBlog: PropTypes.object.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
}

export default AddNewBlog