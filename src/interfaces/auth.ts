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

interface IAuthRegister {
	status: number;
	data:
		| {
				email: string;
				username: string;
				password: string;
				confirmPassword: string;
				fullName: string;
		  }
		| IResponseError;
}

interface IAuthProfile {
	status: number;
	data:
		| {
				id: string;
				email: string;
				username: string;
				firstName: string;
				lastName: string;
				isAuthenticated: boolean;
				profileImage: boolean;
				verified: boolean;
				assignments: {
					permissions: string[];
				};
		  }
		| IResponseError;
}

export { IAuthLogin, IAuthSuccess, IAuthRegister, IAuthProfile, ILogin };
