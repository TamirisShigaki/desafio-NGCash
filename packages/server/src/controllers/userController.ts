import {StatusCodes} from 'http-status-codes';
import type {Request, Response} from 'express';
import type UserService from '@services/userService';

export default class UserController {
	private readonly _service: UserService;

	constructor(service: UserService) {
		this._service = service;
	}

	public async newUser(req: Request, res: Response): Promise<Response> {
		const result = await this._service.newUser(req.body);

		return res.status(StatusCodes.CREATED).json({message: result}); // Sucesso 201
	}

	public async login(req: Request, res: Response): Promise<Response> {
		const result = await this._service.login(req.body);

		return res.status(StatusCodes.OK).json({token: result}); // Ok 200
	}

	public async getBalance(req: Request, res: Response): Promise<Response> {
		const balance = await this._service.getBalance(req.user);

		return res.status(StatusCodes.OK).json(balance); // Ok 200
	}

	public async cashOutAndIn(req: Request, res: Response): Promise<Response> {
		await this._service.cashOutAndIn(req.user, req.body);

		return res.status(StatusCodes.OK).json({message: 'Transferência efetuada com sucesso'}); // Ok 200
	}

	public async getTransaction(req: Request, res: Response): Promise<Response> {
		const result = await this._service.getTransaction(req.user, req.body);

		return res.status(StatusCodes.OK).json(result); // Ok 200
	}
}
