import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат').isEmail(),
    body('password', 'Пароль должен содержать от 5 до 10 символов').isLength({min: 5, max: 10}),
];

export const registerValidation = [
    body('email', 'Неверный формат').isEmail(),
    body('password', 'Пароль должен содержать от 5 до 10 символов').isLength({min: 5, max: 10}),
    body('fullName', 'Укажите имя').isLength({min: 2}),
];

export const carCreateValidation = [
    body('name', 'Введите марку автомобиля').isLength({min: 2}).isString(),
    body('model', 'Введите модель автомобиля').isLength({min: 2}).isString(),
    body('year', 'Введите год выпуска').isNumeric({min: 1970, max: new Date().getFullYear()}),
    body('volume', 'Введите обьем двигателя').isFloat({min: 0.8, max: 6.0}),
    body('cost', 'Введите цену').isNumeric({min: 0, max: 99999}),
    body('imageUrl', 'Неверная ссылка на фото').isString({min: 2}),
];
