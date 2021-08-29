import express from 'express'
import contaRoutes from './routes/conta.js';
import userRoutes from './routes/user.js'

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use(userRoutes);
app.use(contaRoutes);

app.listen(port);