const express = require("express");
const app = express();
const exampleRouter = require("./src/routes/example");
const bookRouter = require("./src/routes/book");

const port = 3000;

app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/examples", exampleRouter);

app.listen(port, () => {
  console.log("Book Management on 3000");
});
