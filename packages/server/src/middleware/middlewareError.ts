/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {ErrorRequestHandler} from 'express';
import {StatusCodes} from 'http-status-codes';

const middlewareError: ErrorRequestHandler = (err, _req, res, _next) => {
	const {status, message} = err;
	console.log('Error:', message);

	if (!status) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR) // Error 500
			.json({message: 'Internal sever error'});
	}

	return res.status(status).json({message});
};

export default middlewareError;
