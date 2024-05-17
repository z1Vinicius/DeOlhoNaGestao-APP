import axios, { AxiosResponse, AxiosError } from "axios";
import { IResponseError } from "../interfaces/api";

import { IAuthLogin, IAuthRegister, IAuthSuccess, IAuthProfile } from "../interfaces/auth";

const connectionError = { status: 500, data: { code: "connection_error", message: "Sem conexão", details: [] } };

class AuthMapper {
	static AuthLogin(apiResponse: AxiosResponse | AxiosError | undefined): IAuthLogin {
		if (!apiResponse) {
			return connectionError;
		}

		if (axios.isAxiosError(apiResponse)) {
			const errorCode = apiResponse.code;
			if (errorCode === "ECONNABORTED") {
				return connectionError;
			}
			const errorData: IResponseError = apiResponse.response?.data as IResponseError;
			return {
				status: apiResponse.response?.status || 500,
				data: { code: errorData?.code || "unknown_error", message: errorData?.message || "", details: errorData?.details || [] },
			};
		}

		if (apiResponse.status === 200) {
			return { status: apiResponse.status, data: apiResponse.data as IAuthSuccess };
		}
		return connectionError;
	}

	static AuthRegister(apiResponse: AxiosResponse | AxiosError | undefined): IAuthRegister {
		console.log(apiResponse);
		if (!apiResponse) {
			return connectionError;
		}

		if (axios.isAxiosError(apiResponse)) {
			const errorCode = apiResponse.code;
			if (errorCode === "ECONNABORTED") {
				return connectionError;
			}
			const errorData: IResponseError = apiResponse.response?.data as IResponseError;
			return {
				status: apiResponse.response?.status || 500,
				data: { code: errorData?.code || "unknown_error", message: errorData?.message || "", details: errorData?.details || [] },
			};
		}

		if (apiResponse.status === 201) {
			return { status: apiResponse.status, data: apiResponse.data as IAuthSuccess };
		}
		return connectionError;
	}

	static AuthProfile(apiResponse: AxiosResponse | AxiosError | undefined): IAuthProfile {
		if (!apiResponse) {
			return connectionError;
		}

		if (axios.isAxiosError(apiResponse)) {
			const errorCode = apiResponse.code;
			if (errorCode === "ECONNABORTED") {
				return connectionError;
			}
			const errorData: IResponseError = apiResponse.response?.data as IResponseError;
			return {
				status: apiResponse.response?.status || 500,
				data: { code: errorData?.code || "unknown_error", message: errorData?.message || "", details: errorData?.details || [] },
			};
		}

		if (apiResponse.status === 200) {
			return { status: apiResponse.status, data: apiResponse.data as IAuthProfile };
		}
		return connectionError;
	}
}

export default AuthMapper;
