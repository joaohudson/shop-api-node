import userController from './../controllers/user.js'
import loginController from './../controllers/login.js';
import express from 'express'

const userRoutes = express.Router();

userRoutes.use('/private', loginController.athenticated);

userRoutes.post('/login', loginController.login);

userRoutes.post('/user/sigin', userController.create);

userRoutes.get('/private/user/find', userController.find);

userRoutes.get('/private/user/erase', userController.erase);

export default userRoutes