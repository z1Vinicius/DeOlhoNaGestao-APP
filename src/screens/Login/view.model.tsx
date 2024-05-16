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
import useStoreAuth from "src/stores/login";
import { setStorageToken } from "src/services/api";

function LoginViewModel() {
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(true);
	const updateLogin = useStoreAuth((state) => state.emitEvent);

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
			await setStorageToken();
			updateLogin();
			Toast.show({
				type: "showSuccess",
				text1: "Logado com sucesso",
				text2: "Bem vindo! 👋",
				position: "bottom",
			});
		}

		if (authEntity.status === 500) {
			Toast.show({
				type: "showConnection",
				text1: "Sem conexão",
				text2: "Não foi possível autenticar devido a um problema de conexão! 🙁",
				position: "bottom",
			});
		}

		if (authEntity.status === 401) {
			Toast.show({
				type: "showError",
				text1: "Credenciais incorretas",
				text2: "❌ Não foi possível autenticar devido a credenciais incorretas! ",
				position: "bottom",
			});
		}

		await sleep(2000);
		setLoading(false);
	};

	return {
		loading,
		control,
		onSubmit,
		showPassword,
		setShowPassword,
		handleSubmit,
	};
}

export default LoginViewModel;
