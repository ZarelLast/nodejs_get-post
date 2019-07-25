const Joi = require("joi");
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
app.get("/api/data", (req, res) => {
  res.send(courses);
});

// manual validation
// app.post("api/array", (req, res) => {
//     // 400 Bad request
//   if (!req.body.name || req.body.name.length < 3) {
//     res.status(400).send("Minimun require is 3 character");
//     return;
//   }

//   const course = {
//     id: courses.length + 1,
//     name: req.body.name
//   };
//   courses.push(course);
//   res.send(course);
// });

// Joi validation
app.post("/api/data", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const resJoi = Joi.validate(req.body, schema);
  if (resJoi.error) {
    res.status(400).send(resJoi.error);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// set port
app.listen(8080, err => {
  console.log(err);
  console.log("Run on Port 8000...");
});
