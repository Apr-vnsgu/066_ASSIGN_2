const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: '@rya1234',
    resave: false,
    saveUninitialized: true,
    store: new (require('session-file-store')(session))({
      path: path.join(__dirname, 'sessions'),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = {
      id: 1,
      username: 'user',
      passwordHash: '$2b$10$izweAg...',
    };

    bcrypt.compare(password, user.passwordHash, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect username or password' });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = {
    id: 1,
    username: 'user',
  };
  done(null, user);
});

app.use('/login', require('./routes/auth'));
app.use('/home', require('./routes/home'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
