import express from 'express'
import userRoutes from './routes/user.js'

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use(userRoutes);

app.listen(port);