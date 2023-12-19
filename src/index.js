import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
// import rateLimit from 'express-rate-limit';

import checkAuth from './../utils/checkAuth.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';
import * as UserController from '../controllers/UserController.js';
import * as PostController from '../controllers/PostController.js';
import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from '../validation/validation.js';

mongoose
  .connect(
    'mongodb+srv://qwerty:qwerty123@cluster0.imwpykw.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
const PORT = 4000;

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 1,
// });

// app.use(limiter);

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  '/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get('/getUser', checkAuth, UserController.getUser);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(PORT, () => {
  console.log(`Server is running in PORT: ${PORT}`);
});
