import { IResponseError } from "./api";

interface ILogin {
	username: string;
	password: string;
}

interface IAuthSuccess {
	access: string;
	refresh: string;
}

interface IAuthLogin {
	status: number;
	data: IAuthSuccess | IResponseError;
}

export { IAuthLogin, IAuthSuccess, ILogin };
