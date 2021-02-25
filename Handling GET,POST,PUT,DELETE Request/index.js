const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Angular" },
  { id: 2, name: "Vue" },
  { id: 3, name: "React" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Get Request --> Get a single course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with given ID was not found :(");
    return;
  }
  res.send(course);
});

// Post Request --> Create a new course
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body.name);

  if (error) {
    res.status(400).send(result.error.message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Put Request --> Updating Course
app.put("/api/courses/:id", (req, res) => {
  //Look up the coursevif not exits return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with given ID was not found :(");
    return;
  }
  //Validate, if invalid return 400-Bad Request
  const { error } = validateCourse(req.body.name);

  if (error) {
    res.status(400).send(error.message);
    return;
  }

  //Update
  course.name = req.body.name;

  //Return the updatedcourse
  res.send(course);
});

// Delete Request --> Delete a course
app.delete("/api/courses/:id", (req, res) => {
  // 1st look up the course, if not exits, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with given ID was not found :(");
    return;
  }
  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return the same course
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(10),
  });

  return schema.validate({ name: course });
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
