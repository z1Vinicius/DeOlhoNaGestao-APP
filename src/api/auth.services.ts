import { AxiosError, AxiosResponse } from "axios";
import api from "../services/api";
import { ILogin } from "../interfaces/auth";

class AuthService {
	static async login(data: ILogin): Promise<AxiosResponse | AxiosError | undefined> {
		try {
			return await api.post("api/auth/token/", data).then(async (response) => {
				return response as AxiosResponse;
			});
		} catch (error) {
			return error as AxiosError;
		}
	}
	static async register(data: ILogin): Promise<AxiosResponse | AxiosError | undefined> {
		try {
			return await api.post("api/auth/register/", data).then(async (response) => {
				return response as AxiosResponse;
			});
		} catch (error) {
			console.log(error.response.data);
			return error as AxiosError;
		}
	}
	static async profile(): Promise<AxiosResponse | AxiosError | undefined> {
		try {
			return await api.get("api/auth/profile").then(async (response) => {
				return response as AxiosResponse;
			});
		} catch (error) {
			return error as AxiosError;
		}
	}
}

export default AuthService;
