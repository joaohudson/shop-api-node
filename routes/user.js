import userController from './../controllers/user.js'
import loginController from './../controllers/login.js';
import express from 'express'

const userRoutes = express.Router();

userRoutes.use('/user/private', loginController.athenticated);

userRoutes.post('/login', loginController.login);

userRoutes.post('/user/sigin', userController.create);

userRoutes.get('/user/private/listAll', userController.listAll);

userRoutes.get('/user/private/find', userController.find);

export default userRoutes