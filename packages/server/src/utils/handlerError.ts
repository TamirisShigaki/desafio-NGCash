export default class HandleError extends Error {
	constructor(public status: number, public message: string) {
		super();
		this.status = status;
		this.message = message;
	}
}
