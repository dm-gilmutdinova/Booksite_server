import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({
    min: 6,
  }),
  body('username', 'Username must be at least 6 characters').isLength({
    min: 6,
  }),
  body('avatarURL', 'Incorrect link to avatar').optional().isURL(),
];

export const loginValidation = [
  body('password', 'Password must be at least 6 characters').isLength({
    min: 6,
  }),
  body('email', 'Invalid email format').isEmail(),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок').optional().isLength({ min: 3 }).isString(),
  body('text', 'Введите текст').isLength({ min: 20 }).isString(),
  body('book', 'Укажите книгу').isLength({ min: 10 }).isString(),
  body('imgURL', 'Неверное изображение').optional().isString(),
];
