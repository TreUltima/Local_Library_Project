function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let totalBorrowed = []
  books.filter(bookObj =>{
    const {borrows} = bookObj;
    borrows.filter(borrowObj => {
      if (borrowObj.returned === false){
        totalBorrowed.push(borrowObj)
      }
    })
  })
  return totalBorrowed.length
}

function getMostCommonGenres(books) {
  let mostCommon = {};
  let genreResults = [];

  books.forEach(bookObj => {
    const {genre} = bookObj;
    if(mostCommon[genre] == null){
      mostCommon[genre] = 1;
    }
    else{
      mostCommon[genre]++;
    }
  })

  const genres = Object.keys(mostCommon)
  
  genres.forEach(genre => {
    let genreCount = mostCommon[genre];
    let newObj = {name: genre, count: genreCount}
    genreResults.push(newObj)
  })
  genreResults.sort((genreA, genreB) => genreB.count - genreA.count)
  
  return genreResults.slice(0,5);
}

function getMostPopularBooks(books) {
books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length)

let popularResults = books.map(bookObj => {
  const {title, borrows} = bookObj;
  let newObj = {name: title, count: borrows.length};
  return newObj;
})


return popularResults.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  let mostPopular = []
  authors.forEach(author => {
    let authorName = {name:`${author.name.first} ${author.name.last}`, count: 0
    }
    books.forEach(book => {
      const {borrows} = book;
      if(book.authorId === author.id){
        authorName.count += borrows.length;
      }
    })
    mostPopular.push(authorName)
  })
  let result = mostPopular.sort((authorA, authorB) => authorB.count - authorA.count)

  return result.slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
