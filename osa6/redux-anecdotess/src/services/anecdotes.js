import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = content
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async id =>{
  let anec = await axios.get(`${baseUrl}/${id}`)
  let newanec = {...anec.data, votes:anec.data.votes+1}
  const res = await axios.put(`${baseUrl}/${id}`,newanec)
  return res.data
}



export default { getAll,createNew,vote }