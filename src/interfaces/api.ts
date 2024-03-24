export interface IErrorDetails {
	code: string;
	message: string;
	field?: string;
}

export interface IResponseError {
	code: string;
	message: string;
	details: IErrorDetails[];
}
