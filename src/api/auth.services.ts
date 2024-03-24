import { AxiosError, AxiosResponse } from "axios";
import api from "../services/api";
import { ILogin } from "../interfaces/auth";

class AuthService {
	static async login(data: ILogin): Promise<AxiosResponse | AxiosError | undefined> {
		try {
			return await api.post("api/auth/token/", data).then(async (response) => {
				console.log(response);
				return response as AxiosResponse;
			});
		} catch (error) {
			return error as AxiosError;
		}
	}
}

export default AuthService;
