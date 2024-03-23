import { object, string, number, date, InferType, ref } from "yup";

export const RegisterValidationSchema = object().shape({
	username: string().required("É necessário um usuário").min(8, "A senha deve conter pelo menos 10 dígitos"),
	fullName: string().required("É necessário informar seu nome").min(15, "A senha deve conter pelo menos 10 dígitos"),
	email: string().required("O email não pode ser vazio").email("Digite um email válido"),
	password: string().required("A senha não pode ser vazia").min(8, "A senha deve conter pelo menos 8 dígitos"),
	confirmPassword: string()
		.required("É preciso confirmar a senha")
		.min(8, "A senha deve conter pelo menos 8 dígitos")
		.oneOf([ref("password"), null], "As senhas precisam ser idênticas."),
});
