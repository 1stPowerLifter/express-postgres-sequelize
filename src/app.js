require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger/swagger.json');
const { usersRouter, rolesRouter, authRouter, postsRouter, categoriesRouter, tagsRouter } = require('./routers');
const { auth } = require('./middlewares');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', auth, usersRouter);
app.use('/api/roles', auth, rolesRouter);
app.use('/api/posts', auth, postsRouter);
app.use('/api/categories', auth, categoriesRouter);
app.use('/api/tags', auth, tagsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.log(error);
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({ message });
});

module.exports = app;
