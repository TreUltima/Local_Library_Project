function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let person = account.id;
  let totalBorrowed = 0;
  books.forEach(borrowedBooks => {
    const{borrows} = borrowedBooks;
    borrows.forEach(borrowsObj => {
      if(borrowsObj.id === person){
        totalBorrowed++
      }
    })
  })
    return totalBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  let bookList = [];
  books.filter(bookObj => {  
    const {borrows} = bookObj; 
    borrows.forEach(borrowObj => {
      if(borrowObj.id === account.id && borrowObj.returned === false){
        bookList.push(bookObj)
      }
    })
  })

  bookList.map(bookObj => {
    let foundAuthor = authors.find(authorObj => bookObj.authorId === authorObj.id)
    bookObj.author = foundAuthor;
    return bookObj;
  })
  return bookList
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
