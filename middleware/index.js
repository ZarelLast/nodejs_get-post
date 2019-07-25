const Express = require("express");
const Joi = require("joi");
const BodyParser = require("body-parser");
const Logger = require("./logger");
const helmet = require("helmet");
const Morgan = require("morgan");
const config = require("config");
const StartupDebug = require("debug")("App:startup");
const dbDebugger = require("debug")("App:db");

const App = Express();

App.set("view engine", "pug");
App.set("views", "./views");

// Configuration
console.log("Aplication Name : " + config.get("name"));
console.log("Mail Server : " + config.get("mail.host"));

// Middleware

console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`App Get : ${App.get("env")}`);

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true })); //key=value&key=value
App.use(Express.static("public"));
App.use(helmet());
// loggging with morgan
if (App.get("env") === "development") {
  StartupDebug("Morgan Enable..."); // console.log().... // cli export DEBUG=App:startup
  App.use(Morgan("tiny"));
}

// DB working
dbDebugger("Connected to database..."); // cli export DEBUG=App:db

// make new file and make function logging
App.use(Logger);
// or manual logging
App.use((req, res, next) => {
  console.log("Authenticating.....");
  next();
});

const course = [
  {
    id: 1,
    name: "haloo"
  },
  {
    id: 2,
    name: "hi"
  }
];

__courseId = reqId => {
  return course.find(e => e.id === parseInt(reqId));
};

App.get("/api/data", (req, res) => {
  res.send(course);
});

App.get("/api/data/:id", (req, res) => {
  const result = __courseId(req.params.id);
  res.send(result);
});

App.listen(8000, err => {
  console.log(err);
  console.log("Runing on port 8000 ...");
});
