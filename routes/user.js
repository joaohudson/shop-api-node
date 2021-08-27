import userController from './../controllers/user.js'
import loginController from './../controllers/login.js';
import express from 'express'

const userRoutes = express.Router();

userRoutes.use('/user/', loginController.athenticated);

userRoutes.post('/login', loginController.login);

userRoutes.post('/user/sigin', userController.create);

userRoutes.get('/user/listAll', userController.listAll);

userRoutes.get('/user/find', userController.find);

export default userRoutes