const express = require('express');
const session = require('express-session');
const passport = require('./src/utils/passportconfig');

const app = express();
const exampleRouter = require('./src/routes/example');
const bookRouter = require('./src/routes/book');
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const cors = require('cors');

const port = 3000;

app.use(
  session({
    secret: process.env.DEV_DB_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());

app.use('/api/books', bookRouter);
app.use('/api/examples', exampleRouter);
app.use('/api/', authRouter);

app.listen(port, () => {
  console.log('Book Management on 3000');
});
