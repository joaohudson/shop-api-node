import contaController from "../controllers/conta.js";
import express from "express";
import loginController from "../controllers/login.js";

const contaRoutes = express.Router();

contaRoutes.use('/conta/private/', loginController.athenticated);

contaRoutes.get('/conta/private/find', contaController.find);

export default contaRoutes;
