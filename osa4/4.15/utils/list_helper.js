var _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes=(blogs) => {
    const reducer = (sum,item) => sum + item.likes
    summa = blogs.reduce(reducer,0)
    return summa
}

const favoriteBlog = (blogs) => {
    henkilo = {}
    max = 0
    //const henkilo = blogs.reduce((max,item) => (item.likes > max ? item.likes : max),0)
    blogs.forEach(element => {
        if(element.likes > max){
            max = element.likes
            henkilo = element
        }
    });
    return henkilo
}

const mostBlogs = (blogs) => {
    const result = _(blogs).groupBy('author').values().map(
        (group) => ({...group[0], qty: group.length})
    );

    henkilo = {}
    max = 0
    //const henkilo = blogs.reduce((max,item) => (item.likes > max ? item.likes : max),0)
    result.forEach(element => {
        if(element.qty > max){
            max = element.qty
            henkilo = element
        }
    });
    const newHenkilo = {
        author: henkilo.author,
        blogs: henkilo.qty

    }
    return newHenkilo

}

const mostLikes = (blogs) => {
    let sums = _(blogs)
    .groupBy('author')
    .map((author, id) => ({
      author: id,
      likes: _.sumBy(author, 'likes'),
    }))
    .value()

    return _.maxBy(sums,"likes")
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }