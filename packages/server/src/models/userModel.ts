/* eslint-disable @typescript-eslint/naming-convention */
import type {PrismaClient, transactions, users} from '@prisma/client';
import HandleError from '@utils/handlerError';
import {StatusCodes} from 'http-status-codes';
import type {IGetTransaction} from 'src/interfaces/getTransactionInterface';
import type {IUser} from 'src/interfaces/userInterface';

export default class UserModel {
	private readonly _connect: PrismaClient;

	constructor(connect: PrismaClient) {
		this._connect = connect;
	}

	public async newUser(data: IUser): Promise<users> {
		const user = await this._connect.users.create({
			data: {
				username: data.username,
				password: data.password,
				account: {
					create: {},
				},
			},
		});
		return user;
	}

	public async login(username: string): Promise<users> {
		const login = await this._connect.users.findUnique({
			where: {
				username,
			},
		});

		return login;
	}

	public async getBalance(accountId: string): Promise<number> {
		const balance = await this._connect.accounts.findUnique({
			where: {id: accountId},
		});
		return balance.balance;
	}

	public async cashOutAndIn(accountCashOut: string, userCashIn: string, value: number): Promise<void> {
		const accountDebited = await this._connect.accounts.findFirst({
			where: {id: accountCashOut},
		});

		const accountCredited = await this._connect.users.findFirst({
			where: {username: userCashIn},
		});

		if (accountDebited.balance >= value && accountCredited.accountId !== accountCashOut) {
			await this._connect.$transaction([
				this._connect.accounts.update({
					where: {id: accountCashOut},
					data: {balance: {decrement: value}},
				}),

				this._connect.accounts.update({
					where: {id: accountCredited.accountId},
					data: {balance: {increment: value}},
				}),

				this._connect.transactions.create({
					data: {
						value,
						debitedAccountId: accountDebited.id,
						creditedAccountId: accountCredited.accountId,
					},
				}),
			]);
		} else {
			throw new HandleError(StatusCodes.BAD_REQUEST, 'Falha na transferência, confira as informações fornecidas!'); // Erro 400
		}
	}

	public async getTransaction(accountId: string, data: IGetTransaction): Promise<transactions[]> {
		if (!Object.keys(data).length) {
			return this._connect.transactions.findMany({
				where: {
					OR: [
						{creditedAccountId: accountId}, {debitedAccountId: accountId},
					],
				},
			});
		}

		return this._connect.transactions.findMany({
			where: {
				OR: [
					{creditedAccountId: (data.credited ? accountId : undefined)},
					{debitedAccountId: (data.debited ? accountId : undefined)},
					{createdAt: new Date(data.date)},
				],
				AND: [
					{creditedAccountId: (data.credited ? accountId : undefined), createdAt: new Date(data.date)},
					{debitedAccountId: (data.debited ? accountId : undefined), createdAt: new Date(data.date)},
				],
			},
		});
	}
}
