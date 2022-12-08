import type {users} from '@prisma/client';

export async function mockNewUser(): Promise<users> {
	return {
		id: 'd844b05a-639b-4f14-a6df-86a537e8fc34',
		username: 'TesteNewUser',
		password: '$2b$10$duZ0NeY/bmZCoyB7vffjtO9r2BxLQ2nrDPvET0bqH.FUKHiq6hMo6',
		accountId: 'e587cc95-ea02-4a4e-a894-95ee47b7f576',
	};
}

export async function mockNewUserFalid(): Promise<users> {
	throw new Error();
}

export async function mockLogin(): Promise<users> {
	return {
		id: '4d520188-e067-4ea3-9fd9-a26f9b24701e',
		username: 'TesteNewUser',
		password: '$2b$10$sMr9i5R1OjCVySjwTWUMk.H5yBpUG3GsvMG6g0lLBMgX4VNQRCY/m',
		accountId: '6b603634-2206-48e6-bcc1-d172ba7ef6f6',
	};
}

export const userMock = {
	username: 'TesteNewUser',
	password: 'SenhaNewUser123',
};

export const userMockInvalid = {
	username: 'TesteNewUser',
	password: 'senha',
};

// Export const token = {
// 	message: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNGQ1MjAxODgtZTA2Ny00ZWEzLTlmZDktYTI2ZjliMjQ3MDFlIiwiaWF0IjoxNjY4ODE3MjcxLCJleHAiOjE2Njg5MDM2NzF9.tXqTAcC_sZsvkjTniKGy_q0xQK7G5Sv5pICx8q_lnT0',
// };

export default {
	mockNewUser,
	mockNewUserFalid,
	mockLogin,
	userMock,
	userMockInvalid,
	// Token,
};
