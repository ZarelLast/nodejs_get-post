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

app.put("/api/data/:id", (req, res) => {
  // look up data
  // if not existing, return 404

  const course = courses.find(e => e.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Id yang anda masukan salah");
    return;
  }

  // validate
  // if invalid, return 400 - bad request

  // const resJoi = __validateData(res.body);
  // same as
  // object destructuring
  const { error } = __validateData(req.body); // resJoi.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // update course
  // return update course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/data/:id", (req, res) => {
  const course = courses.find(e => e.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Id yang anda masukan salah");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

__validateData = data => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(data, schema);
  return result;
};

// set port
app.listen(8080, err => {
  console.log(err);
  console.log("Run on Port 8080...");
});
