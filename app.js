import express from 'express'; 
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import jobsRouter from './router/jobs.js'
import {config} from './config.js'
import { sequelize } from './db/database.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/jobs', jobsRouter);

app.use((req, res, next) => {
res.sendStatus(404);
})

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

sequelize.sync().then((client)=> {
    app.listen(config.host.port)
})