const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");
process.env.NODE_ENV = "test";

beforeEach(async function () {
  await db.query("DELETE FROM books");

});

describe("POST /books", function () {
  test("Creates a new book", async function () {
    const response = await request(app)
      .post(`/books`)
      .send({
        isbn: "0691161519",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matt Lane",
        language: "english",
        pages: 270,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      "book": {
        "isbn": "0691161519",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matt Lane",
        "language": "english",
        "pages": 270,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
      }
    });

    const getBookResponse = await request(app).get(`/books`)
    // console.log("GET BOOK REsponse:", getBookResponse)
    expect(getBookResponse.body.books[0]).toEqual(
      {
        "isbn": "0691161519",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matt Lane",
        "language": "english",
        "pages": 270,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
      });
    expect(getBookResponse.body.books).toHaveLength(1);
  });
});

afterAll(async function () {
  await db.end();
});