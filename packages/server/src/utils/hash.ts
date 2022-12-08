/* eslint-disable @typescript-eslint/no-extraneous-class */
import bcrypt from 'bcrypt';
import HandleError from './handlerError';
import {StatusCodes} from 'http-status-codes';

export default class Hash {
	static async newHash(data: string): Promise<string> {
		try {
			const passwordHash = await bcrypt.hash(data, 10);
			return passwordHash;
		} catch (error: unknown) {
			throw new HandleError(StatusCodes.FAILED_DEPENDENCY, 'Falha ao fazer o hash da senha'); // Error 424
		}
	}

	static async hashValidate(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
