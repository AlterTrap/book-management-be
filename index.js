const express = require("express");
const app = express();
const exampleRouter = require("./src/routes/example");

const port = 3000;

app.use("/api/examples", exampleRouter);

app.listen(port, () => {
  console.log("Book Management on 3000");
});
