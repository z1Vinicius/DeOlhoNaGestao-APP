import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { LoginValidationSchema } from "../../validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { sleep } from "../../utils/functions";

import database from "../../db/infra/db/settings/connection";
import AuthService from "../../api/auth.services";
import AuthMapper from "../../mappers/auth.mapper";
import { IAuthSuccess } from "../../interfaces/auth";
import Toast from "react-native-toast-message";

function LoginViewModel() {
	const [loading, setLoading] = useState<boolean>(false);
	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: "admin",
			password: "admin",
		},
		resolver: zodResolver(LoginValidationSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		const auth = await AuthService.login(data);
		const authEntity = AuthMapper.AuthLogin(auth);

		if (authEntity.status === 200) {
			const data = authEntity.data as IAuthSuccess;
			await database.localStorage.set("auth.access", data.access);
			await database.localStorage.set("auth.refresh", data.refresh);
			Toast.show({
				type: "success",
				text1: "Logado com sucesso",
				text2: "Bem vindo! 👋",
				position: "bottom",
			});
		}

		await sleep(2000);
		Alert.alert("Successful", JSON.stringify(data));
		setLoading(false);
	};

	return {
		loading,
		control,
		onSubmit,
		handleSubmit,
	};
}

export default LoginViewModel;
