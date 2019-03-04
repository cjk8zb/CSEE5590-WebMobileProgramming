const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: String,
  publisher: String,
  updated_date: {type: Date, default: Date.now},
});

/**
 *
 * @class Book
 * @typeof Model<BookSchema>
 */
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
