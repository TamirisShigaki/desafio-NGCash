/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/naming-convention */
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import type {users} from '@prisma/client';
import type {Request, Response, NextFunction} from 'express';
import HandleError from './handlerError';
import {StatusCodes} from 'http-status-codes';

type jwtPayload = {
	data: users;
	iat: number;
	exp: number;
};

const secret = process.env.JWT_SECRET;

declare global {
	namespace Express {
		interface Request {
			user: any;
		}
	}
}

export type tokenData = {
	id: string;
	accountId: string;
};

export default class Token {
	static newToken(data: string | tokenData): string {
		const config: jwt.SignOptions = {
			algorithm: 'HS256',
			expiresIn: '24h',
		};

		const token = jwt.sign({data}, secret, config);
		return token;
	}

	static decodedToken(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization;
		if (!token) {
			throw new HandleError(StatusCodes.EXPECTATION_FAILED, 'É necessário informar um Token'); // Error 417
		}

		try {
			const decoded = jwt.verify(token, secret);
			req.user = (decoded as jwtPayload).data;
			next();
		} catch (error: unknown) {
			throw new HandleError(StatusCodes.UNAUTHORIZED, 'Token invalido ou expirado'); // Error 401
		}
	}
}
