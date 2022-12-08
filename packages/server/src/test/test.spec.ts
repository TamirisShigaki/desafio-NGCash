import UserModel from '@models/userModel';
import UserService from '@services/userService';
import prisma from '@models/connect.prisma';
import {
	mockNewUser,
	userMock,
	userMockInvalid,
	mockNewUserFalid,
	mockLogin,
	// Token,
} from './mock/mockUser';

const model = new UserModel(prisma);
const service = new UserService(model);

describe('Teste - regras de negócio: Novo Usuário', () => {
	it('Testa se o usuário é criado com sucesso', async () => {
		const newUser = jest.spyOn(model, 'newUser').mockImplementation(mockNewUser);

		const result = await service.newUser(userMock);

		expect(newUser).toHaveBeenCalled();
		expect(typeof result).toBe('string');
		expect(result).toEqual('Usuário criado com sucesso');
	});

	it('Testa se o argumento informado na criação do usuário é invalido, retornando um erro', async () => {
		try {
			await service.newUser(userMockInvalid);
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(Error);
			expect(error).toHaveProperty('status', 405);
		}
	});

	it('Testa se ao tentar criar um usuário já existente, retorna um erro', async () => {
		const newUser = jest.spyOn(model, 'newUser').mockImplementation(mockNewUserFalid);

		try {
			await service.newUser(userMock);
		} catch (error: unknown) {
			expect(newUser).toHaveBeenCalled();
			expect(error).toBeInstanceOf(Error);
			expect(error).toHaveProperty('status', 400);
			expect(error).toHaveProperty('message', 'Usuário já existe');
		}
	});
});

describe('Teste - regras de negócio: Login', () => {
	it('Testa se o login for bem sucedido, retorna um Token', async () => {
		const login = jest.spyOn(model, 'login').mockImplementation(mockLogin);

		const result = await service.login(userMock);
		expect(login).toHaveBeenCalled();
		expect(typeof result).toBe('string');
	});

	it('Testa se os argumentos informados no login é invalido, retornando um erro', async () => {
		try {
			await service.login(userMockInvalid);
		} catch (error: unknown) {
			expect(error).toBeInstanceOf(Error);
			expect(error).toHaveProperty('status', 400);
		}
	});
});
