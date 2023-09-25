const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const redis = require('redis');
const connectRedis = require('connect-redis');
const path = require('path');

const app = express();
const RedisStore = connectRedis(session);

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
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
