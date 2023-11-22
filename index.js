const express = require('express');
const passport = require('./src/utils/passportJwtConfig');

const app = express();
const exampleRouter = require('./src/routes/example');
const bookRouter = require('./src/routes/book');
const authRouter = require('./src/routes/auth');
const cors = require('cors');

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api/books', bookRouter);
app.use('/api/examples', exampleRouter);
app.use('/api/', authRouter);

app.listen(port, () => {
  console.log('Book Management on 3000');
});
