const express = require("express");
const app = express();

let books = [
  {
    id: "b1",
    title: "Book One",
    description: "Description of book one",
    authorId: "a1",
  },
  {
    id: "b2",
    title: "Book Two",
    description: "Description of book two",
    authorId: "a2",
  },
];

let reviews = [
  { id: "r1", text: "Amazing book!", bookId: "b1" },
  { id: "r2", text: "Decent read.", bookId: "b2" },
];

let authors = [
  { id: "a1", name: "Author One", bio: "Bio of Author One" },
  { id: "a2", name: "Author Two", bio: "Bio of Author Two" },
];

app.get("/", (req, res) => {
  res.send(books);
});

// Your routing and controller code goes here

// books
app.get("/books", (req, res) => {
  res.send(books);
});
// by id with author
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const selected = books.find((b) => b.id === id);
  // if found the id ,combine using ... then call out the additional stuff
  if (selected) {
    const selectedB = authors.find((a) => a.id === selected.authorId);
    const combined = { ...selected, name: selectedB.name, bio: selectedB.bio };
    res.send(combined);
  } else {
    res.send("undefined");
  }
});

// app.get("/books/:id", (req, res) => {
//   const id = req.params.id;
//   const selectedB = books.find((b) => b.id === id);
//   const selectedA = authors.find((a) => a.id === id);
//   const combined = selectedB;
//   res.send(combined);
// });

// reviews
app.get("/reviews", (req, res) => {
  res.send(reviews);
});
// by id with books
app.get("/reviews/:id", (req, res) => {
  const id = req.params.id;
  const review = reviews.find((r) => r.id === id);
  if (review) {
    const selectedA = books.find((b) => b.id === review.bookId);
    const combined = { ...review, title: selectedA.title };
    res.send(combined);
  } else {
    res.send("Undefined");
  }
});

// authors
app.get("/authors", (req, res) => {
  res.send(authors);
});
// by id
app.get("/authors/:id", (req, res) => {
  const id = req.params.id;
  const selected = authors.find((a) => a.id === id);
  res.send(selected);
});

app.listen(5554, () => {
  console.log("Bookstore app is running on http://localhost:5554");
});
