import { string, object } from "zod";

const LoginValidationSchema = object({
	username: string({ required_error: "É necessário informar um usuário" }).min(8, "O usuário precisa ter no mínimo 8 caracteres"),
	password: string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
});

const RegisterValidationSchema = object({
	email: string({ required_error: "É necessário informar um email" }).email("Por favor insira um email válido"),
	username: string({ required_error: "É necessário informar um usuário" }).min(8, "O usuário precisa ter no mínimo 8 caracteres"),
	fullName: string().min(10, "Você precisa informar o nome completo"),
	password: string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
	confirmPassword: string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
	city: string({ required_error: "É necessário selecionar uma cidade" }),
}).refine((data) => data.password === data.confirmPassword, {
	message: "A senha precisa ser a mesma",
	path: ["confirmPassword"],
});

export { LoginValidationSchema, RegisterValidationSchema };
