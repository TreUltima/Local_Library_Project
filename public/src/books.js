function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  //return books.find(book => book.id === id)
  //helper function findAuthorById
  return findAuthorById(books, id)
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let borrowedBooks = books.filter(book => {
    const {borrows} = book;
    let takenBooks = borrows.some(currentlyBorrowed=>{
      if(currentlyBorrowed.returned === false){
        return currentlyBorrowed
      }
    })
    return takenBooks
  })
 
  let returnedBooks = books.filter(book => {
    const {borrows} = book;
    let nonTakenBooks = borrows.every(currentlyReturned =>{
      return currentlyReturned.returned === true
    })
    return nonTakenBooks
  })
  result.push(borrowedBooks)
  result.push(returnedBooks)
  //console.log(result)
  return result
  
}

function getBorrowersForBook(book, accounts) {
  const {borrows} = book;
  let bookBorrowers = borrows.map(borrowerObj => {
    //helper function findAuthorById
    let accountFound = findAuthorById(accounts, borrowerObj.id)
    //let accountFound = accounts.find(accountObj => accountObj.id === borrowerObj.id)
    //console.log(accountFound)
    return {...borrowerObj, ...accountFound}
  })
  return bookBorrowers.slice(0,10)
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
