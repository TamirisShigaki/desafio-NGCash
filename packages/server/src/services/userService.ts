import Hash from '@utils/hash';
import type {IUser} from 'src/interfaces/userInterface';
import type UserModel from '@models/userModel';
import ValidateUser from '@middleware/validateUserMiddleware';
import {StatusCodes} from 'http-status-codes';
import HandleError from '@utils/handlerError';
import type {tokenData} from '@utils/token';
import Token from '@utils/token';
import type {ITransaction} from 'src/interfaces/transactionInterface';
import type {IGetTransaction} from 'src/interfaces/getTransactionInterface';
import type {transactions} from '@prisma/client';
import { IBalance } from 'src/interfaces/balanceInterface';

export default class UserService {
	private readonly _model: UserModel;

	constructor(model: UserModel) {
		this._model = model;
	}

	public async newUser(data: IUser): Promise<void | string> {
		ValidateUser.newUserValidate(data);
		const passwordHash = await Hash.newHash(data.password);

		try {
			await this._model.newUser({...data, password: passwordHash});
			return 'Usuário criado com sucesso';
		} catch (error: unknown) {
			throw new HandleError(StatusCodes.BAD_REQUEST, 'Usuário já existe'); // Error 400
		}
	}

	public async login(data: IUser): Promise<string> {
		ValidateUser.loginValidate(data);

		const user = await this._model.login(data.username);
		if (!user) {
			throw new HandleError(StatusCodes.BAD_REQUEST, 'Usuário não existe'); // Error 400
		}

		const validPassword = await Hash.hashValidate(data.password, user.password);
		if (!validPassword) {
			throw new HandleError(StatusCodes.BAD_REQUEST, 'Senha invalida'); // Error 400
		}

		return Token.newToken({id: user.id, accountId: user.accountId});
	}

	public async getBalance(token: tokenData): Promise<IBalance> {
		const balance = await this._model.getBalance(token.accountId);

		return {balance, accountId: token.accountId};
	}

	public async cashOutAndIn(token: tokenData, data: ITransaction): Promise<void> {
		ValidateUser.transactionValidate(data);

		await this._model.cashOutAndIn(token.accountId, data.username, data.value);
	}

	public async getTransaction(token: tokenData, data: IGetTransaction): Promise<transactions[]> {
		try {
			const filterTransaction = await this._model.getTransaction(token.accountId, data);

			if (!filterTransaction.length) {
				throw new HandleError(StatusCodes.NOT_FOUND, 'Nenhuma transação encontrada'); // Erro 404
			}

			return filterTransaction;
		} catch (error: unknown) {
			throw new HandleError(StatusCodes.NOT_FOUND, 'Nenhuma transação encontrada'); // Erro 404
		}
	}
}
