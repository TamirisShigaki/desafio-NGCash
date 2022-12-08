/* eslint-disable new-cap */
import {Router} from 'express';

import UserModel from '@models/userModel';
import UserService from '@services/userService';
import UserController from '@controllers/userController';
import prisma from '@models/connect.prisma';
import Token from '@utils/token';

const model = new UserModel(prisma);
const service = new UserService(model);
const controller = new UserController(service);

const userRouter = Router();

userRouter.post('/newUser', async (req, res) => (controller.newUser(req, res)));

userRouter.post('/login', async (req, res) => (controller.login(req, res)));

userRouter.get('/balance', async (req, res, next) => {
	Token.decodedToken(req, res, next);
}, async (req, res) => (controller.getBalance(req, res)));

userRouter.patch('/cashOutIn', async (req, res, next) => {
	Token.decodedToken(req, res, next);
}, async (req, res) => (controller.cashOutAndIn(req, res)));

userRouter.post('/transaction', async (req, res, next) => {
	Token.decodedToken(req, res, next);
}, async (req, res) => (controller.getTransaction(req, res)));

export default userRouter;
