const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const courses = [
  {
    id: 1,
    name: "course1"
  },
  {
    id: 2,
    name: "course2"
  },
  {
    id: 3,
    name: "course3"
  }
];

// get array from const course
app.get("/api/array", (req, res) => {
  res.send(courses);
});

// get array id from const course
app.get("/api/array/:id", (req, res) => {
  const course = courses.find(e => e.id === parseInt(req.params.id));

  // error 404
  if (!course) {
    res.status(404).send("The courses with id " + course + " was not found");
  } else {
    res.send(course);
  }
});

// post
app.post("/api/array", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// set port
app.listen(8000, err => {
  console.log(err);
  console.log("Run on Port 8000...");
});
