/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import Joi from 'joi';
import JoiPassword from 'joi-password-complexity';
import {StatusCodes} from 'http-status-codes';
import HandleError from '@utils/handlerError';
import type {IUser} from 'src/interfaces/userInterface';
import type {ITransaction} from 'src/interfaces/transactionInterface';
import type {IGetTransaction} from 'src/interfaces/getTransactionInterface';

const passwordValid = {
	min: 8,
	max: 35,
	lowerCase: 1,
	upperCase: 1,
	numeric: 1,
};

export default class ValidateUser {
	static newUserValidate(data: IUser): void {
		const {error} = Joi.object({
			username: Joi.string().required().min(3),
			password: JoiPassword(passwordValid),
		}).validate(data);

		if (error) {
			throw new HandleError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405
		}
	}

	static loginValidate(data: IUser): void {
		const {error} = Joi.object({
			username: Joi.string().required(),
			password: Joi.string().required(),
		}).validate(data);

		if (error) {
			throw new HandleError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405
		}
	}

	static transactionValidate(data: ITransaction): void {
		const {error} = Joi.object({
			value: Joi.number().required().positive().strict(),
			username: Joi.string().required(),
		}).validate(data);

		if (error) {
			throw new HandleError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405
		}
	}

	static getTransactionValidate(data: IGetTransaction): void {
		const {error} = Joi.object({
			date: [Joi.date().optional(), Joi.allow(null)],
			debited: [Joi.boolean().optional(), Joi.allow(null)],
			credited: [Joi.boolean().optional(), Joi.allow(null)],
		}).validate(data);

		if (error) {
			throw new HandleError(StatusCodes.METHOD_NOT_ALLOWED, error.message); // Error 405
		}
	}
}
