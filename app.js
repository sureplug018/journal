const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const supportRoutes = require('./routes/supportRoutes');
const eventRoutes = require('./routes/eventRoutes');
const journalRoutes = require('./routes/journalRoutes');
const articleRoutes = require('./routes/articleRoutes');
const viewsRoutes = require('./routes/viewsRoutes');

const app = express();
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
}

app.set('views', path.join(__dirname, 'views'));

// limiting the amount of requests from an IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this Ip, please try again in an hour!',
});

app.use('/api', limiter);

// limiting the amount of data that is parsed in body-parser by adding size in kb
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// DATA SANITIZATION
app.use(mongoSanitize());

app.use(express.static('./public'));

// routes
app.use('/', viewsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/supports', supportRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/journals', journalRoutes);
app.use('/api/v1/articles', articleRoutes);

module.exports = app;
