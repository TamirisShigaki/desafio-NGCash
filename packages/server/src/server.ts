import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import middlewareError from '@middleware/middlewareError';
import userRouter from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './doc/swaggerOutput.json';

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(middlewareError);

app.listen(3025, () => {
	console.log('Utilizando a porta 3025');
},
);
