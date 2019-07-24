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

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/contoh", (req, res) => {
  res.send([
    {
      users: { number: "1", name: "world", age: "1" },
      animals: { number: "2", name: "world1", age: { whenChild: 10, now: 20 } }
    }
  ]);
});

// send /api/course/123 output 123
app.get("/api/course/:idCourse", (req, res) => {
  res.send(req.params.idCourse);
});

// send /api/time/2019/11 output years:2019 month:11
app.get("/api/time/:year/:month", (req, res) => {
  res.send(req.params);
});

// send /api/course/?shortBy=idCourse output shortby idcourse
app.get("/api/course/", (req, res) => {
  res.send(req.query);
});

// set port
app.listen(8000, err => {
  console.log(err);
  console.log("Run on Port 8000...");
});
